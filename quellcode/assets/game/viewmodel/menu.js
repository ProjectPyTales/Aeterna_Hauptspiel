/* Main-menu view model: what the painted hall shows and what its plates, rails and knob do.
 * The fourth plate resumes a running game, otherwise it offers the daily duel. */
(function(root){'use strict';
const node=typeof module!=='undefined';
const D=node?require('../model/data.js'):root.CHD,P=node?require('../model/profile.js'):root.CHP;
const {Screen}=node?require('./base.js'):root.AEVM;
const name=id=>D.heroes.find(h=>h.id===id).name;

class Menu extends Screen{
 constructor(ctx,version){super(ctx,{pressed:null,lit:null,knob:0,intro:false});this.version=version;}
 get view(){const p=this.profile,playing=p.game&&p.game.phase!=='over',day=P.daily();
  return {gold:p.gold,packs:p.packs,version:this.version,intro:this.state.intro,pressed:this.state.pressed,lit:this.state.lit,knob:this.state.knob,
   quests:P.quests.filter(q=>!p.claimed.includes(q.id)&&p.stats[q.stat]>=q.goal).length,
   plates:[{go:'free',title:'Schlacht',sub:'Freies Duell gegen die KI'},{go:'campaign',title:'Kampagne',sub:'Zehn historische Missionen'},
    {go:'random',title:'Kolosseum',sub:'Zufällige Helden & Decks'},
    playing?{go:'resume',title:'Partie fortsetzen',sub:'Deine gespeicherte Partie',gold:true}:{go:'daily',title:'Herausforderung',sub:`Tagesduell: ${name(day.hero)} gegen ${name(day.foe)}`}]};}
 enter(intro=false){this.state.intro=intro;this.state.pressed=null;}
 introDone(){this.state.intro=false;}
 // Pressure plate: it sinks (medallion presses in, rail lights up, knob turns) with a dull knock, then the ring takes over.
 press(target){
  if(this.state.pressed||this.ui.busy())return;
  this.set({pressed:target,lit:target,knob:this.state.knob+(target==='settings'?60:0)});
  this.ui.unlockAudio();this.ui.play('stone');this.ui.haptic(0);
  setTimeout(()=>{if(this.state.lit===target)this.set({lit:null});},450);
  setTimeout(()=>{this.set({pressed:null});this.go(target);},100);
 }
 go(target){const ui=this.ui;
  ({free:()=>this.setup('free'),random:()=>this.setup('random'),daily:()=>this.setup('daily'),campaign:()=>ui.go('campaign'),
    collection:()=>ui.go('collection'),packs:()=>ui.go('packs','packs'),bazaar:()=>ui.go('packs','backs'),
    quests:()=>this.ctx.dialogs.quests(),settings:()=>this.ctx.dialogs.settings(),resume:()=>ui.go('game')})[target]?.();
 }
 setup(mode){this.session.mode=mode;this.ui.go('setup');}
 back(){this.ui.exit();}
}

const api={Menu};
if(node)module.exports=api;else root.AEVM=Object.assign(root.AEVM||{},api);
})(typeof globalThis!=='undefined'?globalThis:this);
