/* Campaign view model: ten missions; each victory unlocks the next. */
(function(root){'use strict';
const node=typeof module!=='undefined';
const D=node?require('../model/data.js'):root.CHD;
const {Screen}=node?require('./base.js'):root.AEVM;

class Campaign extends Screen{
 get missions(){const done=this.profile.campaign;
  return D.missions.map(m=>({mission:m,done:done.includes(m.id),locked:m.id>0&&!done.includes(m.id-1)}));}
 mission(id){id=Number(id);const m=this.missions[id];if(!m||m.locked)return;Object.assign(this.session,{mission:id,mode:'campaign'});this.ui.go('setup');}
 quests(){this.ctx.dialogs.quests();}
}

const api={Campaign};
if(node)module.exports=api;else root.AEVM=Object.assign(root.AEVM||{},api);
})(typeof globalThis!=='undefined'?globalThis:this);
