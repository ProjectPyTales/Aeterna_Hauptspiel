/* Was ist neu (seit 1.36.0): ein bis drei kurze Sätze zur aktuellen Version, bei jeder neuen Version mitändern (ein Test prüft
 * die Versionsnummer). Das Spiel zeigt sie einmal nach einem Update im Hauptmenü (viewmodel/update.js); die CI schreibt sie
 * als „notes“ in version.json (werkzeuge/update_info.js), und ältere Versionen zeigen sie im Hinweis „Neue Version“. */
(function(root){'use strict';
const api={
 version:'1.36.0',
 notes:'Aeterna aktualisiert sich jetzt selbst: Gibt es eine neue Version, fragt das Spiel im Hauptmenü und installiert sie auf Wunsch – Sammlung, Decks und eine laufende Partie bleiben. Abschalten und von Hand suchen unter Einstellungen → Daten.'};
if(typeof module!=='undefined')module.exports=api;else root.AENEU=api;
})(typeof globalThis!=='undefined'?globalThis:this);
