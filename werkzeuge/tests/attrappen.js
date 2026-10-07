// Regellose Diener für Regeltests. Bis 1.12.0 dienten Wandernder Händler (2/3) und Grenzläuferin (3/4) dafür; seit
// AP 5.11 Teil 2 (1.13.0) haben beide eine eigene Regel. Die Attrappen stehen nur in D.byId (Seltenheit token): Sie sind
// in keinem Deck, Pool oder Kartenzähler.
const D=require('../../quellcode/assets/game/model/data.js');
for(const [id,attack,health] of [['attrappe_23',2,3],['attrappe_34',3,4]])
 D.byId[id]??={id,name:'Attrappe '+attack+'/'+health,cost:attack,attack,health,type:'minion',hero:'neutral',rarity:'token',text:'',art:null,cell:0};
module.exports={plain23:'attrappe_23',plain34:'attrappe_34'};
