/* Aeterna (vormals Chroniken der Helden) – authored card set. Art cells map to matching named atlases. */
(function(root){'use strict';
const M=(name,cost,attack,health,text='',extra={})=>({name,cost,attack,health,type:'minion',text,...extra});
const S=(name,cost,text,effects,target=null)=>({name,cost,type:'spell',text,effects:Array.isArray(effects)?effects:[effects],target});
const E=(type,n,extra={})=>({type,n,...extra});
// Heldenfähigkeit als Daten (AP 5.10): dieselben Effekte wie bei Karten. target: null (ohne Ziel), eine Zielart wie bei
// Karten oder 'random' (ein zufälliger sichtbarer Feind). Bedingungen leitet die Engine aus den Effekten ab (Platz zum
// Rufen, ein noch fehlender Runenstein, etwas zum Ergründen).
const A=(effects,target=null)=>({effects:Array.isArray(effects)?effects:[effects],target});
// Zeitalter (AP 5.10): Helden derselben Epochengruppe teilen Zeitalterkarten (Feld age an der Karte) und später eine
// Spielfeldhälfte (AP 1.8). Farbe und Zeichen färben Rahmen und Platzhalter der Zeitalterkarten (AP 5.11).
// Seit 1.14.0 (AP L.1) sechs Epochen nach dem sächsischen Lehrplan (Klasse 5–7) mit je drei bis fünf Helden, in
// zeitlicher Reihenfolge. Die IDs bleiben, weil sie in den Karten-IDs der Zeitalterkarten stecken (steppe_2 gehört jetzt
// zu „Frühzeit und Ägypten“, ostasien_2 zur „Frühen Neuzeit“) – wie beim Schlüssel chroniken.profile.
const ages=[['steppe','Frühzeit und Ägypten','#a8843c','☥'],['griechen','Griechenland und Hellenismus','#4f7193','Ω'],['rom','Rom und Germanien','#9a4a2c','R'],
 ['mittelalter','Mittelalter im Reich','#6e5a3c','✠'],['byzanz','Kreuzzüge','#6d2f62','☧'],['ostasien','Frühe Neuzeit','#5f4b8f','⚜']]
 .map(([id,name,color,icon])=>({id,name,era:name,color,icon}));
// Helden nach dem Lehrplan (AP L.1, 1.14.0): elf Personen sind ersetzt. Die neue Person erbt ID, Spielweise,
// Heldenfähigkeit, KI-Persönlichkeit und Karten-IDs (khan ist Widukind, musashi_3 bleibt musashi_3) – Spielstände gelten
// weiter. Ersetzte Helden zeigen bis zum Astra-Porträt das Medaillon mit Monogramm (AP 5.12). Seit 1.15.0 (AP L.2) tragen
// auch ihre Karten Namen aus der Lebenswelt der neuen Person; Wirkungen und IDs bleiben.
const replaced=['khan','boudicca','nostradamus','jeanne','ragnar','musashi','amanirenas','masako','mandukhai','zizka','fuhao'];
const heroes=[
{id:'leonidas',name:'Leonidas I.',era:'Sparta',color:'#9c3830',power:'Phalanx',powerText:'Erhaltet 1 Rüstung. Eure Diener erhalten +1 Leben.',cost:2,icon:'Λ',age:'griechen',ability:A([E('armor',1),E('buffAll',0,{health:1})]),ai:'defensive'},
{id:'hypatia',name:'Hypatia',era:'Alexandria',color:'#336ea6',power:'Unterricht',powerText:'Ruft einen Schüler (1/1) herbei.',cost:2,icon:'✦',age:'griechen',ability:A(E('summon',1,{token:'student'})),ai:'combo'},
{id:'imhotep',name:'Imhotep',era:'Ägypten',color:'#c19940',power:'Baumeister des Djoser',powerText:'Euer schwächster Diener erhält +1/+1.',cost:2,icon:'☥',age:'steppe',ability:A(E('buffWeakest',1,{health:1})),ai:'defensive'},
{id:'dandolo',name:'Enrico Dandolo',era:'Venedig',color:'#8d5065',power:'Rammsporn der Galeeren',powerText:'Rüstet eine Waffe mit 1 Angriff und 2 Haltbarkeit aus.',cost:2,icon:'†',age:'byzanz',ability:A(E('weapon',1,{durability:2})),ai:'combo'},
{id:'khan',name:'Widukind',era:'Sachsen',color:'#947142',power:'Überfall aus dem Wald',powerText:'Fügt dem feindlichen Helden 2 Schaden zu.',cost:2,icon:'♘',age:'mittelalter',ability:A(E('face',2)),ai:'aggressive'},
{id:'boudicca',name:'Vercingetorix',era:'Arverner',color:'#45835b',power:'Kein Korn für Caesar',powerText:'Fügt einem zufälligen feindlichen Diener 1 Schaden zu.',cost:2,icon:'✹',age:'rom',ability:A(E('randomDamage',1,{minions:true})),ai:'aggressive'},
{id:'nostradamus',name:'Johann Friedrich Böttger',era:'Meißen',color:'#69509c',power:'Arkanum',powerText:'Zieht 1 Karte. Euer Held erleidet 1 Schaden.',cost:2,icon:'⚗',age:'ostasien',ability:A([E('draw',1),E('selfDamage',1)]),ai:'combo'},
{id:'jeanne',name:'Hildegard von Bingen',era:'Rupertsberg',color:'#b39853',power:'Klostergemeinschaft',powerText:'Ruft eine Novizin (1/1) herbei.',cost:2,icon:'❦',age:'mittelalter',ability:A(E('summon',1,{token:'novice',bonusIf:'jeanne_9'})),ai:'aggressive'},
{id:'ragnar',name:'Wiprecht von Groitzsch',era:'Mark Meißen',color:'#397c89',power:'Grenzsteine setzen',powerText:'Ruft einen zufälligen Grenzstein, den Ihr noch nicht habt.',cost:2,icon:'⚒',age:'mittelalter',ability:A(E('summonNew',1,{tokens:['totem_heal','totem_fire','totem_guard','totem_strength']})),ai:'aggressive'},
{id:'musashi',name:'Ulrich von Liechtenstein',era:'Steiermark',color:'#bd6571',power:'Tjost',powerText:'+1 Angriff für diesen Zug.',cost:1,icon:'⚔',age:'mittelalter',ability:A(E('heroAttack',1)),ai:'aggressive'},
// Welle 1 der neuen Helden (AP 5.10, 1.9.0): noch ohne Porträt – die Oberfläche zeigt ein Medaillon mit Monogramm (AP 5.12).
{id:'perikles',name:'Perikles',era:'Athen',color:'#7d8a3c',power:'Bauherr der Akropolis',powerText:'Ruft einen Bürger (1/2). Euer schwächstes Bauwerk erhält +2 Haltbarkeit.',cost:2,icon:'Π',age:'griechen',ability:A([E('summon',1,{token:'citizen'}),E('fortify',2,{else:[]})]),ai:'defensive'},
{id:'agrippa',name:'Marcus Agrippa',era:'Rom',color:'#a8552a',power:'Legionspioniere',powerText:'Ruft einen Pionier (1/3). Solange er lebt, kosten Eure Bauwerke 1 weniger.',cost:2,icon:'A',age:'rom',ability:A(E('summon',1,{token:'pioneer'})),ai:'combo'},
{id:'amanirenas',name:'Ahhotep I.',era:'Theben am Nil',color:'#2f8f7a',power:'Goldene Fliegen',powerText:'Verursacht 1 Schaden an einem zufälligen Feind. Stirbt dadurch ein Diener, der nicht beschworen wurde, zieht 1 Karte.',cost:2,icon:'☉',age:'steppe',ability:A(E('damage',1,{onKill:[E('draw',1)],noToken:true}),'random'),ai:'aggressive'},
{id:'anna',name:'Anna Komnene',era:'Byzanz',color:'#7b2d6a',power:'Alexiade',powerText:'Ergründet eine Karte, die in dieser Partie schon gespielt wurde.',cost:2,icon:'☧',age:'byzanz',ability:A(E('discover',1,{pool:'played'})),ai:'combo'},
{id:'nezahualcoyotl',name:'Nezahualcóyotl',era:'Texcoco',color:'#4f9a3a',power:'Quellwasser von Chapultepec',powerText:'Stellt bei allen eigenen Charakteren 2 Leben wieder her.',cost:2,icon:'❀',age:'ostasien',ability:A(E('healAll',2)),ai:'defensive'},
{id:'masako',name:'Theophanu',era:'Ottonen',color:'#3f4f8f',power:'Regentschaft',powerText:'Ein befreundeter Diener erhält +1 Leben und Schildwall.',cost:2,icon:'♛',age:'mittelalter',ability:A([E('buff',0,{health:1}),E('grant',1,{key:'taunt'})],'friendlyMinion'),ai:'defensive'},
// Welle 2 (AP 5.10, 1.11.0): Rivalen und Gegenstücke, je einer pro Zeitalter mit mehreren Helden – ebenfalls mit Monogramm.
{id:'epaminondas',name:'Epaminondas',era:'Theben',color:'#4e6fa8',power:'Schiefe Schlachtordnung',powerText:'Euer Diener ganz links erhält +1/+1.',cost:2,icon:'Θ',age:'griechen',ability:A(E('buffLeft',1,{health:1})),ai:'aggressive'},
{id:'fabius',name:'Fabius Maximus',era:'Römische Republik',color:'#7e3b4a',power:'Cunctator',powerText:'Verursacht 1 Schaden an einem feindlichen Diener und versetzt ihn in Starre.',cost:3,icon:'F',age:'rom',ability:A([E('damage',1),E('freeze',1)],'enemyMinion'),ai:'defensive'},
{id:'mandukhai',name:'Thusnelda',era:'Cherusker',color:'#c27c2e',power:'Ruf zu den Waffen',powerText:'Habt Ihr 3 oder mehr Diener, erhalten alle +1 Leben. Sonst ruft Ihr einen Stammeskrieger (1/2).',cost:2,icon:'☽',age:'rom',ability:A(E('ifMinions',3,{then:[E('buffAll',0,{health:1})],else:[E('summon',1,{token:'tribesman'})]})),ai:'combo'},
{id:'baibars',name:'Baibars',era:'Mamluken',color:'#b84a2a',power:'Mamlukenreiter',powerText:'Ein befreundeter Diener erhält +1 Angriff und Vorstoß.',cost:2,icon:'♞',age:'byzanz',ability:A([E('buff',1),E('grant',1,{key:'rush'})],'friendlyMinion'),ai:'aggressive'},
{id:'zizka',name:'Vauban',era:'Frankreich',color:'#4f5d3a',power:'Festungsbau',powerText:'Ruft einen Schanzkorb (1/2, Schildwall).',cost:2,icon:'✶',age:'ostasien',ability:A(E('summon',1,{token:'wagon'})),ai:'defensive'},
{id:'fuhao',name:'Fürstin von Vix',era:'Hallstattzeit',color:'#8c7a2c',power:'Handel mit Massalia',powerText:'Seht die obersten drei Karten Eures Decks an und nehmt eine davon auf die Hand.',cost:2,icon:'◎',age:'steppe',ability:A(E('discover',1,{pool:'deck'})),ai:'combo'}
];
const cards=[];
const sets={
leonidas:[M('Spartanischer Rekrut',1,1,3),M('Wächter der Thermopylen',2,2,3,'Schildwall.',{taunt:true}),S('Bronzener Wall',2,'Erhaltet 2 Rüstung. Eure Diener erhalten +2 Leben.',[E('armor',2),E('buffAll',0,{health:2})]),M('Hoplitenhauptmann',4,3,5,'Einmarsch: Erhaltet 2 Rüstung.',{battle:[E('armor',2)]}),M('Speerträger',3,4,2,'Sturmangriff.',{charge:true}),S('Schildstoß',3,'Verursacht 3 Schaden an einem Diener und versetzt ihn in Starre.',[E('damage',3),E('freeze',1)],'minion'),M('Phalanxveteran',5,4,6,'Schildwall. Segen.',{taunt:true,shield:true}),S('Spartas Erbe',4,'Gebt Euren Dienern +1/+2.',E('buffAll',1,{health:2})),M('Dienekes',6,5,6,'Vermächtnis: Erhaltet 6 Rüstung.',{death:[E('armor',6)]}),M('Gorgo, Stimme Spartas',7,4,6,'Schildwall. Einmarsch: Ruft je feindlichem Diener einen Hopliten (1/2, Schildwall). Eure Diener mit Schildwall haben +1 Angriff.',{taunt:true,aura:'gorgo',battle:[E('summonPerEnemy',1,{token:'hoplite'})]})],
hypatia:[M('Bibliothekslehrling',1,1,2,'Einmarsch: Stellt bei Eurem Helden 1 Leben wieder her.',{battle:[E('healHero',1)]}),S('Erdmessung des Eratosthenes',2,'Verursacht 3 Schaden.',E('damage',3),'any'),M('Sternenkundiger',3,2,3,'Einmarsch: Zieht 1 Karte.',{battle:[E('draw',1)]}),S('Sternkatalog des Hipparchos',4,'Fügt allen feindlichen Dienern 2 Schaden zu.',E('aoe',2)),M('Synesios von Kyrene',3,3,3,'Segen.',{shield:true}),S('Lehrsatz',2,'Ergründet einen Zauber. Zieht 1 Karte.',[E('discover',1,{pool:'spell'}),E('draw',1)]),M('Museionshüterin',5,4,7,'Schildwall.',{taunt:true}),S('Brennspiegel des Archimedes',6,'Verursacht 7 Schaden.',E('damage',7),'any'),M('Klaudios Ptolemaios',5,4,7,'Am Ende Eures Zuges: Fügt dem feindlichen Helden 1 Schaden zu.',{passive:'fire'}),M('Theon von Alexandria',5,4,6,'Weisheit +1. Am Ende Eures Zuges: Wirkt Euren zuletzt gewirkten Zauber erneut (zufällige Ziele).',{focus:1,passive:'echo'})],
imhotep:[M('Nilschülerin',1,1,3),S('Heilender Balsam',1,'Stellt bei einem Ziel 4 Leben wieder her. Zieht 1 Karte.',[E('heal',4),E('draw',1)],'any'),M('Pyramidenwächter',3,2,5,'Schildwall.',{taunt:true}),M('Tempelärztin',4,3,5,'Einmarsch: Stellt bei Eurem Helden 3 Leben wieder her.',{battle:[E('healHero',3)]}),S('Brot und Bier',2,'Gebt einem befreundeten Diener +2/+2.',E('buff',2,{health:2}),'friendlyMinion'),M('Balsamierer',3,3,4,'Vermächtnis: Stellt bei Eurem Helden 3 Leben wieder her.',{death:[E('healHero',3)]}),S('Nilschwemme',3,'Stellt bei allen Verbündeten 4 Leben wieder her. Zieht 1 Karte.',[E('healAll',4),E('draw',1)]),M('Goldener Skarabäus',5,4,5,'Segen. Schildwall.',{shield:true,taunt:true}),S('Urteil nach der Maat',5,'Verursacht 5 Schaden. Stellt bei Eurem Helden 5 Leben wieder her.',[E('damage',5),E('healHero',5)],'enemy'),M('Djoser, der Erbauer',6,4,5,'Einmarsch: Errichtet die Stufenpyramide (Bauwerk, 8 Haltbarkeit): Zu Beginn Eures Zuges erhält Euer schwächster Diener +2/+2.',{battle:[E('summon',1,{token:'pyramid'})]})],
dandolo:[M('Lagunenbote',1,1,1,'Vermächtnis: Zieht 1 Karte.',{death:[E('draw',1)]}),M('Arsenalarbeiter',2,2,3),S('Präziser Stich',2,'Verursacht 3 Schaden an einem Diener.',E('damage',3),'minion'),M('Handelsgesandter',4,3,5,'Einmarsch: Zieht 1 Karte.',{battle:[E('draw',1)]}),S('Dogenklinge',3,'Rüstet eine 3/2-Waffe aus.',E('weapon',3,{durability:2})),M('Nachtwache am Kanal',3,3,3,'Schildwall.',{taunt:true}),S('Geheimer Vertrag',2,'Zieht 2 Karten. Erhaltet 2 Rüstung.',[E('draw',2),E('armor',2)]),M('Admiral der Galeeren',5,5,5,'Einmarsch: Ruft einen Rekruten (1/1).',{battle:[E('summon',1,{token:'recruit'})]}),S('Arsenal von Venedig',5,'Rüstet eine 4/2-Waffe aus. Erhaltet 4 Rüstung.',[E('weapon',4,{durability:2}),E('armor',4)]),M('Marco Polo, der Weltenfahrer',6,5,5,'Einmarsch: Ergründet zweimal eine Karte eines anderen Helden. Sie kosten 1 weniger.',{battle:[E('discover',2,{pool:'foreign',mod:-1})]})],
khan:[M('Späher aus Engern',1,2,2),M('Speerwerfer aus Westfalen',2,3,2,'Einmarsch: Fügt dem feindlichen Helden 1 Schaden zu.',{battle:[E('face',1)]}),S('Pfeilschuss',2,'Verursacht 3 Schaden.',E('damage',3),'any'),M('Reiter der Edelinge',4,5,4,'Sturmangriff.',{charge:true}),M('Falknerin',3,2,3,'Vermächtnis: Ruft einen Habicht (2/1).',{death:[E('summon',1,{token:'eagle'})]}),S('Sachsenaufstand',3,'Gebt Euren Dienern +2 Angriff.',E('buffAll',2)),M('Schildträger aus Ostfalen',5,5,6,'Schildwall.',{taunt:true}),S('Sturm auf die Eresburg',6,'Fügt allen Feinden 3 Schaden zu.',E('aoe',3,{heroes:true})),M('Gefolgschaft Widukinds',6,6,4,'Sturmangriff.',{charge:true}),M('Abbi, Gefährte Widukinds',6,6,6,'Vorstoß. Greift ein anderer eigener Diener an, greift ein zufälliger weiterer eigener Diener dasselbe Ziel an.',{rush:true,aura:'pincer'})],
boudicca:[M('Hüterin des Hains',1,1,4),S('Schild aus Eichenholz',2,'Erhaltet 4 Rüstung. Zieht 1 Karte.',[E('armor',4),E('draw',1)]),M('Krieger der Arverner',3,4,4),S('Hieb mit dem Langschwert',3,'Verursacht 4 Schaden.',E('damage',4),'any'),M('Reiter der Arverner',4,4,3,'Sturmangriff.',{charge:true}),M('Heilkundige mit der Mistel',3,2,4,'Am Ende Eures Zuges: Heilt Eure Diener um 1.',{passive:'heal'}),S('Erhebung der Gallier',3,'Gebt Euren Dienern +2/+1.',E('buffAll',2,{health:1})),M('Verteidiger von Gergovia',6,5,8,'Schildwall.',{taunt:true}),S('Letzter Ritt vor Alesia',5,'Euer Held erhält in diesem Zug +5 Angriff und 5 Rüstung.',[E('heroAttack',5),E('armor',5)]),M('Commius, Führer des Entsatzheers',8,5,5,'Kostet 1 weniger je zwei eigene Diener, die in dieser Partie starben. Einmarsch: Holt den zuletzt gestorbenen eigenen Diener zurück.',{costPerFallen:2,battle:[E('revive',1)]})],
nostradamus:[M('Apothekerlehrling',1,2,1,'Vermächtnis: Stellt bei Eurem Helden 3 Leben wieder her.',{death:[E('healHero',3)]}),S('Verpuffung im Laboratorium',2,'Verursacht 3 Schaden.',E('damage',3),'any'),M('Bergmann aus Aue',3,2,4),S('Rezept des Goldmachers',4,'Zieht 3 Karten. Euer Held erleidet 2 Schaden.',[E('draw',3),E('selfDamage',2)]),M('Pestarzt',4,3,5,'Einmarsch: Fügt allen feindlichen Dienern 1 Schaden zu.',{battle:[E('aoe',1)]}),S('Befehl des Kurfürsten',2,'Gebt einem befreundeten Diener +3/+3. Euer Held erleidet 2 Schaden.',[E('buff',3,{health:3}),E('selfDamage',2)],'friendlyMinion'),M('Schreiber der Manufaktur',5,4,6,'Vermächtnis: Zieht 2 Karten.',{death:[E('draw',2)]}),S('Glut des Brennofens',5,'Fügt allen Dienern 4 Schaden zu.',E('aoe',4,{both:true})),M('Wache auf dem Königstein',6,6,7,'Schildwall.',{taunt:true}),M('Tschirnhaus, Naturforscher',5,4,5,'Am Ende Eures Zuges: Zieht eine Karte, sie kostet 2 weniger. Euer Held erleidet 1 Schaden.',{passive:'regent'})],
jeanne:[M('Pförtnerin vom Rupertsberg',1,1,3,'Segen.',{shield:true}),S('Grünkraft',2,'Gebt einem befreundeten Diener +2/+2.',E('buff',2,{health:2}),'friendlyMinion'),M('Klostervogt',3,3,4,'Schildwall.',{taunt:true}),S('Einkleidung der Novizinnen',2,'Ruft drei Novizinnen (1/1).',E('summon',3,{token:'novice'})),M('Pilger am Rhein',4,3,3,'Segen.',{shield:true}),S('Segen der Äbtissin',2,'Verleiht einem befreundeten Diener Segen. Zieht 1 Karte.',[E('shield',1),E('draw',1)],'friendlyMinion'),M('Vorsängerin im Chor',5,4,4,'Einmarsch: Eure anderen Diener erhalten +1/+1.',{battle:[E('buffAll',1,{health:1,excludeSelf:true})]}),S('Spiel der Tugenden',6,'Gebt Euren Dienern +2/+2.',E('buffAll',2,{health:2})),M('Ritter mit dem Schutzbrief',7,4,6,'Segen. Schildwall.',{shield:true,taunt:true}),M('Jutta von Sponheim, Magistra',7,4,6,'Segen. Eure Novizinnen haben +1/+1 und Segen. Eure Heldenfähigkeit ruft zwei Novizinnen.',{shield:true,aura:'lahire'})],
ragnar:[M('Siedler aus Franken',1,1,3),S('Fehde',2,'Verursacht 3 Schaden.',E('damage',3),'any'),M('Burgmann von Groitzsch',3,3,4,'Schildwall.',{taunt:true}),M('Lokator',4,4,4,'Einmarsch: Ruft einen Grenzstein des Klosters (0/2).',{battle:[E('summon',1,{token:'totem_heal'})]}),S('Verhau',3,'Fügt allen feindlichen Dienern 1 Schaden zu und versetzt sie in Starre.',[E('aoe',1),E('freeze',1,{all:true})]),M('Panzerreiter',4,5,3,'Sturmangriff.',{charge:true}),S('Rodung',3,'Gebt Euren Dienern +1/+2.',E('buffAll',1,{health:2})),M('Grenzwächter der Mark',5,4,6,'Vermächtnis: Ruft einen Grenzstein der Mark (0/2).',{death:[E('summon',1,{token:'totem_fire'})]}),S('Heerfahrt nach Italien',5,'Verursacht 6 Schaden. Zieht 1 Karte.',[E('damage',6),E('draw',1)],'any'),M('Judith von Böhmen',7,6,7,'Schildwall. Einmarsch: Ruft jeden Grenzstein einmal. Eure Grenzsteine haben Schildwall und +1 Leben.',{taunt:true,aura:'lagertha',battle:[E('totems',1)]})],
musashi:[M('Edelknabe',1,2,1),S('Lanzenstoß',1,'Verursacht 2 Schaden an einem Diener.',E('damage',2),'minion'),M('Fahrender Ritter',3,3,4),S('Minnebrief',2,'Zieht 2 Karten.',E('draw',2)),M('Minneritter',3,2,4,'Segen.',{shield:true}),S('Mit eingelegter Lanze',3,'Euer Held erhält für diesen Zug +4 Angriff und 2 Rüstung.',[E('heroAttack',4),E('armor',2)]),M('Kämpe im Buhurt',4,4,3,'Vorstoß.',{rush:true}),S('Venusfahrt',5,'Gebt einem befreundeten Diener +3/+3 und Segen.',[E('buff',3,{health:3}),E('shield',1)],'friendlyMinion'),M('Landrichter der Steiermark',6,5,6,'Segen. Vermächtnis: Zieht 1 Karte.',{shield:true,death:[E('draw',1)]}),M('Friedrich der Streitbare',6,5,6,'Doppelschlag. Einmarsch: Duell – Friedrich und ein feindlicher Diener Eurer Wahl kämpfen, bis einer stirbt.',{double:true,target:'enemyMinion',battle:[E('duel',1)]})]
};
heroes.slice(0,10).forEach((h,i)=>{if(!replaced.includes(h.id)){h.art='heroes';h.cell=i;}});
// Kartenbilder ersetzter Helden (AP L.2): Nur Motive, die zur neuen Person passen, bleiben; die übrigen (Mongolen, Wikinger,
// Samurai, Lilienbanner) werden Platzhalter mit Bildidee in MOTIVE.md.
const keepArt=new Set(['khan_2','boudicca_0','boudicca_1','boudicca_5','boudicca_6','nostradamus_0','nostradamus_3','nostradamus_4']);
for(const h of heroes.slice(0,10))sets[h.id].forEach((c,i)=>{const id=h.id+'_'+i,art=!replaced.includes(h.id)||keepArt.has(id);
 cards.push({...c,id,hero:h.id,rarity:['basic','basic','basic','basic','common','common','rare','rare','epic','legendary'][i],art:art?h.id:null,cell:art?i:0});});
const neutral=[
M('Dorfwache',1,1,2,'Schildwall.',{taunt:true}),M('Wandernder Händler',2,2,2,'Vermächtnis: Erhaltet 2 Rüstung.',{death:[E('armor',2)]}),M('Steinschleuderer',2,3,2),M('Wilderin',3,3,3,'Tarnung.',{stealth:true}),M('Torwache der Burg',4,3,5,'Schildwall.',{taunt:true}),M('Kavallerist',4,4,3,'Sturmangriff.',{charge:true}),M('Feldheilerin',3,2,4,'Einmarsch: Heilt Euren Helden um 3.',{battle:[E('healHero',3)]}),M('Archivarin',4,3,4,'Einmarsch: Zieht 1 Karte.',{battle:[E('draw',1)]}),M('Wachhund',2,2,2,'Schildwall.',{taunt:true}),M('Veteran',5,5,6),M('Belagerungsturm',6,5,7,'Schildwall.',{taunt:true}),M('Schmied',3,3,3,'Einmarsch: Erhaltet 2 Rüstung.',{battle:[E('armor',2)]}),M('Wüstenspäherin',1,2,1),M('Gebirgswache',5,4,7,'Schildwall.',{taunt:true}),M('Verwegener Bote',3,3,2,'Sturmangriff.',{charge:true}),M('Nachtwächter',2,1,3,'Vermächtnis: Zieht 1 Karte.',{death:[E('draw',1)]}),S('Versorgung',2,'Zieht 2 Karten.',E('draw',2)),S('Heilkräuter',1,'Heilt ein Ziel um 4.',E('heal',4),'any'),S('Wurfmesser',2,'Verursacht 2 Schaden.',E('damage',2),'any'),M('Kriegselefant',7,7,8,'Vorstoß.',{rush:true}),
M('Ordensritter',3,2,3,'Segen.',{shield:true}),M('Söldnerhauptmann',4,4,4,'Einmarsch: Erhaltet 2 Rüstung.',{battle:[E('armor',2)]}),M('Adler der Berge',2,3,1,'Sturmangriff.',{charge:true}),M('Grabwächter',4,3,5,'Vermächtnis: Ruft einen Krieger (2/2).',{death:[E('summon',1,{token:'warrior'})]}),S('Sammelruf',3,'Ruft zwei Krieger (2/2).',E('summon',2,{token:'warrior'})),S('Feldration',2,'Heilt alle Verbündeten um 2.',E('healAll',2)),M('Bogenmeisterin',4,4,3,'Einmarsch: Fügt dem feindlichen Helden 2 Schaden zu.',{battle:[E('face',2)]}),M('Prätorianer',5,4,6,'Schildwall.',{taunt:true}),
M('Silberner Bannerträger',4,3,4,'Einmarsch: Eure anderen Diener erhalten +1/+1.',{battle:[E('buffAll',1,{health:1,excludeSelf:true})]}),S('Flammenkrug',4,'Fügt allen feindlichen Dienern 2 Schaden zu.',E('aoe',2)),M('Löwin der Arena',5,5,4,'Segen.',{shield:true}),M('Seidenkarawanenführer',5,4,4,'Einmarsch: Zieht 2 Karten.',{battle:[E('draw',2)]}),S('Schlachtruf',4,'Gebt Euren Dienern +2 Angriff.',E('buffAll',2)),M('Trojanisches Pferd',6,5,7,'Vermächtnis: Ruft zwei Krieger (2/2).',{death:[E('summon',2,{token:'warrior'})]}),
M('Brander',7,6,5,'Vermächtnis: Fügt allen feindlichen Dienern 3 Schaden zu.',{death:[E('aoe',3)]}),S('Mercators Atlas',4,'Ergründet zwei Karten. Erhaltet 3 Rüstung.',[E('discover',2,{pool:'any'}),E('armor',3)]),M('Burgbesatzung',8,6,9,'Schildwall. Segen.',{taunt:true,shield:true}),S('Donnernde Legion',7,'Ruft drei Krieger (2/2) und gebt Euren Dienern +1/+1.',[E('summon',3,{token:'warrior'}),E('buffAll',1,{health:1})]),
M('Herodot, Vater der Geschichte',4,4,4,'Einmarsch: Ergründet eine Zeitalterkarte – auch aus einem fremden Zeitalter.',{battle:[E('discover',1,{pool:'ages'})]}),M('Zenobia, Rebellin von Palmyra',8,6,6,'Einmarsch: Übernehmt die Kontrolle über einen feindlichen Diener mit höchstens 4 Angriff.',{target:'enemyMinion',targetMax:4,battle:[E('steal',1)]})
];
// Neutrale Karten nach Lehrplan-Lebenswelten (AP L.2): Fantasy-Namen sind geschärft (Wilderin, Nachtwächter, Burgbesatzung …);
// wo das alte Motiv nicht mehr passt (Golem, Phönix, Weltenbaum, Marmorstatue), zeichnet der Renderer einen Platzhalter.
// AP L.6 (1.24.0): ebenso für Ordensritter (Kristallgestalt) und Grabwächter (Skelett) – beide Motive stehen im Astra-Auftrag.
// Zwei ungenutzte alte Bilder ersetzen falsche: Steinadler statt Weißkopfseeadler, goldenes Buch mit Erdkugel für Mercators Atlas.
const newMotif=new Set([20,23,27,33,34,36]),oldArt={22:['khan',10],35:['neutral3',10]};
neutral.forEach((c,i)=>cards.push({...c,id:'neutral_'+i,hero:'neutral',rarity:i<20?'basic':i<28?'common':i<34?'rare':i<38?'epic':'legendary',...(oldArt[i]?{art:oldArt[i][0],cell:oldArt[i][1]}:i<40&&!newMotif.has(i)?{art:'neutral'+Math.floor(i/10),cell:i%10}:{art:null,cell:0})}));
// AP 5.4 Teil 2 (1.8.0): Plünderung, Tarnung, Bannung, Tödliches Gift und Belastung. Neue Karten hängen hinten an
// (feste IDs, Spielstände bleiben gültig) und haben noch kein Motiv – der Renderer zeichnet einen Platzhalter (AP 5.12).
const wave=[
 ['dandolo_10','common',M('Spitzel im Venezianerviertel',3,4,3,'Tarnung.',{stealth:true})],
 ['khan_10','common',M('Plünderer am Rhein',3,3,3,'Plünderung.',{plunder:true})],
 ['imhotep_10','common',M('Kobra des Nils',2,1,2,'Tödliches Gift.',{poison:true})],
 ['boudicca_10','rare',{...S('Zwanzig Städte in Flammen',3,'Fügt allen feindlichen Dienern 2 Schaden zu. Belastung 1.',E('aoe',2)),overload:1}],
 ['nostradamus_10','rare',S('Eid der Arkanisten',1,'Belegt einen Diener mit Bannung. Zieht 1 Karte.',[E('silence',1),E('draw',1)],'minion')],
 ['ragnar_10','common',M('Böhmischer Söldner',4,3,5,'Plünderung.',{plunder:true})],
 ['ragnar_11','common',{...S('Brandschatzung',1,'Verursacht 3 Schaden. Belastung 1.',E('damage',3),'any'),overload:1}],
 ['musashi_10','common',M('Heimlicher Bote',2,3,2,'Tarnung.',{stealth:true})],
 ['neutral_42','common',M('Freibeuterin',2,2,2,'Plünderung.',{plunder:true})],
 ['neutral_43','common',M('Späherin im Unterholz',1,2,1,'Tarnung.',{stealth:true})],
 ['neutral_44','common',M('Wandermönch',2,2,2,'Einmarsch: Belegt einen Diener mit Bannung.',{target:'minion',battle:[E('silence',1)]})],
 ['neutral_45','rare',M('Giftmischerin',3,2,3,'Tödliches Gift.',{poison:true})],
 ['neutral_46','common',M('Condottiere',3,4,5,'Belastung 2.',{overload:2})]];
for(const [id,rarity,c] of wave)cards.push({...c,id,hero:id.slice(0,id.lastIndexOf('_')),rarity,art:null,cell:0});
// Welle 1 der neuen Helden (AP 5.10): je 10 Karten, Seltenheiten wie bei den ersten zehn (0–3 Basis und Startdeck,
// 4–5 gewöhnlich, 6–7 selten, 8 episch, 9 legendär). Noch ohne Motiv: Platzhalter (AP 5.12), Prompts in MOTIVE.md.
const heroes2={
perikles:[M('Ruderer der Triere',1,2,2,'Plünderung.',{plunder:true}),M('Lange Mauern',2,0,5,'Bauwerk. Schildwall.',{building:true,taunt:true}),S('Rede auf die Gefallenen',3,'Gebt Euren Dienern +1/+2.',E('buffAll',1,{health:2})),M('Strategos',3,3,4,'Einmarsch: Euer schwächstes Bauwerk erhält +2 Haltbarkeit. Ohne Bauwerk erhaltet Ihr 2 Rüstung.',{battle:[E('fortify',2,{else:[E('armor',2)]})]}),M('Pnyx',3,0,5,'Bauwerk. Zu Beginn Eures Zuges: Zieht 1 Karte.',{building:true,start:[E('draw',1)]}),S('Scherbengericht',2,'Schickt einen feindlichen Diener auf die Hand seines Besitzers zurück.',E('bounce',1),'enemyMinion'),M('Triere von Salamis',4,4,4,'Vorstoß. Plünderung.',{rush:true,plunder:true}),S('Pest von Athen',4,'Fügt allen Dienern 2 Schaden zu. Bauwerke bleiben verschont.',E('aoe',2,{both:true})),M('Odeion',4,0,7,'Bauwerk. Zu Beginn Eures Zuges: Ruft einen Bürger (1/2).',{building:true,start:[E('summon',1,{token:'citizen'})]}),M('Phidias, Meister der Akropolis',7,5,5,'Einmarsch: Errichtet die Athena Parthenos (Bauwerk, 8 Haltbarkeit): Eure Diener haben +1/+1.',{battle:[E('summon',1,{token:'parthenos'})]})],
agrippa:[M('Pilumwerfer',1,1,2,'Einmarsch: Verursacht 1 Schaden.',{target:'any',battle:[E('damage',1)]}),M('Legionär der Zehnten',2,3,2,'Vorstoß.',{rush:true}),M('Castra',3,0,5,'Bauwerk. Eure Diener haben +1/+1.',{building:true,buffAura:{attack:1,health:1}}),S('Testudo',2,'Gebt einem befreundeten Diener +2/+2 und Schildwall.',[E('buff',2,{health:2}),E('grant',1,{key:'taunt'})],'friendlyMinion'),M('Ballista',3,0,5,'Bauwerk. Am Ende Eures Zuges: Fügt einem zufälligen Feind 2 Schaden zu.',{building:true,end:[E('randomDamage',2)]}),S('Liburnen bei Actium',3,'Fügt zweimal einem zufälligen feindlichen Diener 2 Schaden zu.',E('randomDamage',2,{times:2,minions:true})),M('Primus Pilus',5,5,4,'Vorstoß. Einmarsch: Gebt Euren anderen Dienern +1 Angriff.',{rush:true,battle:[E('buffAll',1,{excludeSelf:true})]}),M('Thermen des Agrippa',2,0,4,'Bauwerk. Am Ende Eures Zuges: Stellt bei Eurem Helden 2 Leben wieder her.',{building:true,end:[E('healHero',2)]}),M('Pantheon',4,0,6,'Bauwerk. Zu Beginn Eures Zuges: Ergründet eine Karte eines anderen Helden.',{building:true,start:[E('discover',1,{pool:'foreign'})]}),M('Vitruv, Baumeister Roms',5,4,5,'Eure Bauwerke kosten 2 weniger. Einmarsch: Ergründet ein Bauwerk.',{buildingDiscount:2,battle:[E('discover',1,{pool:'building'})]})],
amanirenas:[M('Bogenschütze aus Elkab',1,1,2,'Vermächtnis: Fügt einem zufälligen feindlichen Diener 1 Schaden zu.',{death:[E('randomDamage',1,{minions:true})]}),M('Krieger der Nilflotte',2,2,2,'Plünderung.',{plunder:true}),S('Pfeilregen vor Auaris',2,'Fügt allen feindlichen Dienern 1 Schaden zu.',E('aoe',1)),M('Speerträger aus Theben',3,3,3,'Vorstoß.',{rush:true}),M('Priester der Selket',3,2,3,'Einmarsch: Gebt einem befreundeten Diener Tödliches Gift.',{target:'friendlyMinion',battle:[E('grant',1,{key:'poison'})]}),M('Medjai-Kundschafter',3,2,2,'Tarnung. Tödliches Gift.',{stealth:true,poison:true}),M('Erbeuteter Streitwagen',6,5,6,'Vorstoß. Plünderung.',{rush:true,plunder:true}),S('Überfall auf Nefrusi',3,'Verursacht 3 Schaden an einem Diener. Stellt bei Eurem Helden 3 Leben wieder her.',[E('damage',3),E('healHero',3)],'minion'),M('Ahmose, Befreier Ägyptens',5,5,4,'Doppelschlag. Plünderung.',{double:true,plunder:true}),S('Zeremonialaxt des Ahmose',6,'Vernichtet einen feindlichen Diener. Euer Gegner hat im nächsten Zug 2 Mana weniger.',[E('destroy',1),E('enemyOverload',2)],'enemyMinion')],
anna:[M('Kopistin der Chronik',1,1,3,'Einmarsch: Stellt bei Eurem Helden 1 Leben wieder her.',{battle:[E('healHero',1)]}),S('Pantokrator-Spital',3,'Stellt bei allen eigenen Charakteren 2 Leben wieder her. Zieht 1 Karte.',[E('healAll',2),E('draw',1)]),M('Warägergardist',3,2,3,'Schildwall. Segen.',{taunt:true,shield:true}),M('Hofärztin',3,1,3,'Am Ende Eures Zuges: Stellt bei Eurem Helden 1 Leben wieder her.',{end:[E('healHero',1)]}),{...S('Griechisches Feuer',4,'Fügt allen feindlichen Dienern 3 Schaden zu. Belastung 2.',E('aoe',3)),overload:2},M('Bibliothekar von Konstantinopel',4,4,5,'Einmarsch: Ergründet einen Zauber.',{battle:[E('discover',1,{pool:'spell'})]}),M('Kataphrakt',5,4,6,'Vorstoß. Schildwall.',{rush:true,taunt:true}),S('Chrysobull',3,'Zieht 2 Karten. Sie kosten 1 weniger.',E('draw',2,{mod:-1})),M('Nikephoros Bryennios',5,4,5,'Einmarsch: Ergründet zweimal eine Karte, die in dieser Partie schon gespielt wurde.',{battle:[E('discover',2,{pool:'played'})]}),M('Alexios I. Komnenos',6,5,6,'Am Ende Eures Zuges: Erhaltet eine zufällige Karte, die in dieser Partie schon gespielt wurde.',{end:[E('discover',1,{pool:'played'})]})],
nezahualcoyotl:[M('Gärtner von Tetzcotzinco',1,1,4,'Wann immer dieser Diener geheilt wird, erhält er +1 Angriff.',{onHeal:[E('buffSelf',1)]}),M('Adlerkrieger',2,2,3,'Vorstoß.',{rush:true}),S('Blumenkrieg',2,'Verursacht 2 Schaden an einem Diener. Stellt bei allen eigenen Charakteren 2 Leben wieder her.',[E('damage',2),E('healAll',2)],'minion'),M('Jaguarkrieger',3,3,3,'Tarnung. Plünderung.',{stealth:true,plunder:true}),M('Aquädukt von Chapultepec',2,0,5,'Bauwerk. Am Ende Eures Zuges: Stellt bei allen eigenen Charakteren 2 Leben wieder her.',{building:true,end:[E('healAll',2)]}),S('Gesetze von Texcoco',2,'Versetzt einen feindlichen Diener in Starre. Zieht 1 Karte.',[E('freeze',1),E('draw',1)],'enemyMinion'),M('Quetzal-Hauptmann',4,4,5,'Einmarsch: Stellt bei allen eigenen Charakteren 3 Leben wieder her.',{battle:[E('healAll',3)]}),M('Damm von Nezahualcóyotl',4,0,7,'Bauwerk. Schildwall. Am Ende Eures Zuges: Stellt bei allen eigenen Charakteren 2 Leben wieder her.',{building:true,taunt:true,end:[E('healAll',2)]}),M('Itzcoatl, Herr von Tenochtitlan',6,5,5,'Einmarsch: Ruft einen Adlerkrieger und einen Jaguarkrieger.',{battle:[E('summon',1,{token:'nezahualcoyotl_1'}),E('summon',1,{token:'nezahualcoyotl_3'})]}),M('Nezahualpilli, Sohn des Dichters',5,3,6,'Wann immer ein eigener Charakter geheilt wird, erhält ein zufälliger eigener Diener +1 Angriff.',{allyHeal:[E('buffRandom',1)]})],
masako:[M('Lehnsmann',1,1,2,'Vermächtnis: Ein zufälliger eigener Diener erhält +1/+1.',{death:[E('buffRandom',1,{health:1})]}),M('Bogenschütze der Pfalz',2,2,2,'Einmarsch: Fügt einem feindlichen Diener 1 Schaden zu.',{target:'enemyMinion',battle:[E('damage',1)]}),S('Treueschwur',1,'Gebt Euren Dienern mit Schildwall +2/+2.',E('buffAll',2,{health:2,only:'taunt'})),M('Stiftsdame aus Quedlinburg',2,1,3,'Einmarsch: Gebt einem befreundeten Diener Segen.',{target:'friendlyMinion',battle:[E('shield',1)]}),M('Späher an der Elbe',2,2,2,'Tarnung. Vermächtnis: Zieht 1 Karte.',{stealth:true,death:[E('draw',1)]}),S('Heerbann',4,'Ruft drei Lehnsmänner.',E('summon',3,{token:'masako_0'})),M('St. Pantaleon in Köln',2,0,4,'Bauwerk. Zu Beginn Eures Zuges: Ein zufälliger eigener Diener erhält Segen.',{building:true,start:[E('grantRandom',1,{key:'shield'})]}),S('Haft in Utrecht',3,'Belegt einen feindlichen Diener mit Bannung und versetzt ihn in Starre.',[E('silence',1),E('freeze',1)],'enemyMinion'),M('Willigis, Erzbischof von Mainz',5,4,6,'Schildwall. Einmarsch: Gebt Euren anderen Dienern mit Schildwall +2/+2.',{taunt:true,battle:[E('buffAll',2,{health:2,only:'taunt',excludeSelf:true})]}),M('Otto II., Kaiser',6,5,5,'Vermächtnis: Eure Diener erhalten +2/+2 und Schildwall.',{death:[E('buffAll',2,{health:2}),E('grantAll',1,{key:'taunt'})]})]
};
for(const [hero,list] of Object.entries(heroes2))list.forEach((c,i)=>cards.push({...c,id:hero+'_'+i,hero,rarity:['basic','basic','basic','basic','common','common','rare','rare','epic','legendary'][i],art:null,cell:0}));
// Kartenwelle 1 (AP 5.11, 1.10.0): je Held zwei Karten, je sieben Zeitalterkarten für die Zeitalter mit mehreren Helden
// (Griechische Antike, Europäisches Mittelalter, China/Korea/Japan) und drei neutrale Weltwunder als Bauwerke (AP 5.5).
// Zeitalterkarten tragen ihr Zeitalter als hero und age (IDs <zeitalter>_<n>); D.playable lässt sie in die Decks aller
// Helden dieses Zeitalters. IDs nur hinten anhängen (Spielstände); alle noch ohne Motiv (Platzhalter, AP 5.12).
const RUNES=['totem_heal','totem_fire','totem_guard','totem_strength'];
const wave1=[
 ['leonidas_10','common',M('Spartiat der Dreihundert',3,2,4,'Schildwall. Wann immer dieser Diener Schaden erleidet, erhält er +1 Angriff.',{taunt:true,onDamage:[E('buffSelf',1)]})],
 ['leonidas_11','rare',S('Engpass der Thermopylen',3,'Versetzt alle feindlichen Diener mit 3 oder mehr Angriff in Starre.',E('freeze',1,{all:true,minAttack:3}))],
 ['hypatia_10','common',M('Astronomin des Museions',2,2,3,'Weisheit +1.',{focus:1})],
 ['hypatia_11','rare',S('Kommentar zu Diophant',2,'Verursacht 2 Schaden an einem Diener. Stirbt er, ergründet Ihr einen Zauber.',E('damage',2,{onKill:[E('discover',1,{pool:'spell'})]}),'minion')],
 ['imhotep_11','common',M('Priesterin der Sachmet',3,3,3,'Einmarsch: Stellt bei einem Ziel 3 Leben wieder her.',{target:'any',battle:[E('heal',3)]})],
 ['imhotep_12','rare',M('Ka-Statue',2,0,6,'Bauwerk. Schildwall. Vermächtnis: Stellt bei Eurem Helden 5 Leben wieder her.',{building:true,taunt:true,death:[E('healHero',5)]})],
 ['dandolo_11','common',M('Galeerenschmied',2,2,2,'Einmarsch: Eure Waffe erhält +1 Angriff und +1 Haltbarkeit.',{battle:[E('weaponUp',1)]})],
 ['dandolo_12','rare',S('Plünderung Konstantinopels',6,'Vernichtet einen feindlichen Diener. Ergründet eine Karte eines anderen Helden.',[E('destroy',1),E('discover',1,{pool:'foreign'})],'enemyMinion')],
 ['khan_11','common',M('Heerlager an der Weser',3,0,4,'Bauwerk. Zu Beginn Eures Zuges: Ruft einen Reiter (1/1, Sturmangriff).',{building:true,start:[E('summon',1,{token:'rider'})]})],
 ['khan_12','rare',S('Versammlung in Marklo',4,'Ruft drei Reiter (1/1, Sturmangriff).',E('summon',3,{token:'rider'}))],
 ['boudicca_11','common',M('Barde der Arverner',2,2,2,'Einmarsch: Euer Held erhält in diesem Zug +2 Angriff.',{battle:[E('heroAttack',2)]})],
 ['boudicca_12','rare',M('Gallische Reiterei',5,3,3,'Sturmangriff. Einmarsch: Fügt allen feindlichen Dienern 1 Schaden zu.',{charge:true,battle:[E('aoe',1)]})],
 ['nostradamus_11','common',S('Laborbuch',1,'Zieht 1 Karte. Sie kostet 1 weniger.',E('draw',1,{mod:-1}))],
 ['nostradamus_12','rare',S('Weißes Gold',3,'Ergründet eine Karte. Sie kostet 2 weniger. Euer Held erleidet 2 Schaden.',[E('discover',1,{pool:'any',mod:-2}),E('selfDamage',2)])],
 ['jeanne_10','common',M('Adlige Stifterin',1,1,2,'Einmarsch: Ruft eine Novizin (1/1).',{battle:[E('summon',1,{token:'novice'})]})],
 ['jeanne_11','rare',S('Weihe der Klosterkirche',4,'Gebt Euren Dienern Segen.',E('grantAll',1,{key:'shield'}))],
 ['ragnar_12','common',M('Feldmesser',2,1,3,'Einmarsch: Ruft einen zufälligen Grenzstein, den Ihr noch nicht habt.',{battle:[E('summonNew',1,{tokens:RUNES})]})],
 ['ragnar_13','rare',S('Beuterecht',1,'Gebt einem befreundeten Diener +3 Angriff und Plünderung.',[E('buff',3),E('grant',1,{key:'plunder'})],'friendlyMinion')],
 ['musashi_11','rare',M('Ritter aus Murau',4,3,4,'Doppelschlag.',{double:true})],
 ['musashi_12','common',S('Frische Lanze',2,'Gebt einem befreundeten Diener +1 Angriff und Doppelschlag.',[E('buff',1),E('grant',1,{key:'double'})],'friendlyMinion')],
 ['perikles_10','common',M('Steinmetz vom Pentelikon',2,1,3,'Einmarsch: Euer schwächstes Bauwerk erhält +2 Haltbarkeit. Ohne Bauwerk ruft er einen Bürger (1/2).',{battle:[E('fortify',2,{else:[E('summon',1,{token:'citizen'})]})]})],
 ['perikles_11','rare',S('Schatz des Seebunds',3,'Zieht 1 Karte, dazu 1 für jedes eigene Bauwerk (höchstens 3).',E('draw',1,{per:'building',max:3}))],
 ['agrippa_10','common',M('Aquilifer',3,2,3,'Einmarsch: Gebt Euren anderen Dienern +1 Leben.',{battle:[E('buffAll',0,{health:1,excludeSelf:true})]})],
 ['agrippa_11','rare',{...S('Harpax',4,'Übernehmt die Kontrolle über einen feindlichen Diener mit höchstens 2 Angriff.',E('steal',1),'enemyMinion'),targetMax:2}],
 ['amanirenas_10','common',M('Pfeilmacher aus Edfu',2,2,3,'Einmarsch: Fügt einem zufälligen Feind 1 Schaden zu.',{battle:[E('randomDamage',1)]})],
 ['amanirenas_11','rare',S('Gift der Hornviper',3,'Zwei zufällige eigene Diener erhalten Tödliches Gift. Zieht 1 Karte.',[E('grantRandom',1,{key:'poison'}),E('grantRandom',1,{key:'poison'}),E('draw',1)])],
 ['anna_10','common',M('Spitalarzt des Pantokrator',2,1,3,'Am Ende Eures Zuges: Heilt Eure Diener um 1.',{passive:'heal'})],
 ['anna_11','rare',M('Chronist am Kaiserhof',6,5,6,'Kostet 1 weniger je drei Karten, die in dieser Partie gespielt wurden.',{costPerPlayed:3})],
 ['nezahualcoyotl_10','common',M('Dichter von Texcoco',2,2,3,'Einmarsch: Stellt bei allen eigenen Charakteren 1 Leben wieder her.',{battle:[E('healAll',1)]})],
 ['nezahualcoyotl_11','rare',M('Chinampa',2,0,4,'Bauwerk. Zu Beginn Eures Zuges: Ein zufälliger eigener Diener erhält +1/+1.',{building:true,start:[E('buffRandom',1,{health:1})]})],
 ['masako_10','common',M('Kanzler der Kaiserin',2,2,3,'Einmarsch: Gebt einem befreundeten Diener Schildwall.',{target:'friendlyMinion',battle:[E('grant',1,{key:'taunt'})]})],
 ['masako_11','rare',S('Siegel der Kaiserin',2,'Eure Diener mit Schildwall erhalten Segen. Zieht 1 Karte.',[E('grantAll',1,{key:'shield',only:'taunt'}),E('draw',1)])],
 // Zeitalterkarten: Griechenland und Hellenismus (Leonidas, Hypatia, Perikles, Epaminondas)
 ['griechen_0','common',M('Olympionike',4,3,3,'Sturmangriff. Segen.',{charge:true,shield:true})],
 ['griechen_1','common',M('Rhapsode',2,2,2,'Einmarsch: Ergründet eine Karte Eures Zeitalters.',{battle:[E('discover',1,{pool:'age'})]})],
 ['griechen_2','common',M('Marathonläufer',2,2,1,'Sturmangriff. Vermächtnis: Zieht 1 Karte.',{charge:true,death:[E('draw',1)]})],
 ['griechen_3','rare',S('Orakel von Delphi',3,'Ergründet zwei Karten Eures Helden.',E('discover',2,{pool:'hero'}))],
 ['griechen_4','rare',M('Leuchtturm von Pharos',3,0,5,'Bauwerk. Weisheit +1. Eure Zauber kosten 1 weniger.',{building:true,focus:1,spellDiscount:1})],
 ['griechen_5','rare',M('Akropolis',2,0,5,'Bauwerk. Eure Diener haben +1 Leben.',{building:true,buffAura:{health:1}})],
 ['griechen_6','epic',M('Bibliothek von Alexandria',3,0,5,'Bauwerk. Zu Beginn Eures Zuges: Ergründet einen Zauber.',{building:true,start:[E('discover',1,{pool:'spell'})]})],
 // Mittelalter im Reich (seit 1.14.0: Widukind, Hildegard, Wiprecht, Ulrich, Theophanu)
 ['mittelalter_0','common',M('Knappe',1,1,2,'Einmarsch: Gebt einem befreundeten Diener +1 Angriff.',{target:'friendlyMinion',battle:[E('buff',1)]})],
 ['mittelalter_1','common',M('Armbrustschütze',3,3,2,'Einmarsch: Verursacht 2 Schaden an einem Diener.',{target:'minion',battle:[E('damage',2)]})],
 ['mittelalter_2','common',M('Mönch von Cluny',3,2,4,'Einmarsch: Ergründet eine Karte Eures Zeitalters.',{battle:[E('discover',1,{pool:'age'})]})],
 ['mittelalter_3','common',M('Hansekogge',4,3,4,'Einmarsch: Zieht 2 Karten. Belastung 1.',{overload:1,battle:[E('draw',2)]})],
 ['mittelalter_4','rare',M('Turnierritter',4,3,3,'Vorstoß. Segen.',{rush:true,shield:true})],
 ['mittelalter_5','rare',M('Burgfried',2,0,6,'Bauwerk. Schildwall. Zu Beginn Eures Zuges: Erhaltet 2 Rüstung.',{building:true,taunt:true,start:[E('armor',2)]})],
 ['mittelalter_6','epic',M('Tribok',4,0,5,'Bauwerk. Am Ende Eures Zuges: Fügt einem zufälligen feindlichen Diener oder Bauwerk 3 Schaden zu.',{building:true,end:[E('randomDamage',3,{board:true})]})],
 // Frühe Neuzeit (Böttger, Nezahualcóyotl, Vauban) – seit 1.14.0 (AP L.2), vormals China, Korea, Japan; Wirkungen unverändert
 ['ostasien_0','common',M('Landsknecht',1,2,1,'Vorstoß.',{rush:true})],
 ['ostasien_1','common',M('Buchdrucker aus Mainz',3,2,4,'Einmarsch: Ergründet eine Karte Eures Zeitalters.',{battle:[E('discover',1,{pool:'age'})]})],
 ['ostasien_2','common',S('Leipziger Kaffeehaus',2,'Stellt bei Eurem Helden 4 Leben wieder her. Zieht 1 Karte.',[E('healHero',4),E('draw',1)])],
 ['ostasien_3','rare',S('Kartaunen-Salve',3,'Fügt fünfmal einem zufälligen Feind 1 Schaden zu.',E('randomDamage',1,{times:5}))],
 ['ostasien_4','rare',M('Kriegsgaleone',5,3,7,'Schildwall. Wann immer dieser Diener Schaden erleidet, fügt er einem zufälligen Feind 1 Schaden zu.',{taunt:true,onDamage:[E('randomDamage',1)]})],
 ['ostasien_5','epic',S('Stehendes Heer',5,'Ruft drei Musketiere (2/2, Schildwall).',E('summon',3,{token:'terracotta'}))],
 ['ostasien_6','epic',M('Sternschanze',2,0,7,'Bauwerk. Schildwall. Feindliche Diener können Euren Helden nicht in dem Zug angreifen, in dem sie erscheinen.',{building:true,taunt:true,wall:true})],
 // Neutrale Weltwunder (AP 5.5). Das Aquädukt aus den Beispielen gibt es schon: Aquädukt von Chapultepec (Nezahualcóyotl).
 ['neutral_47','rare',M('Kolosseum',3,0,6,'Bauwerk. Wann immer ein Diener stirbt, erhaltet 1 Rüstung.',{building:true,anyDeath:[E('armor',1)]})],
 ['neutral_48','rare',M('Hängende Gärten',2,0,5,'Bauwerk. Am Ende Eures Zuges: Heilt Eure Diener um 1. Heilung wirkt bei Euren Dienern doppelt.',{building:true,passive:'heal',healDouble:true})],
 ['neutral_49','epic',M('Pyramiden von Gizeh',4,0,7,'Bauwerk. Eure Vermächtnisse wirken zweimal.',{building:true,doubleDeath:true})]];
const ageIds=new Set(ages.map(a=>a.id));
for(const [id,rarity,c] of wave1){const hero=id.slice(0,id.lastIndexOf('_'));cards.push({...c,id,hero,...(ageIds.has(hero)?{age:hero}:{}),rarity,art:null,cell:0});}
// Welle 2 der neuen Helden (AP 5.10, 1.11.0): je 10 Karten wie bei Welle 1 (0–3 Basis und Startdeck). Neue Regeln:
// buffLeft (Diener ganz links), ifMinions, Ergründen aus dem eigenen Deck (pool 'deck'), Ziele in Starre (targetFrozen).
const heroes3={
epaminondas:[M('Thebanischer Plänkler',1,2,1,'Vermächtnis: Euer Diener ganz links erhält +1 Angriff.',{death:[E('buffLeft',1)]}),M('Böotischer Hoplit',2,2,3,'Einmarsch: Euer Diener ganz links erhält +1 Leben.',{battle:[E('buffLeft',0,{health:1})]}),S('Fünfzig Schilde tief',2,'Euer Diener ganz links erhält +2/+2.',E('buffLeft',2,{health:2})),M('Böotarch',3,2,3,'Einmarsch: Euer Diener ganz links erhält +1/+1.',{battle:[E('buffLeft',1,{health:1})]}),
 M('Kämpfer der Heiligen Schar',5,3,2,'Segen. Einmarsch: Ruft seinen Gefährten (3/3, Segen).',{shield:true,battle:[E('summon',1,{token:'companion'})]}),S('Schlacht bei Leuktra',4,'Verursacht 4 Schaden an einem Diener. Euer Diener ganz links erhält +1/+1.',[E('damage',4),E('buffLeft',1,{health:1})],'minion'),
 S('Befreiung Messeniens',5,'Ruft zwei freie Messenier (2/2). Euer Diener ganz links erhält +2/+2.',[E('summon',2,{token:'messenian'}),E('buffLeft',2,{health:2})]),M('Thebanischer Phalangit',4,3,5,'Schildwall. Wann immer dieser Diener Schaden erleidet, erhält Euer Diener ganz links +1 Angriff.',{taunt:true,onDamage:[E('buffLeft',1)]}),
 M('Megalopolis',3,0,5,'Bauwerk. Zu Beginn Eures Zuges: Euer Diener ganz links erhält +1/+1.',{building:true,start:[E('buffLeft',1,{health:1})]}),M('Pelopidas, Führer der Heiligen Schar',6,4,5,'Einmarsch: Euer Diener ganz links erhält Doppelschlag und Segen.',{battle:[E('buffLeft',0,{grant:['double','shield']})]})],
fabius:[M('Veles',1,1,2,'Einmarsch: Versetzt einen feindlichen Diener in Starre.',{target:'enemyMinion',battle:[E('freeze',1)]}),M('Triarier',2,2,3,'Schildwall. Einmarsch: Erhaltet 2 Rüstung.',{taunt:true,battle:[E('armor',2)]}),S('Hinhalten',2,'Versetzt zwei zufällige feindliche Diener in Starre. Zieht 1 Karte.',[E('freeze',1,{random:true}),E('freeze',1,{random:true}),E('draw',1)]),M('Konsul der Republik',4,3,5,'Einmarsch: Erhaltet 3 Rüstung.',{battle:[E('armor',3)]}),
 S('Verbrannte Erde',3,'Versetzt alle feindlichen Diener in Starre. Zieht 1 Karte. Erhaltet 2 Rüstung.',[E('freeze',1,{all:true}),E('draw',1),E('armor',2)]),M('Späher am Volturnus',2,2,2,'Tarnung. Vermächtnis: Versetzt einen zufälligen feindlichen Diener in Starre.',{stealth:true,death:[E('freeze',1,{random:true})]}),
 M('Minucius, der Reiteroberst',4,5,3,'Vorstoß.',{rush:true}),{...S('Rückeroberung von Tarent',6,'Übernehmt die Kontrolle über einen feindlichen Diener in Starre.',E('steal',1),'enemyMinion'),targetFrozen:true},
 M('Lager auf den Höhen',3,0,6,'Bauwerk. Schildwall. Am Ende Eures Zuges: Versetzt einen zufälligen feindlichen Diener in Starre.',{building:true,taunt:true,end:[E('freeze',1,{random:true})]}),M('Marcellus, Schwert Roms',6,6,5,'Einmarsch: Vernichtet einen feindlichen Diener in Starre.',{target:'enemyMinion',targetFrozen:true,battle:[E('destroy',1)]})],
mandukhai:[M('Botin der Cherusker',1,1,1,'Einmarsch: Ruft einen Stammeskrieger (1/2).',{battle:[E('summon',1,{token:'tribesman'})]}),M('Hüterin des Herdfeuers',2,1,2,'Eure anderen Diener haben +1 Leben.',{buffAura:{health:1}}),S('Ruf zum Thing',3,'Ruft zwei Stammeskrieger (1/2).',E('summon',2,{token:'tribesman'})),M('Krieger im Keil',3,3,3,'Einmarsch: Habt Ihr 4 oder mehr Diener, erhält er +2/+2.',{battle:[E('ifMinions',4,{then:[E('buffSelf',2,{health:2})],else:[]})]}),
 S('Varusschlacht',4,'Ruft einen Stammeskrieger (1/2). Gebt Euren Dienern +1/+1.',[E('summon',1,{token:'tribesman'}),E('buffAll',1,{health:1})]),M('Krieger der Sippe',3,2,2,'Einmarsch: Ruft einen Sippenbruder (2/1).',{battle:[E('summon',1,{token:'twin'})]}),
 M('Heiliger Hain',2,0,5,'Bauwerk. Eure Diener haben +1 Angriff.',{building:true,buffAura:{attack:1}}),{...S('Seitenwechsel',5,'Übernehmt die Kontrolle über einen feindlichen Diener mit höchstens 3 Angriff.',E('steal',1),'enemyMinion'),targetMax:3},
 M('Arminius, Fürst der Cherusker',4,2,2,'Einmarsch: Erhält +1/+1 für jeden anderen eigenen Diener.',{battle:[E('buffSelf',1,{health:1,per:'minion'})]}),S('Bund der Stämme',8,'Füllt Euer Feld mit Stammeskriegern (1/2). Gebt Euren Dienern +1/+1.',[E('summon',7,{token:'tribesman'}),E('buffAll',1,{health:1})])],
baibars:[M('Mamlukenrekrut',1,1,2,'Vorstoß.',{rush:true}),M('Barid-Kurier',2,2,1,'Vermächtnis: Zieht 1 Karte.',{death:[E('draw',1)]}),S('Ain Dschalut',3,'Verursacht 2 Schaden an einem Diener. Ruft einen Mamlukenreiter (2/1, Vorstoß).',[E('damage',2),E('summon',1,{token:'mamluk'})],'minion'),M('Bogenreiter der Bahriya',3,2,2,'Vorstoß. Einmarsch: Fügt einem zufälligen Feind 1 Schaden zu.',{rush:true,battle:[E('randomDamage',1)]}),
 M('Manjaniq-Meister',4,3,3,'Einmarsch: Fügt einem zufälligen feindlichen Diener oder Bauwerk 3 Schaden zu.',{battle:[E('randomDamage',3,{board:true})]}),S('Vorgetäuschte Flucht',1,'Schickt einen eigenen Diener auf Eure Hand zurück. Zieht 1 Karte.',[E('bounce',1),E('draw',1)],'friendlyMinion'),
 M('Qutuz, Sultan von Ägypten',5,3,3,'Vorstoß. Vermächtnis: Ruft zwei Mamlukenreiter (2/1, Vorstoß).',{rush:true,death:[E('summon',2,{token:'mamluk'})]}),S('Sturm auf Antiochia',2,'Gebt Euren Dienern +1 Angriff und Vorstoß.',[E('buffAll',1),E('grantAll',1,{key:'rush'})]),
 M('Zitadelle von Kairo',4,0,6,'Bauwerk. Zu Beginn Eures Zuges: Ruft einen Mamlukenreiter (2/1, Vorstoß).',{building:true,start:[E('summon',1,{token:'mamluk'})]}),M('Qalawun, Emir der Bahriya',6,4,5,'Vorstoß. Einmarsch: Eure anderen Diener mit Vorstoß erhalten +2/+2. Alle mit Vorstoß erhalten Segen.',{rush:true,battle:[E('buffAll',2,{health:2,only:'rush',excludeSelf:true}),E('grantAll',1,{key:'shield',only:'rush'})]})],
zizka:[M('Schanzarbeiter',2,2,1,'Vermächtnis: Ruft einen Schanzkorb (1/2, Schildwall).',{death:[E('summon',1,{token:'wagon'})]}),M('Grenadier',2,2,2,'Einmarsch: Verursacht 1 Schaden.',{target:'any',battle:[E('damage',1)]}),S('Salve von der Bastion',2,'Fügt für jeden Eurer Diener mit Schildwall einem zufälligen Feind 1 Schaden zu.',E('randomDamage',1,{per:'taunt'})),M('Ingenieur des Königs',3,2,4,'Schildwall. Einmarsch: Ruft einen Schanzkorb (1/2, Schildwall).',{taunt:true,battle:[E('summon',1,{token:'wagon'})]}),
 M('Festungsgeschütz',3,1,5,'Schildwall. Am Ende Eures Zuges: Fügt einem zufälligen Feind 1 Schaden zu.',{taunt:true,end:[E('randomDamage',1)]}),S('Faschinen',2,'Gebt Euren Dienern mit Schildwall +1/+1. Zieht 1 Karte.',[E('buffAll',1,{health:1,only:'taunt'}),E('draw',1)]),
 {...S('Minengang',3,'Vernichtet einen feindlichen Diener mit höchstens 3 Angriff.',E('destroy',1),'enemyMinion'),targetMax:3},M('Zitadelle von Lille',4,0,6,'Bauwerk. Schildwall. Eure Diener mit Schildwall haben +1/+1.',{building:true,taunt:true,buffAura:{attack:1,health:1,only:'taunt'}}),
 M('Louvois, Kriegsminister',6,3,5,'Einmarsch: Ruft zwei Schanzkörbe (1/2, Schildwall).',{battle:[E('summon',2,{token:'wagon'})]}),M('Ludwig XIV., der Sonnenkönig',5,3,5,'Vermächtnis: Ruft drei Füsiliere (2/3, Schildwall).',{death:[E('summon',3,{token:'taborite'})]})],
fuhao:[M('Speerwerfer vom Mont Lassois',1,1,2,'Einmarsch: Fügt dem feindlichen Helden 1 Schaden zu.',{battle:[E('face',1)]}),S('Prunkdolch',2,'Rüstet eine 2/2-Waffe aus.',E('weapon',2,{durability:2})),M('Reiter an der Seine',3,3,2,'Sturmangriff.',{charge:true}),M('Seherin',3,2,3,'Einmarsch: Seht die obersten drei Karten Eures Decks an und nehmt eine davon auf die Hand.',{battle:[E('discover',1,{pool:'deck'})]}),
 S('Aufgebot des Fürstensitzes',4,'Ruft zwei Krieger (2/2). Euer Held erhält in diesem Zug +2 Angriff.',[E('summon',2,{token:'warrior'}),E('heroAttack',2)]),S('Trankopfer',1,'Zieht 1 Karte. Euer Held erhält in diesem Zug +1 Angriff.',[E('draw',1),E('heroAttack',1)]),
 S('Gelage am Krater',1,'Seht zweimal die obersten drei Karten Eures Decks an und nehmt je eine davon auf die Hand.',E('discover',2,{pool:'deck'})),M('Schleuderer am Wall',4,3,4,'Einmarsch: Fügt dreimal einem zufälligen Feind 1 Schaden zu.',{battle:[E('randomDamage',1,{times:3})]}),
 M('Halle auf dem Mont Lassois',1,0,3,'Bauwerk. Zu Beginn Eures Zuges: Seht die obersten drei Karten Eures Decks an und nehmt eine davon auf die Hand.',{building:true,start:[E('discover',1,{pool:'deck'})]}),M('Gesandter aus Massalia',6,5,6,'Einmarsch: Seht zweimal die obersten drei Karten Eures Decks an und nehmt je eine davon auf die Hand. Sie kosten 2 weniger.',{battle:[E('discover',2,{pool:'deck',mod:-2})]})]
};
for(const [hero,list] of Object.entries(heroes3))list.forEach((c,i)=>cards.push({...c,id:hero+'_'+i,hero,rarity:['basic','basic','basic','basic','common','common','rare','rare','epic','legendary'][i],art:null,cell:0}));
// Zeitalterkarten der Welle 2 (AP 5.10): Rom und Germanien (Agrippa, Fabius, Vercingetorix, Thusnelda), Kreuzzüge (Dandolo,
// Anna, Baibars) und – seit 1.14.0 (AP L.2) neu benannt, Wirkungen unverändert – Frühzeit und Ägypten (Fürstin von Vix,
// Imhotep, Ahhotep; vormals Persien & Steppe).
const wave2=[
 ['rom_0','common',M('Gladiator',3,3,3,'Vorstoß. Wann immer dieser Diener Schaden erleidet, erhält er +1 Angriff.',{rush:true,onDamage:[E('buffSelf',1)]})],
 ['rom_1','common',M('Senator der Kurie',3,2,4,'Einmarsch: Ergründet eine Karte Eures Zeitalters.',{battle:[E('discover',1,{pool:'age'})]})],
 ['rom_2','common',M('Centurio',2,2,2,'Einmarsch: Gebt einem befreundeten Diener +1/+1.',{target:'friendlyMinion',battle:[E('buff',1,{health:1})]})],
 ['rom_3','rare',S('Triumphzug',3,'Gebt Euren Dienern +1 Angriff. Zieht 1 Karte.',[E('buffAll',1),E('draw',1)])],
 ['rom_4','rare',M('Via Appia',2,0,5,'Bauwerk. Zu Beginn Eures Zuges: Ein zufälliger eigener Diener erhält +1 Angriff.',{building:true,start:[E('buffRandom',1)]})],
 ['rom_5','rare',M('Vestalin am ewigen Feuer',3,2,4,'Am Ende Eures Zuges: Stellt bei Eurem Helden 2 Leben wieder her.',{end:[E('healHero',2)]})],
 ['rom_6','epic',S('Pax Romana',5,'Versetzt alle feindlichen Diener in Starre. Stellt bei allen eigenen Charakteren 3 Leben wieder her.',[E('freeze',1,{all:true}),E('healAll',3)])],
 ['steppe_0','common',M('Wagenbauer',2,1,2,'Einmarsch: Ruft einen Streitwagen (1/1, Sturmangriff).',{battle:[E('summon',1,{token:'chariot'})]})],
 ['steppe_1','common',M('Schreiber im Lebenshaus',3,2,4,'Einmarsch: Ergründet eine Karte Eures Zeitalters.',{battle:[E('discover',1,{pool:'age'})]})],
 ['steppe_2','common',S('Schuss vom Streitwagen',2,'Verursacht 2 Schaden. Stirbt dadurch ein Diener, zieht 1 Karte.',E('damage',2,{onKill:[E('draw',1)]}),'any')],
 ['steppe_3','rare',M('Wache der Medjai',4,3,3,'Vermächtnis: Ruft einen Medjai-Krieger (3/3).',{death:[E('summon',1,{token:'immortal'})]})],
 ['steppe_4','rare',S('Angriff der Streitwagen',3,'Fügt dreimal einem zufälligen Feind 1 Schaden zu. Ruft einen Streitwagen (1/1, Sturmangriff).',[E('randomDamage',1,{times:3}),E('summon',1,{token:'chariot'})])],
 ['steppe_5','rare',M('Bernsteinstraße',2,0,4,'Bauwerk. Zu Beginn Eures Zuges: Zieht 1 Karte. Euer Held erleidet 1 Schaden.',{building:true,start:[E('draw',1),E('selfDamage',1)]})],
 ['steppe_6','epic',M('Festung Buhen',3,0,5,'Bauwerk. Zu Beginn Eures Zuges: Ruft einen Medjai-Krieger (3/3).',{building:true,start:[E('summon',1,{token:'immortal'})]})],
 ['byzanz_0','common',M('Akrit der Grenzmark',2,2,3,'Schildwall.',{taunt:true})],
 ['byzanz_1','common',M('Gelehrter im Haus der Weisheit',3,2,4,'Einmarsch: Ergründet eine Karte Eures Zeitalters.',{battle:[E('discover',1,{pool:'age'})]})],
 ['byzanz_2','common',S('Tribut in Goldbyzantinern',2,'Euer Gegner hat im nächsten Zug 1 Mana weniger. Zieht 1 Karte.',[E('enemyOverload',1),E('draw',1)])],
 ['byzanz_3','rare',M('Arzt des Bimaristan',3,2,5,'Am Ende Eures Zuges: Stellt bei allen eigenen Charakteren 1 Leben wieder her.',{end:[E('healAll',1)]})],
 ['byzanz_4','rare',M('Theodosianische Mauern',2,0,6,'Bauwerk. Schildwall. Wann immer dieses Bauwerk Schaden erleidet, erhaltet 2 Rüstung.',{building:true,taunt:true,onDamage:[E('armor',2)]})],
 ['byzanz_5','epic',M('Hagia Sophia',3,0,7,'Bauwerk. Eure Diener haben +1 Leben. Am Ende Eures Zuges: Stellt bei Eurem Helden 2 Leben wieder her.',{building:true,buffAura:{health:1},end:[E('healHero',2)]})],
 ['byzanz_6','epic',M('Ibn an-Nafis, Arzt von Kairo',4,3,5,'Heilung wirkt bei Euren Dienern doppelt. Einmarsch: Stellt bei allen eigenen Charakteren 2 Leben wieder her.',{healDouble:true,battle:[E('healAll',2)]})]];
for(const [id,rarity,c] of wave2){const age=id.slice(0,id.lastIndexOf('_'));cards.push({...c,id,hero:age,age,rarity,art:null,cell:0});}
// Hinterhalte (AP 5.6, 1.25.0): Zauber, die verdeckt neben dem Helden liegen und im Zug des Gegners zuschnappen. ambush
// nennt den Auslöser (engine.js): attack – ein feindlicher Diener greift an, hero – er greift Euren Helden an, defend – er
// greift einen Eurer Diener an, minion – der Gegner spielt einen Diener aus, spell – er wirkt einen Zauber, death – einer
// Eurer Diener stirbt. Je eine Zeitalterkarte, zwei neutrale und vier Heldenkarten, alle mit Quelle (AELORE.cards);
// noch ohne Motiv (Platzhalter, AP 5.12). IDs nur hinten anhängen.
const H=(name,cost,trigger,text,effects)=>({...S(name,cost,'Hinterhalt: '+text,effects),ambush:trigger});
const ambushCards=[
 ['neutral_50','common',H('Krähenfüße',1,'attack','Wenn ein feindlicher Diener angreift, erleidet er 2 Schaden.',E('damage',2))],
 ['neutral_51','rare',H('Abgefangene Botschaft',2,'spell','Wenn der Gegner einen Zauber wirkt, erhaltet Ihr eine Kopie davon.',E('copySpell',1))],
 ['steppe_7','rare',H('Falsche Kundschafter von Kadesch',2,'minion','Wenn der Gegner einen Diener ausspielt, erleidet dieser 4 Schaden.',E('damage',4))],
 ['griechen_7','common',H('Botschaft des Sikinnos',1,'minion','Wenn der Gegner einen Diener ausspielt, erstarrt dieser. Zieht 1 Karte.',[E('freeze',1),E('draw',1)])],
 ['rom_7','rare',H('Wall am Kalkrieser Berg',3,'attack','Wenn ein feindlicher Diener angreift, erleiden alle feindlichen Diener 2 Schaden.',E('aoe',2))],
 ['mittelalter_7','common',H('Fallgatter',2,'hero','Wenn ein feindlicher Diener Euren Helden angreift, kehrt er auf die Hand seines Besitzers zurück.',E('bounce',1))],
 ['byzanz_7','rare',H('Engpass von Myriokephalon',3,'attack','Wenn ein feindlicher Diener angreift, erstarren alle feindlichen Diener.',E('freeze',1,{all:true}))],
 ['ostasien_7','rare',H('Gegenmine',3,'spell','Wenn der Gegner einen Zauber wirkt, wird er vereitelt.',E('counter',1))],
 ['khan_13','rare',H('Hinterhalt am Süntel',3,'hero','Wenn ein feindlicher Diener Euren Helden angreift, wird er vernichtet.',E('destroy',1))],
 ['fabius_10','rare',H('Rettung bei Gerunium',2,'defend','Wenn ein feindlicher Diener einen Eurer Diener angreift, fällt der Angriff aus und der Angreifer erstarrt.',[E('cancel',1),E('freeze',1)])],
 ['anna_12','rare',H('Täuschung bei Larissa',1,'hero','Wenn ein feindlicher Diener Euren Helden angreift, ruft Ihr einen Träger der Kaiserstandarte (2/2), der den Angriff abfängt.',E('decoy',1,{token:'standard'}))],
 ['leonidas_12','rare',H('Kampf um den Leichnam',2,'death','Wenn einer Eurer Diener stirbt, erhalten Eure übrigen Diener +1/+1.',E('buffAll',1,{health:1}))]];
for(const [id,rarity,c] of ambushCards){const owner=id.slice(0,id.lastIndexOf('_')),age=ages.some(a=>a.id===owner)?owner:null;cards.push({...c,id,hero:owner,...(age?{age}:{}),rarity,art:null,cell:0});}
// Erweiterung „Wunder der Welt“ Teil 1 (AP 5.7, 1.27.0, Entscheidung 22): je Held eine Karte aus seiner Lebenswelt und fünf
// neutrale – Weltwunder, ein Fund und zwei Hinterhalte. Nur vorhandene Regeln; jede Karte mit Quelle (AELORE.cards), noch
// ohne Motiv (Platzhalter, AP 5.12). Feld set:'wunder' kennzeichnet die Erweiterung. IDs nur hinten anhängen.
const wonders=[
 ['leonidas_13','common',M('Eiren der Agoge',2,2,2,'Einmarsch: Gebt einem befreundeten Diener +1 Leben und Schildwall.',{target:'friendlyMinion',battle:[E('buff',0,{health:1}),E('grant',1,{key:'taunt'})]})],
 ['hypatia_12','common',S('Astrolab für Synesios',1,'Seht die obersten drei Karten Eures Decks an und nehmt eine davon auf die Hand. Sie kostet 1 weniger.',E('discover',1,{pool:'deck',mod:-1}))],
 ['imhotep_13','common',M('Pilger im Asklepieion von Saqqara',3,2,4,'Einmarsch: Stellt bei allen eigenen Charakteren 2 Leben wieder her.',{battle:[E('healAll',2)]})],
 ['dandolo_13','rare',S('Eroberung von Zara',3,'Fügt einem zufälligen feindlichen Diener oder Bauwerk 3 Schaden zu. Zieht 1 Karte.',[E('randomDamage',3,{board:true}),E('draw',1)])],
 ['khan_14','rare',M('Irminsul',3,0,5,'Bauwerk. Eure Diener haben +1 Angriff. Vermächtnis: Gebt Euren Dienern +2 Angriff.',{building:true,buffAura:{attack:1},death:[E('buffAll',2)]})],
 ['boudicca_13','common',S('Stater des Vercingetorix',1,'Gebt einem befreundeten Diener +1/+1. Zieht 1 Karte.',[E('buff',1,{health:1}),E('draw',1)],'friendlyMinion')],
 ['nostradamus_13','rare',M('Manufaktur auf der Albrechtsburg',3,0,5,'Bauwerk. Am Ende Eures Zuges: Zieht 1 Karte.',{building:true,end:[E('draw',1)]})],
 ['jeanne_12','rare',M('Volmar, Schreiber Hildegards',3,2,3,'Einmarsch: Gebt einem befreundeten Diener Segen. Zieht 1 Karte.',{target:'friendlyMinion',battle:[E('shield',1),E('draw',1)]})],
 ['ragnar_14','epic',M('Kloster Pegau',4,0,5,'Bauwerk. Zu Beginn Eures Zuges: Ruft einen zufälligen Grenzstein, den Ihr noch nicht habt.',{building:true,start:[E('summonNew',1,{tokens:RUNES})]})],
 ['musashi_13','rare',M('Gefährte der Artusfahrt',4,3,4,'Segen. Einmarsch: Eure anderen Diener mit Segen erhalten +1/+1.',{shield:true,battle:[E('buffAll',1,{health:1,excludeSelf:true,only:'shield'})]})],
 ['perikles_12','rare',M('Aspasia von Milet',3,2,4,'Einmarsch: Ergründet einen Zauber.',{battle:[E('discover',1,{pool:'spell'})]})],
 ['agrippa_12','common',M('Aqua Virgo',2,0,5,'Bauwerk. Am Ende Eures Zuges: Stellt bei allen eigenen Charakteren 1 Leben wieder her.',{building:true,end:[E('healAll',1)]})],
 ['amanirenas_12','rare',S('Stele von Karnak',3,'Gebt Euren Dienern +1/+1. Stellt bei Eurem Helden 3 Leben wieder her.',[E('buffAll',1,{health:1}),E('healHero',3)])],
 ['anna_13','epic',M('Kloster Kecharitomene',3,0,5,'Bauwerk. Zu Beginn Eures Zuges: Ergründet eine Karte, die in dieser Partie schon gespielt wurde.',{building:true,start:[E('discover',1,{pool:'played'})]})],
 ['nezahualcoyotl_12','common',S('Gesänge des Dichterkönigs',2,'Stellt bei allen eigenen Charakteren 2 Leben wieder her. Zieht 1 Karte.',[E('healAll',2),E('draw',1)])],
 ['masako_12','common',S('Heiratsurkunde der Theophanu',2,'Gebt einem befreundeten Diener +1/+3 und Schildwall.',[E('buff',1,{health:3}),E('grant',1,{key:'taunt'})],'friendlyMinion')],
 ['epaminondas_10','rare',H('Scheinlager bei Mantineia',2,'attack','Wenn ein feindlicher Diener angreift, erhält Euer Diener ganz links +2/+2.',E('buffLeft',2,{health:2}))],
 ['fabius_11','common',M('Quintus Fabius, der Sohn',4,3,5,'Einmarsch: Versetzt einen feindlichen Diener in Starre. Erhaltet 2 Rüstung.',{target:'enemyMinion',battle:[E('freeze',1),E('armor',2)]})],
 ['mandukhai_10','common',M('Thumelicus',3,3,2,'Vorstoß. Vermächtnis: Ruft einen Stammeskrieger (1/2).',{rush:true,death:[E('summon',1,{token:'tribesman'})]})],
 ['baibars_10','rare',S('Brief an die Besatzung von Krak',4,'Schickt einen feindlichen Diener auf die Hand seines Besitzers zurück. Zieht 1 Karte.',[E('bounce',1),E('draw',1)],'enemyMinion')],
 ['zizka_10','epic',M('Neuf-Brisach',3,0,6,'Bauwerk. Schildwall. Zu Beginn Eures Zuges: Ruft einen Schanzkorb (1/2, Schildwall).',{building:true,taunt:true,start:[E('summon',1,{token:'wagon'})]})],
 ['fuhao_10','rare',S('Goldener Halsring von Vix',2,'Euer Held erhält in diesem Zug +2 Angriff. Erhaltet 2 Rüstung. Zieht 1 Karte.',[E('heroAttack',2),E('armor',2),E('draw',1)])],
 ['neutral_52','epic',M('Koloss von Rhodos',6,0,8,'Bauwerk. Schildwall. Vermächtnis: Fügt allen feindlichen Dienern 2 Schaden zu.',{building:true,taunt:true,death:[E('aoe',2)]})],
 ['neutral_53','epic',M('Zeus des Phidias',4,0,7,'Bauwerk. Eure Diener haben +1 Angriff. Am Ende Eures Zuges: Stellt bei Eurem Helden 2 Leben wieder her.',{building:true,buffAura:{attack:1},end:[E('healHero',2)]})],
 ['neutral_54','rare',S('Himmelsscheibe von Nebra',2,'Ergründet eine Karte. Sie kostet 1 weniger.',E('discover',1,{pool:'any',mod:-1}))],
 ['neutral_55','common',H('Gänse des Kapitols',1,'hero','Wenn ein feindlicher Diener Euren Helden angreift, erhaltet Ihr 4 Rüstung.',E('armor',4))],
 ['neutral_56','rare',H('Skytale',2,'spell','Wenn der Gegner einen Zauber wirkt, zieht Ihr 2 Karten.',E('draw',2))]];
for(const [id,rarity,c] of wonders)cards.push({...c,id,hero:id.slice(0,id.lastIndexOf('_')),set:'wunder',rarity,art:null,cell:0});
const tokens={recruit:M('Rekrut',1,1,1),novice:M('Novizin',1,1,1),warrior:M('Krieger',2,2,2),eagle:M('Habicht',1,2,1),stoneguard:M('Pyramidenwächter',3,2,5,'Schildwall.',{taunt:true}),totem_heal:M('Grenzstein des Klosters',1,0,2,'Am Ende Eures Zuges: Heilt Eure Diener um 1.',{passive:'heal'}),totem_fire:M('Grenzstein der Mark',1,0,2,'Am Ende Eures Zuges: Fügt dem feindlichen Helden 1 Schaden zu.',{passive:'fire'}),totem_guard:M('Grenzstein der Burg',1,0,2,'Schildwall.',{taunt:true}),totem_strength:M('Grenzstein des Dorfes',1,0,2,'Am Ende Eures Zuges: Ein anderer zufälliger Diener erhält +1 Angriff.',{passive:'strength'}),coin:S('Gunst der Stunde',0,'Erhaltet nur in diesem Zug 2 Mana.',E('mana',2)),
 hoplite:M('Hoplit',1,1,2,'Schildwall.',{taunt:true}),citizen:M('Bürger',1,1,2),pioneer:M('Pionier',1,1,3,'Eure Bauwerke kosten 1 weniger.',{buildingDiscount:1}),
 rider:M('Reiter',1,1,1,'Sturmangriff.',{charge:true}),chariot:M('Streitwagen',1,1,1,'Sturmangriff.',{charge:true}),terracotta:M('Musketier',2,2,2,'Schildwall.',{taunt:true}),
 tribesman:M('Stammeskrieger',1,1,2),wagon:M('Schanzkorb',1,1,2,'Schildwall.',{taunt:true}),taborite:M('Füsilier',2,2,3,'Schildwall.',{taunt:true}),
  mamluk:M('Mamlukenreiter',2,2,1,'Vorstoß.',{rush:true}),immortal:M('Medjai-Krieger',3,3,3),messenian:M('Freier Messenier',2,2,2),
  companion:M('Gefährte der Heiligen Schar',3,3,3,'Segen.',{shield:true}),twin:M('Sippenbruder',2,2,1),elephant:M('Kriegselefant',5,5,6,'Vorstoß.',{rush:true}),
  parthenos:M('Athena Parthenos',5,0,8,'Bauwerk. Eure Diener haben +1/+1.',{building:true,buffAura:{attack:1,health:1}}),
 pyramid:M('Stufenpyramide',4,0,8,'Bauwerk. Zu Beginn Eures Zuges erhält Euer schwächster Diener +2/+2.',{building:true,start:[E('buffWeakest',2,{health:2})]}),
 // AP L.5 (1.23.0): Hypatias Unterricht – ihre Hörer kamen von weit her (Sokrates Scholastikos VII 15). Ohne Weisheit
 // (bis 1.23.0 Arkaner Fokus): Ein Schüler je Zug stapelte sie, mit dem doppelten Sternenregen (seit 1.24.0 Sternkatalog des Hipparchos) im Startdeck gewann Hypatia zu oft (Balance-Lauf).
 student:M('Schüler der Hypatia',1,1,1),
 // AP 5.6 (1.25.0): Annas Täuschung bei Larissa – er trägt die Feldzeichen des Kaisers und fängt den Angriff ab.
 standard:M('Träger der Kaiserstandarte',1,2,2)};
const ART={hoplite:['leonidas',10],pyramid:['@pyramid',0],eagle:[null,0],stoneguard:['imhotep',10],citizen:[null,0],pioneer:[null,0],parthenos:[null,0],rider:[null,0],chariot:[null,0],terracotta:[null,0],
 tribesman:[null,0],wagon:[null,0],taborite:[null,0],mamluk:[null,0],immortal:[null,0],messenian:[null,0],companion:[null,0],twin:[null,0],elephant:[null,0],
 novice:[null,0],student:[null,0],standard:[null,0],totem_heal:[null,0],totem_fire:[null,0],totem_guard:[null,0],totem_strength:[null,0]};
for(const [id,c] of Object.entries(tokens)){c.id=id;c.hero='neutral';c.rarity='token';const [art,cell]=ART[id]||['jeanne',id==='coin'?11:10];c.art=art;c.cell=cell;}
// Gemalte Astra-Bilder (AP A.1): werkzeuge/astra_bilder.py schreibt model/bilder.js (Karte, Spielstein, Held → Atlas
// und Feld). Sie gehen alten Atlasfeldern und Platzhaltern vor; was Astra noch nicht geliefert hat, bleibt wie bisher.
const B=(()=>{if(typeof module==='undefined')return root.CHB||{};try{return require('./bilder.js');}catch(e){return {};}})();
for(const c of [...cards,...Object.values(tokens)]){const a=B.cards&&B.cards[c.id];if(a){c.art=a[0];c.cell=a[1];}}
for(const h of heroes){const a=B.heroes&&B.heroes[h.id];if(a){h.art=a[0];h.cell=a[1];}}
const byId=Object.fromEntries([...cards,...Object.values(tokens)].map(c=>[c.id,c]));
const missions=[
['Thermopylen','Xerxes’ Vorhut','leonidas','Die Pässe halten',28,'armor','Der Boss erhält zu Beginn seines Zuges 2 Rüstung.'],
['Die Bibliothek','Der Zensor','hypatia','Das Wissen bewahren',30,'draw','Der Boss zieht jeden dritten eigenen Zug eine zusätzliche Karte.'],
['Unter der Pyramide','Hüter der Grabkammer','imhotep','Die versiegelte Kammer',32,'heal','Der Boss heilt sich zu Beginn seines Zuges um 2.'],
['Nebel über Venedig','Der Maskendoge','dandolo','Der Preis des Handels',32,'weapon','Der Boss rüstet jeden dritten eigenen Zug eine 2/2-Waffe aus.'],
['Der Sachsenkrieg','Karl der Große','khan','Widerstand an der Weser',34,'arrow','Der Boss fügt Eurem Helden zu Beginn seines Zuges 1 Schaden zu.'],
['Alesia','Gaius Iulius Caesar','boudicca','Der doppelte Belagerungsring',34,'recruit','Der Boss ruft jeden zweiten eigenen Zug einen Rekruten (1/1).'],
['Gefangen auf dem Königstein','Statthalter Fürstenberg','nostradamus','Gold oder Porzellan',36,'storm','Giftige Dämpfe: Der Boss fügt Euren Dienern jeden dritten eigenen Zug 1 Schaden zu.'],
['Der Weg zum Rupertsberg','Abt Kuno vom Disibodenberg','jeanne','Ein eigenes Kloster',36,'shield','Der Boss verleiht seinem ersten Diener zu Beginn seines Zuges Segen.'],
['Streit um die Mark Meißen','Konrad von Wettin','ragnar','Groitzsch gegen Wettin',38,'totem','Der Boss ruft jeden dritten eigenen Zug einen Grenzstein der Mark.'],
['Der letzte Horizont','Der Hüter der Chronik','musashi','Die Geschichte gehört Euch',40,'final','Der Boss erhält zu Beginn seines Zuges 2 Rüstung und verstärkt einen Diener um +1/+1.'],
// Neue Chroniken (AP 5.10): je eine Mission für die neuen Helden; die Bossfähigkeit ist ein Datensatz (Effekte, jeder n-te Zug).
// Seit 1.14.0 (AP L.1) erzählen die Missionen der ersetzten Helden deren Geschichte; Bossfähigkeit und Belohnung bleiben.
['Die Langen Mauern','Archidamos von Sparta','perikles','Athen im Belagerungsring',38,'fortify','Der Boss stärkt zu Beginn seines Zuges sein schwächstes Bauwerk um 2 Haltbarkeit – ohne Bauwerk erhält er 2 Rüstung.',{effects:[E('fortify',2,{else:[E('armor',2)]})]}],
['Actium','Die Flotte des Antonius','agrippa','Die Seeschlacht um Rom',38,'ballista','Der Boss fügt jeden zweiten eigenen Zug einem zufälligen Feind 2 Schaden zu.',{every:2,effects:[E('randomDamage',2)]}],
['Gegen die Hyksos','Apophis von Auaris','amanirenas','Die Mutter des Befreiers',40,'venom','Der Boss gibt jeden dritten eigenen Zug einem zufälligen eigenen Diener Tödliches Gift.',{every:3,effects:[E('grantRandom',1,{key:'poison'})]}],
['Purpur und Pergament','Der Kaisersohn Johannes','anna','Die Erbin der Komnenen',40,'archive','Der Boss erhält jeden dritten eigenen Zug eine zufällige Karte, die schon gespielt wurde.',{every:3,effects:[E('discover',1,{pool:'played'})]}],
['Der Damm im See','Maxtla von Azcapotzalco','nezahualcoyotl','Der Dichterkönig kehrt heim',40,'bloom','Der Boss stellt zu Beginn seines Zuges bei allen eigenen Charakteren 1 Leben wieder her.',{effects:[E('healAll',1)]}],
['Das Kind auf dem Thron','Heinrich der Zänker','masako','Die Kaiserin übernimmt die Regentschaft',42,'oath','Der Boss gibt zu Beginn seines Zuges einem zufälligen eigenen Diener Schildwall.',{effects:[E('grantRandom',1,{key:'taunt'})]}],
// Welle 2 (1.11.0): einfach hinten angehängt (Entscheidung 14) – Mission 17 bis 22.
['Leuktra','Kleombrotos von Sparta','epaminondas','Die schiefe Schlachtordnung',40,'phalanx','Der Boss ruft jeden zweiten eigenen Zug einen Hopliten (1/2, Schildwall).',{every:2,effects:[E('summon',1,{token:'hoplite'})]}],
['Der Zauderer','Hannibal Barkas','fabius','Schild Roms',42,'elephants','Der Boss ruft jeden vierten eigenen Zug einen Kriegselefanten (5/6, Vorstoß).',{every:4,effects:[E('summon',1,{token:'elephant'})]}],
['Der Feldzug des Germanicus','Germanicus','mandukhai','Zwischen Vater und Gemahl',40,'oirats','Der Boss ruft jeden zweiten eigenen Zug einen Reiter (1/1, Sturmangriff).',{every:2,effects:[E('summon',1,{token:'rider'})]}],
['Ain Dschalut','Kitbuqa Noyan','baibars','An der Quelle des Goliath',42,'volley','Der Boss fügt jeden zweiten eigenen Zug zweimal einem zufälligen Feind 1 Schaden zu.',{every:2,effects:[E('randomDamage',1,{times:2})]}],
['Namur 1692','Menno van Coehoorn','zizka','Festungsbauer gegen Festungsbauer',42,'knights','Der Boss gibt zu Beginn seines Zuges einem zufälligen eigenen Diener Segen.',{effects:[E('grantRandom',1,{key:'shield'})]}],
['Der Fürstensitz am Mont Lassois','Der Fürst der Heuneburg','fuhao','Zinn, Wein und Bronze',44,'qiang','Der Boss ruft jeden dritten eigenen Zug einen Krieger (2/2).',{every:3,effects:[E('summon',1,{token:'warrior'})]}]
].map((m,i)=>({id:i,title:m[0],boss:m[1],hero:m[2],subtitle:m[3],health:m[4],ability:m[5],description:m[6],reward:100+i*15,...(m[7]||{})}));
// Schlüsselwörter (AP 5.4): Name auf der Karte und Erklärung für Hilfe und Großansicht. Die Engine-Felder bleiben
// (taunt, shield, battle, death, charge); Spielstände sind davon unberührt. AP L.6 (1.24.0): Göttliche Gunst heißt Segen
// (ein Ritual, das Menschen vollzogen), Arkaner Fokus heißt Weisheit; „Zauber“ bleibt und wird als Glaube der Zeit erklärt.
const keywords=[
 ['Schildwall','Gegner müssen zuerst Diener mit Schildwall angreifen. Zauber umgehen ihn.'],
 ['Segen','Fängt den nächsten Schaden ab, der den Diener treffen würde. Um Segen baten Menschen in jeder Epoche – mit Opfern vor der Schlacht, beim Schwertsegen, im Kloster.'],
 ['Einmarsch','Wirkt, wenn die Karte aus der Hand ausgespielt wird.'],
 ['Vermächtnis','Wirkt, wenn der Diener stirbt.'],
 ['Sturmangriff','Darf sofort angreifen – auch den Helden.'],
 ['Vorstoß','Darf sofort angreifen, im ersten Zug aber nur Diener.'],
 ['Starre','Der Diener verpasst seinen nächsten Angriff.'],
 ['Doppelschlag','Darf zweimal pro Zug angreifen.'],
 ['Weisheit','Eure Zauber verursachen so viel mehr Schaden.'],
 ['Zauber','Wirkt einmal, dann ist die Karte abgelegt. Das Wort erzählt vom Glauben der Zeit: Ägypter trugen Schutzamulette, Römer ritzten Flüche in Bleitafeln, im Mittelalter sprach man Zaubersprüche wie die Merseburger.'],
 ['Ergründen','Der Chronist breitet drei versiegelte Schriftrollen aus – eine Karte davon wählt Ihr auf die Hand.','Ergründ'],
 ['Plünderung','Schaden, den diese Karte verursacht, stellt ebenso viel Leben bei Eurem Helden wieder her.'],
 ['Tarnung','Kann weder angegriffen noch als Ziel gewählt werden, bis der Diener selbst angreift. Flächenschaden trifft ihn.'],
 ['Bannung','Entfernt alle Fähigkeiten, Segnungen und Auren eines Dieners; Angriff und Leben fallen auf den Kartenwert zurück.','Bann'],
 ['Tödliches Gift','Jeder Schaden, den dieser Diener einem anderen Diener zufügt, vernichtet ihn. Bauwerke sind davor sicher.'],
 ['Belastung','Im nächsten Zug habt Ihr so viel Mana weniger.'],
 ['Hinterhalt','Liegt verdeckt als versiegelte Rolle neben Eurem Helden – höchstens drei, keine doppelt – und schnappt im Zug des Gegners zu, sobald geschieht, was die Karte nennt. Der Gegner sieht nur die Rolle.'],
 ['Bauwerk','Belegt einen der 7 Plätze, greift nie an und hat Haltbarkeit statt Leben. Flächenschaden und Heilung wirken nicht.'],
 ['Gunst der Stunde','Bekommt, wer nicht beginnt: 0 Mana, +2 Mana in diesem Zug.']].map(([name,text,stem=name])=>({name,text,stem}));
// Schlüsselwörter, die ein Kartentext nennt – für die Erklärung unter der Großansicht.
const keywordsOf=text=>keywords.filter(k=>(text||'').includes(k.stem));
// Erklärungen zu einer Karte (AP L.6): ihre Schlüsselwörter, bei Zaubern auch das Wort „Zauber“ selbst.
const glossaryOf=c=>{const list=keywordsOf(c.text);return c.type==='spell'&&!list.some(k=>k.name==='Zauber')?[...list,keywords.find(k=>k.name==='Zauber')]:list;};
// Fehlendes Motiv (AP 5.12): kein Atlasfeld oder nur ein im Code gezeichnetes ('@…').
const missingArt=c=>!c.art||c.art[0]==='@';
// Karten, die ein Deck dieses Helden enthalten darf: eigene, neutrale und Zeitalterkarten seiner Epochengruppe (AP 5.10).
const heroById=Object.fromEntries(heroes.map(h=>[h.id,h]));
const playable=(c,hero)=>c.hero===hero||c.hero==='neutral'||!!c.age&&c.age===heroById[hero]?.age;
// Wem eine Karte gehört – Held, Zeitalter (Zeitalterkarten, AP 5.11) oder niemandem (neutral): Name, Epoche, Farbe, Zeichen.
const ageById=Object.fromEntries(ages.map(a=>[a.id,a]));
const owner=c=>heroById[c.hero]||ageById[c.hero]||null;
const eraOf=c=>owner(c)?.era||'Neutral';
// KI-Persönlichkeit je Held (AP 5.8 Teil 2): Feld ai am Helden, Gewichte in E.value.
const personalities={aggressive:{name:'Aggressiv',text:'sucht den Weg zum feindlichen Helden'},defensive:{name:'Defensiv',text:'hält das Feld und schützt den eigenen Helden'},
 combo:{name:'Kombinierend',text:'sammelt Karten und baut auf Dauerwirkungen'}};
const api={heroes,replaced,ages,ageById,heroById,playable,owner,eraOf,personalities,cards,byId,tokens,missions,keywords,keywordsOf,glossaryOf,missingArt,rarities:{basic:'Basis',common:'Gewöhnlich',rare:'Selten',epic:'Episch',legendary:'Legendär',token:'Beschworen'}};
if(typeof module!=='undefined')module.exports=api;else root.CHD=api;
})(typeof globalThis!=='undefined'?globalThis:this);
