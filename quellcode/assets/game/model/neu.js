/* Was ist neu (seit 1.36.0): ein bis drei kurze Sätze zur aktuellen Version, bei jeder neuen Version mitändern (ein Test prüft
 * die Versionsnummer). Das Spiel zeigt sie einmal nach einem Update im Hauptmenü (viewmodel/update.js); die CI schreibt sie
 * als „notes“ in version.json (werkzeuge/update_info.js), und ältere Versionen zeigen sie im Hinweis „Neue Version“. */
(function(root){'use strict';
const api={
 version:'1.39.0',
 notes:'Legendäre treten jetzt groß auf: Die Karte fliegt in die Mitte, goldene Strahlen gehen auf, ein Band mit Name und Epoche entrollt sich, ein Siegel prägt sich darauf – dann schlägt sie mit Funken ein. Der Modus steht nicht mehr oben auf dem Brett, sondern im Pausenfenster.'};
if(typeof module!=='undefined')module.exports=api;else root.AENEU=api;
})(typeof globalThis!=='undefined'?globalThis:this);
