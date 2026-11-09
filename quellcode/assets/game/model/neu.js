/* Was ist neu (seit 1.36.0): ein bis drei kurze Sätze zur aktuellen Version, bei jeder neuen Version mitändern (ein Test prüft
 * die Versionsnummer). Das Spiel zeigt sie einmal nach einem Update im Hauptmenü (viewmodel/update.js); die CI schreibt sie
 * als „notes“ in version.json (werkzeuge/update_info.js), und ältere Versionen zeigen sie im Hinweis „Neue Version“. */
(function(root){'use strict';
const api={
 version:'1.38.0',
 notes:'Legendäre treten mit Band und Siegel auf, das Handy vibriert im Takt jedes Aufpralls, und das Brett ist lesbarer: mehr von jeder Handkarte, größere Schrift für Zug, Deck und Friedhof, ein ruhigeres Grün und kleinere Schildwall-Wappen.'};
if(typeof module!=='undefined')module.exports=api;else root.AENEU=api;
})(typeof globalThis!=='undefined'?globalThis:this);
