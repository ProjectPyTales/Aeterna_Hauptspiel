/* Was ist neu (seit 1.36.0): ein bis drei kurze Sätze zur aktuellen Version, bei jeder neuen Version mitändern (ein Test prüft
 * die Versionsnummer). Das Spiel zeigt sie einmal nach einem Update im Hauptmenü (viewmodel/update.js); die CI schreibt sie
 * als „notes“ in version.json (werkzeuge/update_info.js), und ältere Versionen zeigen sie im Hinweis „Neue Version“. */
(function(root){'use strict';
const api={
 version:'1.37.0',
 notes:'Flüssiger und kühler: In Ruhe zeichnet das Match nur noch 30 Bilder je Sekunde, der Tisch liegt auf einer eigenen Ebene, und schwächere Handys senken im Gefecht die Auflösung von selbst. Unter Fenstern ruhen die Funken des Hauptmenüs.'};
if(typeof module!=='undefined')module.exports=api;else root.AENEU=api;
})(typeof globalThis!=='undefined'?globalThis:this);
