/* Kampagne 2.0 (AP 6.4, seit 1.31.0): Die 22 Missionen stehen in sechs Kapiteln nach den Epochen des Lehrplans (in seiner
 * Reihenfolge) und einem Epilog. Jedes Kapitel beginnt mit einer kurzen Story-Szene – Sprechblasen über den Porträts seiner
 * Helden, jede Szene mit Quelle („halb Lernen“) – und endet mit einer Belagerung unter der Lunte (Feld fuse der Mission in
 * model/data.js, Regel in CHE.fuse).
 *
 * Die Missionen behalten ihre Kennungen (0–21); nur ihre Reihenfolge kommt von hier. Freigeschaltet ist eine Mission, wenn sie
 * schon gewonnen ist oder ihre Vorgängerin in der neuen Reihenfolge – so bleibt jeder Fortschritt in profile.campaign gültig.
 * profile.scenes – Kapitel, deren Szene schon gezeigt wurde (über normalize, alte Spielstände bekommen []). */
(function(root){'use strict';
const node=typeof module!=='undefined';
const D=node?require('./data.js'):root.CHD;

// who: Kennung eines Helden (sein Porträt) oder 'chronist'. cue: Ort und Zeit über der Sprechblase eines Helden.
// Rückmeldung zu 1.31.0 („aus dem Nichts, gewollt statt gekonnt“): Jede Szene folgt einer Leitfrage des Chronisten, jeder Held
// antwortet aus seinem Ort und seiner Zeit, und der Chronist führt am Ende zur ersten Mission des Kapitels.
// years: Zeitspanne des Kapitels für die Titelzeile. source: woher die Szene ihre Angaben hat.
const CHAPTERS=[
 {id:'steppe',title:'Fürsten und Pharaonen',years:'um 2650 – 500 v. Chr.',missions:[21,2,12],
  scene:[['chronist','Bevor jemand Chroniken schrieb, zeigte sich Macht in Stein und Bronze. Wie gewinnt man sie? Drei Stimmen, drei Antworten.'],
   ['fuhao','Durch Handel. Wein und Bronze aus dem Süden kommen über die Seine an meinem Berg vorbei – ich bestimme, wer sie bekommt.','Mont Lassois · um 500 v. Chr.'],
   ['imhotep','Durch Bauten. Für König Djoser setze ich sechs Stufen aus Stein übereinander – ein Grab, das man von weitem sieht.','Sakkara · um 2650 v. Chr.'],
   ['amanirenas','Durch Mut. Die Hyksos herrschen in Auaris. Während Theben gegen sie kämpft, halte ich das Land zusammen.','Theben · um 1550 v. Chr.'],
   ['chronist','Deine Chronik beginnt am Mont Lassois. Im Grab der Fürstin fand man 1953 ein Mischgefäß aus Bronze, das 1100 Liter fasst.']],
  source:'Grabfund von Vix (1953) mit dem Krater von Vix; Stufenpyramide des Djoser in Sakkara; Stele des Ahmose aus Karnak, die Ahhotep lobt',
  fuse:'Ahmose nahm Auaris erst nach mehreren Angriffen, um 1550 v. Chr. Fällt die Stadt nicht, bevor die Lunte abbrennt, ist die Gelegenheit vertan.',
  fuseSource:'Grabinschrift des Ahmose, Sohn der Ebana, in Elkab'},
 {id:'griechen',title:'Die Welt der Poleis',years:'480 v. Chr. – 415 n. Chr.',missions:[0,16,1,10],
  scene:[['chronist','Griechenland ist kein Reich, sondern viele Stadtstaaten, die Poleis. Was hält sie zusammen?'],
   ['leonidas','Die Gefahr. Als der Perserkönig Xerxes kommt, stehen Spartiaten und Verbündete gemeinsam im Engpass.','Thermopylen · 480 v. Chr.'],
   ['perikles','Die Stadt. Athen ist die Schule von Hellas – und hinter den Langen Mauern halten wir jede Belagerung aus.','Athen · 431 v. Chr.'],
   ['hypatia','Das Denken. Was die Griechen herausfanden, lehre ich noch 900 Jahre später: Mathematik, Sternkunde, Philosophie.','Alexandria · um 400 n. Chr.'],
   ['chronist','Deine Chronik beginnt dort, wo die Poleis zusammenstanden: am Pass der Thermopylen.']],
  source:'Herodot, Historien VII (Thermopylen); Thukydides II 41 (Gefallenenrede des Perikles); Sokrates Scholastikos VII 15 (Hypatia)',
  fuse:'431 v. Chr. verwüstet Archidamos Attika, die Menschen drängen sich in der Stadt. Im Jahr darauf bricht dort die Seuche aus – halte Athen, bevor die Lunte abbrennt.',
  fuseSource:'Thukydides II 47–48'},
 {id:'rom',title:'Rom und die Germanen',years:'217 v. Chr. – 16 n. Chr.',missions:[17,11,18,5],
  scene:[['chronist','Rom wächst von einer Stadt am Tiber zum Weltreich. Wer ihm begegnet, muss wählen: abwarten, kämpfen – oder zwischen den Fronten stehen?'],
   ['fabius','Abwarten. Hannibal will die große Schlacht, ich gebe sie ihm nicht. Darum nennt man mich Cunctator, den Zauderer.','Kampanien · 217 v. Chr.'],
   ['agrippa','Kämpfen, wenn es zählt. Bei Actium führe ich Octavians Flotte gegen Antonius und Kleopatra.','Actium · 31 v. Chr.'],
   ['mandukhai','Zwischen den Fronten. Mein Vater Segestes hält zu Rom, mein Mann Arminius kämpft gegen Rom.','Germanien · 15 n. Chr.'],
   ['boudicca','Und wer kämpft, wird belagert: In Alesia schließt Caesar uns mit zwei Ringen aus Wall und Graben ein.','Alesia · 52 v. Chr.'],
   ['chronist','Deine Chronik beginnt in Kampanien, wo Fabius den großen Hannibal hinhält.']],
  source:'Livius XXII (Fabius); Tacitus, Annalen I 55–58 (Segestes und Thusnelda); Caesar, Der Gallische Krieg VII 69–74 (Alesia)',
  fuse:'Das Korn in Alesia reicht nur für etwa dreißig Tage. Brich den Belagerungsring, bevor die Lunte abbrennt.',
  fuseSource:'Caesar, Der Gallische Krieg VII 71'},
 {id:'mittelalter',title:'Kaiser, Klöster und Burgen',years:'772 – 1150',missions:[15,8,7,4],
  scene:[['chronist','Das Reich der Ottonen und Salier hat keine Hauptstadt. Wer hat hier die Macht – die Krone, die Burg oder das Kloster?'],
   ['masako','Die Krone. Heinrich der Zänker hat meinen Sohn Otto entführt. Er ist drei Jahre alt – bis er herrschen kann, regiere ich.','Quedlinburg · 984'],
   ['ragnar','Die Burg. Wer die Mark Meißen hält, hält den Weg nach Osten – darum streite ich mit Konrad von Wettin.','Mark Meißen · 1123'],
   ['jeanne','Das Kloster. Auf dem Rupertsberg baue ich mein eigenes – auch gegen den Willen des Abtes Kuno.','Rupertsberg · 1150'],
   ['khan','Und wer sich nicht beugt? Karl hat 772 unsere Irminsul zerstört. Wir Sachsen geben nicht auf.','Eresburg · 772'],
   ['chronist','Deine Chronik beginnt in Quedlinburg, wo eine Kaiserin aus Byzanz das Reich zusammenhält.']],
  source:'Reichsannalen zu 772 (Eresburg und Irminsul); Thietmar von Merseburg, Chronik IV (Theophanu); Vita sanctae Hildegardis',
  fuse:'772 nimmt Karl die Eresburg und zerstört die Irminsul. Hältst Du ihn nicht auf, bevor die Lunte abbrennt, fällt die Burg.',
  fuseSource:'Reichsannalen zu 772'},
 {id:'byzanz',title:'Zwischen Kreuz und Halbmond',years:'1096 – 1260',missions:[13,19,3],
  scene:[['chronist','Seit 1096 ziehen Kreuzfahrer nach Osten. Drei Stimmen von drei Seiten: Wer behält den Überblick, wer siegt, wer verdient?'],
   ['anna','Ich habe die ersten Kreuzfahrer mit eigenen Augen gesehen. In der Alexias schreibe ich auf, wie mein Vater mit ihnen verhandelt.','Konstantinopel · 1097'],
   ['baibars','Nicht nur Kreuzfahrer kommen. Bei Ain Dschalut halten wir Mamluken die Mongolen auf – eine ihrer ersten großen Niederlagen.','Ain Dschalut · 1260'],
   ['dandolo','Venedig baut Euch die Flotte – für 85 000 Mark Silber. Wer nicht zahlen kann, zahlt anders.','Venedig · 1201'],
   ['chronist','Deine Chronik beginnt in Konstantinopel, der Stadt, an der alle Wege nach Osten vorbeiführen.']],
  source:'Anna Komnene, Alexias X; Geoffroi de Villehardouin, Die Eroberung von Konstantinopel (Vertrag von Venedig 1201)',
  fuse:'Die Flotte liegt bereit, doch die Kreuzfahrer bringen das Geld nicht zusammen. Schlage den Dogen, bevor die Lunte abbrennt – sonst zieht das Heer 1202 für Venedig gegen Zara.',
  fuseSource:'Geoffroi de Villehardouin, Die Eroberung von Konstantinopel'},
 {id:'ostasien',title:'Neue Welten',years:'1428 – 1708',missions:[14,6,20],
  scene:[['chronist','Zwischen 1400 und 1700 verändert sich die Welt. Was gibt jetzt den Ausschlag? Wissen – über Verbündete, im Labor, im Festungsbau.'],
   ['nezahualcoyotl','Wissen über Verbündete. Mit Tenochtitlan und Tlacopan schließe ich den Dreibund gegen Azcapotzalco.','Texcoco · 1428'],
   ['nostradamus','Wissen aus dem Labor. August der Starke will Gold von mir. Ich finde etwas anderes: weißes Porzellan.','Dresden · 1708'],
   ['zizka','Wissen in Stein. Man sagt: Eine Stadt, die Vauban belagert, ist genommen; eine, die er verteidigt, uneinnehmbar.','Namur · 1692'],
   ['chronist','Deine Chronik beginnt am See von Texcoco – lange bevor ein Europäer ihn sieht.']],
  source:'Fernando de Alva Ixtlilxóchitl, Historia de la nación chichimeca (Dreibund 1428); Böttgers Laborbuch 1708; Sprichwort über Vauban („Ville assiégée par Vauban, ville prise …“)',
  fuse:'1692 belagern Ludwig XIV. und Vauban Namur, Coehoorn verteidigt die Festung. Brich den Widerstand, bevor die Lunte abbrennt und das Entsatzheer Wilhelms III. heran ist.',
  fuseSource:'Jean Racine, Relation de ce qui s’est passé au siège de Namur (1692)'},
 {id:'epilog',title:'Der letzte Horizont',years:'Alle Epochen',epilogue:true,missions:[9],
  scene:[['chronist','Sechs Epochen hast Du durchschritten. Bleibt die Frage über allen anderen: Wer schreibt die Geschichte auf?'],
   ['musashi','Ich zum Beispiel. 1227 zog ich als Frau Venus verkleidet zu Turnieren bis nach Böhmen – und schrieb alles selbst auf.','Steiermark · um 1255'],
   ['chronist','Wer die Geschichte erzählt, bestimmt, wie sie bleibt. Am letzten Horizont wartet der Hüter der Chronik.']],
  source:'Ulrich von Liechtenstein, Frauendienst (Venusfahrt 1227)'}
].map((c,i)=>{const age=D.ageById[c.id];
 return {...c,index:i,numeral:c.epilogue?'':['I','II','III','IV','V','VI'][i],label:c.epilogue?'Epilog':'Kapitel '+['I','II','III','IV','V','VI'][i],
  era:age?age.name:'Alle Epochen',color:age?age.color:'#8a6a3a',icon:age?age.icon:'✦',scene:c.scene.map(([who,text,cue])=>({who,text,...(cue?{cue}:{})}))};});

// Die Reihenfolge der Kampagne: Kapitel für Kapitel. number(id) ist die Nummer, die das Spiel zeigt (1–22).
const ORDER=CHAPTERS.flatMap(c=>c.missions);
const position=Object.fromEntries(ORDER.map((id,i)=>[id,i]));
const number=id=>position[id]+1;
const chapterOf=id=>CHAPTERS.find(c=>c.missions.includes(id))||null;
const previous=id=>position[id]>0?ORDER[position[id]-1]:null;
const unlocked=(p,id)=>p.campaign.includes(id)||position[id]===0||p.campaign.includes(previous(id));
// Lunte der Mission: Züge, Grund und Quelle aus ihrem Kapitel; null ohne Lunte.
const fuse=id=>{const m=D.missions[id];if(!m?.fuse)return null;const c=chapterOf(id);return {turns:m.fuse,text:c.fuse,source:c.fuseSource};};
// Ein Kapitel ist offen, sobald seine erste Mission frei ist; die Szene kommt vor der ersten Mission, bis sie gesehen ist.
const open=(p,c)=>unlocked(p,c.missions[0]);
const done=(p,c)=>c.missions.filter(id=>p.campaign.includes(id)).length;
const seen=(p,c)=>p.scenes.includes(c.id);
const see=(p,c)=>{if(seen(p,c))return false;p.scenes.push(c.id);return true;};
const normalize=p=>{p.scenes=Array.isArray(p.scenes)?[...new Set(p.scenes.filter(id=>CHAPTERS.some(c=>c.id===id)))]:[];return p;};

const api={CHAPTERS,ORDER,number,chapterOf,previous,unlocked,fuse,open,done,seen,see,normalize};
if(node)module.exports=api;else root.AEKA=api;
})(typeof globalThis!=='undefined'?globalThis:this);
