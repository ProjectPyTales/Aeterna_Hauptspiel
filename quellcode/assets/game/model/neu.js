/* Was ist neu (seit 1.36.0): ein bis drei kurze Sätze zur aktuellen Version, bei jeder neuen Version mitändern (ein Test prüft
 * die Versionsnummer). Das Spiel zeigt sie einmal nach einem Update im Hauptmenü (viewmodel/update.js); die CI schreibt sie
 * als „notes“ in version.json (werkzeuge/update_info.js), und ältere Versionen zeigen sie im Hinweis „Neue Version“. */
(function(root){'use strict';
const api={
 version:'1.41.1',
 notes:'Die Helden sind in ihrer Münze jetzt deutlich größer zu sehen: Der Rand ist schmaler, Name und Lorbeer bleiben. Text lässt sich nicht mehr versehentlich markieren. Aeterna läuft jetzt auch im Browser unter aeterna.pytales.de.'};
if(typeof module!=='undefined')module.exports=api;else root.AENEU=api;
})(typeof globalThis!=='undefined'?globalThis:this);
