/* Platform service: the native Android bridge (window.Android) with browser fallbacks.
 * Bridge methods of the compiled shell: save, load, exportSave, importSave, haptic(0|1), exitApp. */
(function(){'use strict';
const native=()=>window.Android||null;
window.AEP={
 bridge:native(),
 haptic(kind=0,enabled=true){if(enabled&&native()?.haptic)native().haptic(kind);},
 exit(){native()?.exitApp?.();},
 // Native: the shell opens its save dialog. Browser: download as a file.
 exportSave(raw,name){if(native()){native().exportSave(raw);return;}
  const url=URL.createObjectURL(new Blob([raw],{type:'application/json'})),a=document.createElement('a');
  a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);},
 // Native: the shell answers with App.importText(text). Browser: the hidden file input.
 pickImport(){if(native())native().importSave();else document.getElementById('import-file').click();},
 reducedMotion:()=>!!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches};
})();
