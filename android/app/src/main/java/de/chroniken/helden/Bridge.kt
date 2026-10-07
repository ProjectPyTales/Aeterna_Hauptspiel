package de.chroniken.helden

import android.os.Build
import android.webkit.JavascriptInterface
import org.json.JSONObject

/**
 * `window.Android` – dieselbe JS-API wie die alte Hülle (save, load, exportSave, importSave, haptic, exitApp),
 * dazu `keepAwake` (Bildschirm bleibt im Match an) und `info` (Hülle, Version, Android-Version).
 * Die Methoden laufen im Brücken-Thread; alles, was Fenster oder Activity anfasst, geht auf den UI-Thread.
 */
class Bridge(private val activity: MainActivity) {
    @JavascriptInterface
    fun save(raw: String) {
        if (raw.length > MainActivity.MAX_SAVE) return
        val valid = try {
            JSONObject(raw).optInt("version") == 1
        } catch (e: Exception) {
            false
        }
        if (valid) activity.prefs.edit().putString("profile", raw).commit()
    }

    @JavascriptInterface
    fun load(): String = activity.prefs.getString("profile", "") ?: ""

    @JavascriptInterface
    fun exportSave(raw: String) {
        if (raw.length > MainActivity.MAX_SAVE) return
        activity.runOnUiThread { activity.startExport(raw) }
    }

    @JavascriptInterface
    fun importSave() {
        activity.runOnUiThread { activity.startImport() }
    }

    /** 0 leicht (Antippen), 1 mittel (Einrasten), 2 schwer (Treffer, Legendäre), 3 doppelt. */
    @JavascriptInterface
    fun haptic(kind: Int) {
        activity.runOnUiThread { activity.haptics.play(kind) }
    }

    @JavascriptInterface
    fun exitApp() {
        activity.runOnUiThread { activity.finish() }
    }

    @JavascriptInterface
    fun keepAwake(on: Boolean) {
        activity.runOnUiThread { activity.keepAwake(on) }
    }

    @JavascriptInterface
    fun info(): String {
        val pkg = activity.packageManager.getPackageInfo(activity.packageName, 0)
        return JSONObject()
            .put("shell", SHELL)
            .put("version", pkg.versionName)
            .put("android", Build.VERSION.RELEASE)
            .put("sdk", Build.VERSION.SDK_INT)
            .put("haptics", activity.haptics.available)
            .toString()
    }

    companion object {
        /** 1 = kompilierte Hülle bis 1.11.0, 2 = diese Kotlin-Hülle. */
        const val SHELL = 2
    }
}
