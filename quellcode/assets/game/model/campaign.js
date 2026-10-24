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

// who: Kennung eines Helden (sein Porträt) oder 'chronist'. source: woher die Szene ihre Angaben hat.
const CHAPTERS=[
 {id:'steppe',title:'Fürsten und Pharaonen',missions:[21,2,12],
  scene:[['chronist','Lange bevor jemand Chroniken schrieb, erzählen Gräber von der Geschichte. Am Mont Lassois ruhte eine Fürstin neben einem Mischgefäß aus Bronze, das 1100 Liter fasst.'],
   ['fuhao','Zinn aus dem Norden, Wein aus dem Süden – auf dem Handelsweg an der Seine kommt alles an meinem Berg vorbei.'],
   ['imhotep','Am Nil baut man für die Ewigkeit: Für König Djoser setzen wir sechs Stufen aus Stein übereinander.'],
   ['amanirenas','Doch im Norden herrschen die Hyksos aus Auaris. Theben wird sie vertreiben – und ich halte das Land dabei zusammen.']],
  source:'Grabfund von Vix (1953) mit dem Krater von Vix; Stufenpyramide des Djoser in Sakkara; Stele des Ahmose aus Karnak, die Ahhotep lobt',
  fuse:'Ahmose nahm Auaris erst nach mehreren Angriffen, um 1550 v. Chr. Fällt die Stadt nicht, bevor die Lunte abbrennt, ist die Gelegenheit vertan.',
  fuseSource:'Grabinschrift des Ahmose, Sohn der Ebana, in Elkab'},
 {id:'griechen',title:'Die Welt der Poleis',missions:[0,16,1,10],
  scene:[['chronist','Griechenland besteht aus vielen Stadtstaaten, den Poleis. Sie streiten miteinander – und stehen doch zusammen, als der Perserkönig Xerxes kommt.'],
   ['leonidas','Dreihundert Spartiaten und einige tausend Verbündete: genug, um den Pass der Thermopylen drei Tage zu halten.'],
   ['perikles','Athen ist die Schule von Hellas. Doch wenn Sparta anrückt, ziehen wir uns hinter die Langen Mauern zurück.'],
   ['hypatia','Was die Griechen dachten, lehre ich in Alexandria noch fast neunhundert Jahre später: Mathematik, Sternkunde, Philosophie.']],
  source:'Herodot, Historien VII (Thermopylen); Thukydides II 41 (Gefallenenrede des Perikles); Sokrates Scholastikos VII 15 (Hypatia)',
  fuse:'431 v. Chr. verwüstet Archidamos Attika, die Menschen drängen sich in der Stadt. Im Jahr darauf bricht dort die Seuche aus – halte Athen, bevor die Lunte abbrennt.',
  fuseSource:'Thukydides II 47–48'},
 {id:'rom',title:'Rom und die Germanen',missions:[17,11,18,5],
  scene:[['chronist','Rom wächst von einer Stadt am Tiber zum Weltreich – im Krieg gegen Karthago, in Gallien und an Rhein und Weser.'],
   ['fabius','Hannibal will die Schlacht. Ich gebe sie ihm nicht – darum nennt man mich den Zauderer, Cunctator.'],
   ['agrippa','Bei Actium entscheidet die Flotte, wer Rom beherrscht: Octavian oder Antonius mit Kleopatra.'],
   ['mandukhai','Mein Vater Segestes hält zu Rom, mein Mann Arminius kämpft gegen Rom. Zwischen ihnen stehe ich.'],
   ['boudicca','In Alesia schließt Caesar uns mit zwei Ringen aus Wall und Graben ein.']],
  source:'Livius XXII (Fabius); Tacitus, Annalen I 55–58 (Segestes und Thusnelda); Caesar, Der Gallische Krieg VII 69–74 (Alesia)',
  fuse:'Das Korn in Alesia reicht nur für etwa dreißig Tage. Brich den Belagerungsring, bevor die Lunte abbrennt.',
  fuseSource:'Caesar, Der Gallische Krieg VII 71'},
 {id:'mittelalter',title:'Kaiser, Klöster und Burgen',missions:[15,8,7,4],
  scene:[['chronist','Aus dem Frankenreich Karls des Großen wächst das Reich der Ottonen und Salier – mit Kaisern, Klöstern und Burgen.'],
   ['masako','Mein Sohn Otto ist drei Jahre alt, als sein Vater stirbt. Bis er selbst herrschen kann, regiere ich.'],
   ['ragnar','Wer die Mark Meißen hält, hält den Weg nach Osten. Darum streite ich mit Konrad von Wettin.'],
   ['jeanne','Auf dem Rupertsberg baue ich ein eigenes Kloster – gegen den Willen des Abtes vom Disibodenberg.'],
   ['khan','Und ganz am Anfang? Da stand Karl vor der Eresburg und ließ unsere Irminsul zerstören.']],
  source:'Reichsannalen zu 772 (Eresburg und Irminsul); Thietmar von Merseburg, Chronik IV (Theophanu); Vita sanctae Hildegardis',
  fuse:'772 nimmt Karl die Eresburg und zerstört die Irminsul. Hältst Du ihn nicht auf, bevor die Lunte abbrennt, fällt die Burg.',
  fuseSource:'Reichsannalen zu 772'},
 {id:'byzanz',title:'Zwischen Kreuz und Halbmond',missions:[13,19,3],
  scene:[['chronist','Seit 1096 ziehen Kreuzfahrer nach Osten. Zwischen Byzanz, den Kreuzfahrerstaaten und den Reichen des Islam wird um Jerusalem, Handel und Macht gerungen.'],
   ['anna','Ich schreibe die Alexias, die Geschichte meines Vaters Alexios – und ich habe die ersten Kreuzfahrer mit eigenen Augen gesehen.'],
   ['baibars','1260 halten wir Mamluken die Mongolen bei Ain Dschalut auf – eine ihrer ersten großen Niederlagen.'],
   ['dandolo','Venedig baut Euch die Flotte – für 85 000 Mark Silber. Wer nicht zahlen kann, zahlt anders.']],
  source:'Anna Komnene, Alexias X; Geoffroi de Villehardouin, Die Eroberung von Konstantinopel (Vertrag von Venedig 1201)',
  fuse:'Die Flotte liegt bereit, doch die Kreuzfahrer bringen das Geld nicht zusammen. Schlage den Dogen, bevor die Lunte abbrennt – sonst zieht das Heer 1202 für Venedig gegen Zara.',
  fuseSource:'Geoffroi de Villehardouin, Die Eroberung von Konstantinopel'},
 {id:'ostasien',title:'Neue Welten',missions:[14,6,20],
  scene:[['chronist','Zwischen 1400 und 1700 verändert sich die Welt: neue Bündnisse, neue Wissenschaft, neue Festungen – und jenseits des Ozeans wachsen eigene Reiche.'],
   ['nezahualcoyotl','Ich bin der Fürst von Texcoco und schreibe Gedichte. Mit Tenochtitlan schließe ich den Dreibund gegen Azcapotzalco.'],
   ['nostradamus','August der Starke will Gold. Gefangen, auch auf der Festung Königstein, suche ich es – und finde 1708 das weiße Porzellan.'],
   ['zizka','Eine Stadt, die Vauban belagert, ist genommen; eine Stadt, die Vauban verteidigt, ist uneinnehmbar – so sagt man.']],
  source:'Fernando de Alva Ixtlilxóchitl, Historia de la nación chichimeca (Dreibund 1428); Böttgers Laborbuch 1708; Sprichwort über Vauban („Ville assiégée par Vauban, ville prise …“)',
  fuse:'1692 belagern Ludwig XIV. und Vauban Namur, Coehoorn verteidigt die Festung. Brich den Widerstand, bevor die Lunte abbrennt und das Entsatzheer Wilhelms III. heran ist.',
  fuseSource:'Jean Racine, Relation de ce qui s’est passé au siège de Namur (1692)'},
 {id:'epilog',title:'Der letzte Horizont',epilogue:true,missions:[9],
  scene:[['chronist','Sechs Epochen hast Du durchschritten. Nun wartet der Hüter der Chronik selbst.'],
   ['musashi','1227 zog ich als Frau Venus verkleidet zu Turnieren von Mestre bei Venedig bis nach Böhmen – und schrieb alles auf. Wer die Geschichte erzählt, bestimmt, wie sie bleibt.']],
  source:'Ulrich von Liechtenstein, Frauendienst (Venusfahrt 1227)'}
].map((c,i)=>{const age=D.ageById[c.id];
 return {...c,index:i,numeral:c.epilogue?'':['I','II','III','IV','V','VI'][i],label:c.epilogue?'Epilog':'Kapitel '+['I','II','III','IV','V','VI'][i],
  era:age?age.name:'Alle Epochen',color:age?age.color:'#8a6a3a',icon:age?age.icon:'✦',scene:c.scene.map(([who,text])=>({who,text}))};});

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
