/* Was ist neu (seit 1.36.0): ein bis drei kurze Sätze zur aktuellen Version, bei jeder neuen Version mitändern (ein Test prüft
 * die Versionsnummer). Das Spiel zeigt sie einmal nach einem Update im Hauptmenü (viewmodel/update.js); die CI schreibt sie
 * als „notes“ in version.json (werkzeuge/update_info.js), und ältere Versionen zeigen sie im Hinweis „Neue Version“. */
(function(root){'use strict';
const api={
 version:'1.40.0',
 notes:'Alle 416 Karten und alle beschworenen Spielsteine haben jetzt ein Bild. 240 Illustrationen sind neu. Der Veles trägt leichte Ausrüstung, die Feldheilerin verbindet mit Leinen. Knöpfe, Lebensherz und Rüstungsschild sind in Stein, Bronze und Emaille gefasst.'};
if(typeof module!=='undefined')module.exports=api;else root.AENEU=api;
})(typeof globalThis!=='undefined'?globalThis:this);
