/* Platform service: the native Android bridge (window.Android) with browser fallbacks.
 * Bridge methods since the first shell: save, load, exportSave, importSave, haptic, exitApp. The Kotlin shell
 * (AP 2.1, android/) adds keepAwake(on), info() and haptic patterns 0 light, 1 medium, 2 heavy, 3 double. */
(function(){'use strict';
const native=()=>window.Android||null;
window.AEP={
 bridge:native(),
 haptic(kind=0,enabled=true){if(enabled&&native()?.haptic)native().haptic(kind);},
 exit(){native()?.exitApp?.();},
 // The screen stays on during a match only (the old shell kept it on everywhere).
 keepAwake(on){native()?.keepAwake?.(!!on);},
 // Shell 1 = compiled shell up to 1.11.0 (no info), 2 = Kotlin shell; null in the browser.
 info(){const n=native();if(!n)return null;try{return n.info?JSON.parse(n.info()):{shell:1};}catch{return {shell:1};}},
 // Native: the shell opens its save dialog. Browser: download as a file.
 exportSave(raw,name){if(native()){native().exportSave(raw);return;}
  const url=URL.createObjectURL(new Blob([raw],{type:'application/json'})),a=document.createElement('a');
  a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);},
 // Text file (Fehlerprotokoll, seit 1.34.0). Browser: download; native shell: clipboard (its file dialog only writes JSON saves).
 // → Promise of 'file' | 'clipboard' | 'none'.
 exportText(raw,name){if(!native()){const url=URL.createObjectURL(new Blob([raw],{type:'text/plain'})),a=document.createElement('a');
   a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);return Promise.resolve('file');}
  return navigator.clipboard?.writeText?navigator.clipboard.writeText(raw).then(()=>'clipboard',()=>'none'):Promise.resolve('none');},
 // Native: the shell answers with App.importText(text). Browser: the hidden file input.
 pickImport(){if(native())native().importSave();else document.getElementById('import-file').click();},
 // Automatische Updates (seit 1.36.0, android/…/Updater.kt): die Hülle sucht, lädt, prüft und öffnet den Installer von
 // Android; ihren Zustand meldet sie über App.onUpdate(json). Im Browser gibt es keine Updates (supported false).
 updates:{
  get supported(){return !!native()?.updateCheck;},
  state(){try{return JSON.parse(native()?.updateState?.()||'null');}catch{return null;}},
  check(manual){native()?.updateCheck?.(!!manual);},
  download(){native()?.updateDownload?.();},
  install(){native()?.updateInstall?.();},
  cancel(){native()?.updateCancel?.();},
  page(){native()?.updatePage?.();}},
 // Ruhige Bewegung: die Einstellung (Phase 7, seit 1.34.0, AEP.calm aus app.js) oder die Vorgabe des Geräts.
 calm:false,
 reducedMotion:()=>window.AEP.calm||!!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches};
})();
