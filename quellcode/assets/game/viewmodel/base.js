/* View-model basics shared by every screen and dialog. No DOM: these classes also run in Node.
 *
 * Every view model gets one context object:
 *   ctx.store   – model/store.js: the profile and commit() (save + notify)
 *   ctx.session – choices shared between screens: mode, hero, foe, deckId, mission
 *   ctx.ui      – what a view model may ask of the shell:
 *                 go(screen, opts), screen(), toast(text), dialog(kind, vm), close(), dialogOpen(),
 *                 play(sound, opts), haptic(kind), hidden(), exportSave(text), pickImport(), exit()
 * The shell (app.js) provides ui; the tests pass a recording fake. */
(function(root){'use strict';
const node=typeof module!=='undefined';
const {ViewModel}=node?require('../core/mvvm.js'):root.AEM;

class Screen extends ViewModel{
 constructor(ctx,state={}){super(state);this.ctx=ctx;ctx.store.subscribe(()=>this.notify());}
 get profile(){return this.ctx.store.profile;}
 get session(){return this.ctx.session;}
 get ui(){return this.ctx.ui;}
 commit(){this.ctx.store.commit();}
 wallet(){const p=this.profile;return {gold:p.gold,dust:p.dust,packs:p.packs};}
 // Shell hooks: enter() before the screen is shown; canLeave(next) may keep it (and ask first).
 enter(){}
 canLeave(){return true;}
 back(){this.ui.go('menu');}
}

// Message or question in the shared modal. buttons: [{label, style, run, keep}]; run() follows the close,
// keep:true leaves the dialog up (e.g. while the screen changes underneath).
// spec.close:false hides the × (the back key still closes, as before).
class Dialog extends ViewModel{
 constructor(ctx,spec){super({close:true,...spec});this.ctx=ctx;}
 choose(i){const b=this.state.buttons?.[+i];if(!b?.keep)this.ctx.ui.close();b?.run?.();}
 close(){this.ctx.ui.close();}
}
// A dialog that shows live profile data (quests, settings …) re-renders whenever the profile changes.
class LiveDialog extends ViewModel{
 constructor(ctx,state={}){super(state);this.ctx=ctx;this.off=ctx.store.subscribe(()=>this.notify());}
 get profile(){return this.ctx.store.profile;}
 close(){this.ctx.ui.close();}
 closed(){this.off();}
}

const api={Screen,Dialog,LiveDialog};
if(node)module.exports=api;else root.AEVM=Object.assign(root.AEVM||{},api);
})(typeof globalThis!=='undefined'?globalThis:this);
