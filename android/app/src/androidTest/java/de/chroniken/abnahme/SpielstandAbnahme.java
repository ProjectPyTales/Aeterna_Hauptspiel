package de.chroniken.abnahme;

import android.app.Activity;
import android.app.Instrumentation;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.SystemClock;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.TimeUnit;

/** Signierter Instrumentierungstest für die unveränderte veröffentlichte APK und den Release-Kandidaten. */
public final class SpielstandAbnahme extends Instrumentation {
    private Bundle args;
    private WebView web;
    @Override public void onCreate(Bundle arguments) {
        super.onCreate(arguments);
        args = arguments;
        start();
    }
    private WebView findWeb(View v) {
        if (v instanceof WebView) return (WebView)v;
        if (v instanceof ViewGroup) {
            ViewGroup group = (ViewGroup)v;
            for (int i=0; i<group.getChildCount(); i++) {
                WebView w = findWeb(group.getChildAt(i));
                if (w != null) return w;
            }
        }
        return null;
    }
    private String js(String script) throws Exception {
        ArrayBlockingQueue<String> result = new ArrayBlockingQueue<>(1);
        runOnMainSync(() -> web.evaluateJavascript(script, value -> result.offer(value==null?"null":value)));
        String value = result.poll(60, TimeUnit.SECONDS);
        if (value == null) throw new AssertionError("WebView antwortet nicht");
        return value;
    }
    private void waitFor(String expression) throws Exception {
        long end = SystemClock.elapsedRealtime()+480000;
        while (SystemClock.elapsedRealtime()<end) {
            if ("true".equals(js("Boolean("+expression+")"))) return;
            SystemClock.sleep(250);
        }
        throw new AssertionError("Zeitüberschreitung: "+expression);
    }
    private String digest() throws Exception {
        String json = js("JSON.stringify([App.profile.collection,App.profile.decks,App.profile.game])");
        StringBuilder out = new StringBuilder();
        for(byte b:MessageDigest.getInstance("SHA-256").digest(json.getBytes(StandardCharsets.UTF_8)))
            out.append(String.format(java.util.Locale.ROOT,"%02x",b & 255));
        return out.toString();
    }
    private void prepare() throws Exception {
        waitFor("App.profile.opened===0 && !App.profile.game && App.profile.decks.length===CHD.heroes.length");
        js("App.profile.settings.motion='ruhig'; App.profile.settings.updates=false; App.profile.helpSeen=true;"
            +"CHP.openPack(App.profile); App.store.commit(); App.vm.menu.go('collection')");
        waitFor("App.screen==='collection'");
        js("const c=App.vm.collection; c.createDeck('hypatia'); c.deckName('Abnahme Alexandria');"
            +"c.autoFill(); c.saveDeck(); c.back(); App.navigate('menu'); App.vm.menu.go('free')");
        waitFor("App.screen==='setup'");
        js("const s=App.vm.setup; s.chooseHero('hypatia');"
            +"s.chooseDeck(App.profile.decks.find(d=>d.name==='Abnahme Alexandria').id); s.begin()");
        waitFor("App.dialog==='mulligan'");
        js("App.vm.game.acceptHand(); App.onPause(); App.navigate('menu')");
        waitFor("App.screen==='menu' && App.profile.game.phase==='play' && App.profile.opened===1");
    }
    @Override public void onStart() {
        Bundle result=new Bundle();
        try {
            if (!"ja".equals(args.getString("isoliert"))) throw new AssertionError("Separates Android-Testprofil mit -e isoliert ja bestätigen");
            Intent intent=getTargetContext().getPackageManager().getLaunchIntentForPackage(getTargetContext().getPackageName());
            if(intent==null) throw new AssertionError("Keine Startaktivität");
            Activity activity=startActivitySync(intent);
            runOnMainSync(() -> web=findWeb(activity.getWindow().getDecorView()));
            waitFor("window.App && App.artReady && App.screen==='menu'");
            result.putString("version",js("AENEU.version"));
            String step=args.getString("schritt","");
            SharedPreferences proof=getTargetContext().getSharedPreferences("aeterna_abnahmetest",0);
            if ("anlegen".equals(step)) prepare();
            else if ("basis".equals(step)||"update".equals(step)) {
                waitFor("App.profile.opened===1 && App.profile.decks.some(d=>d.name==='Abnahme Alexandria' && d.cards.length===30) && App.profile.game.phase==='play'");
                String hash=digest();result.putString("spielstand_sha256",hash);
                if("basis".equals(step)) {
                    if (!proof.edit().putString("hash",hash).commit()) throw new AssertionError("Referenz nicht gespeichert");
                } else {
                    if(!hash.equals(proof.getString("hash",""))) throw new AssertionError("Sammlung, Decks oder Partie abweichend");
                    js("App.close(); App.vm.menu.go('resume')");
                    waitFor("App.screen==='game' && App.profile.game.players[0].hero==='hypatia'");
                }
            } else if ("neu".equals(step)) {
                waitFor("!App.profile.game && App.profile.opened===0 && App.profile.decks.length===CHD.heroes.length");
                js("App.vm.menu.go('collection')"); waitFor("App.screen==='collection'");
            } else if ("duell".equals(step)) {
                // Nur der signierte Test öffnet die WebView dieses verwerfbaren Emulators für Playwright.
                runOnMainSync(() -> WebView.setWebContentsDebuggingEnabled(true));
                waitFor("window.aeternaDuellAbgenommen === true");
            } else throw new AssertionError("Schritt unbekannt");
            result.putString("abnahme","OK");finish(Activity.RESULT_OK,result);
        } catch (Throwable e) {
            result.putString("fehler",e.toString());finish(Activity.RESULT_CANCELED,result);
        }
    }
}
