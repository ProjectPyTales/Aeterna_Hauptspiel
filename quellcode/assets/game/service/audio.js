/* Recorded foley: nonrepeating variants, headroom, music ducking and bounded voices.
 * Music (1.13.0): two recorded pieces, streamed through <audio> elements into the music gain (with ducking) –
 * musik-menue.ogg for the hall and every sub-menu, musik-duell.ogg in the match. Decoded as buffers, three minutes
 * of stereo would take about 64 MB each. Originals in ungenutzte_assets/musik-original/, levelled to −20 LUFS.
 * Levels per group (AP 0.2): measured as the loudest 100 ms of each file (RMS, dBFS) and set so that, with the gain of
 * the calls, a menu tap (stone) lands near −24 dB, the slab transition at −24 (scrape) / −23 (grind) with the lock-in
 * (slam) as accent at −19, and taps no longer match combat hits (−14). Table and values: README, AP 0.2. */
window.CHA={levels:{pickup:.65,slide:.55,return:.55,draw:.65,land:.85,hit:.8,clash:.68,swing:.58,gong:.55,click:1,channel:.25,heal:.45,power:.5,destroy:.65,fire:.66,pack:.7,stone:.31,scrape:.42,grind:.36,slam:.5,aether:.32,parchment:.58,thud:.5,hooves:.95,lance:.8,chime:.22,coins:.7,seal:.75,page:.5,clink:.75,chains:.9,poison:.5,toss:.58,horn:.6},ctx:null,buffers:{},groups:{},loops:{},voices:[],last:{},lastVariant:{},history:[],mode:'menu',settings:{music:.3,sfx:.7},
 async init(){if(this.loading){await this.loading;if(this.ctx.state==='suspended')await this.ctx.resume();return;}this.ctx=new(window.AudioContext||window.webkitAudioContext)();this.music=this.ctx.createGain();this.duck=this.ctx.createGain();this.fx=this.ctx.createGain();this.master=this.ctx.createDynamicsCompressor();this.master.threshold.value=-12;this.master.knee.value=12;this.master.ratio.value=3;this.master.attack.value=.004;this.master.release.value=.16;this.music.connect(this.duck);this.duck.connect(this.master);this.fx.connect(this.master);this.master.connect(this.ctx.destination);this.set(this.settings);
 this.loading=(async()=>{this.groups=await fetch('assets/audio/manifest.json').then(r=>r.json());const names=[...new Set(Object.values(this.groups).flat())];await Promise.all(names.map(async n=>{try{const res=await fetch('assets/audio/'+n+'.ogg');if(!res.ok)throw Error(res.status);this.buffers[n]=await this.ctx.decodeAudioData(await res.arrayBuffer());}catch(e){console.warn('Audio',n,e);}}));this.current=null;this.track(this.mode);})();if(this.ctx.state==='suspended')await this.ctx.resume();await this.loading;},
 set(s){this.settings=s;if(this.ctx){this.music.gain.setTargetAtTime(s.music*.34,this.ctx.currentTime,.08);this.fx.gain.setTargetAtTime(s.sfx*.7,this.ctx.currentTime,.02);}},
 play(group,options={}){if(!this.ctx||this.settings.sfx<=0)return;const available=(this.groups[group]||[]).filter(n=>this.buffers[n]);if(!available.length)return;const now=this.ctx.currentTime;if(now-(this.last[group]??-99)<.055)return;this.last[group]=now;let pool=available.filter(n=>n!==this.lastVariant[group]);if(!pool.length)pool=available;const name=pool[Math.floor(Math.random()*pool.length)];this.lastVariant[group]=name;
 while(this.voices.length>=10){const old=this.voices.shift();try{old.stop();}catch{}}const node=this.ctx.createBufferSource(),gain=this.ctx.createGain(),pan=this.ctx.createStereoPanner();node.buffer=this.buffers[name];node.playbackRate.value=['victory','defeat','gong','heal','power'].includes(group)?1:.975+Math.random()*.05;
 const levels=this.levels;gain.gain.value=(levels[group]??.7)*(options.gain??1);pan.pan.value=Math.max(-.3,Math.min(.3,((options.x??800)-800)/800*.3));node.connect(gain);gain.connect(pan);pan.connect(this.fx);this.voices.push(node);node.onended=()=>{this.voices=this.voices.filter(n=>n!==node);node.disconnect();gain.disconnect();pan.disconnect();};node.start(now+(options.delay||0));if(['clash','fire','land','gong','victory','defeat'].includes(group)){this.duck.gain.cancelScheduledValues(now);this.duck.gain.setTargetAtTime(.6,now,.025);this.duck.gain.setTargetAtTime(1,now+.18,.22);}this.history.push({group,name,at:performance.now()});if(this.history.length>60)this.history.shift();},
 // One looping piece per mode, crossfaded; the element of the other mode pauses once it has faded out. A mode without a
 // piece (the start intro, 1.26.0, view/intro.js) only fades the music out – it gets no entry in loops.
 pieces:{menu:'musik-menue',battle:'musik-duell'},
 track(mode){this.mode=mode;if(!this.ctx||this.current===mode)return;const now=this.ctx.currentTime;
  for(const [m,entry] of Object.entries(this.loops)){if(m===mode)continue;entry.gain.gain.setTargetAtTime(0,now,.3);clearTimeout(entry.stop);entry.stop=setTimeout(()=>{if(this.current!==m)entry.el.pause();},1700);}
  this.current=mode;const entry=this.loops[mode]||this.stream(mode);if(!entry)return;this.loops[mode]=entry;clearTimeout(entry.stop);
  if(entry.el.paused){entry.el.currentTime=0;entry.el.play().catch(e=>console.warn('Musik',e));}entry.gain.gain.setTargetAtTime(1,now+.015,.45);},
 stream(mode){const name=this.pieces[mode];if(!name||typeof Audio==='undefined')return null;const el=new Audio('assets/audio/'+name+'.ogg');el.loop=true;el.preload='auto';
  const gain=this.ctx.createGain();gain.gain.value=0;this.ctx.createMediaElementSource(el).connect(gain);gain.connect(this.music);return {el,gain};},
 // Formerly the tension layer of the procedural battle music; the recorded piece carries its own build-up.
 intensity(){},
 pause(){if(this.ctx)this.ctx.suspend();for(const e of Object.values(this.loops))e.el.pause();},
 resume(){if(this.ctx)this.ctx.resume().catch(()=>{});const e=this.loops[this.current];if(e&&this.settings.music>0)e.el.play().catch(()=>{});}
};
