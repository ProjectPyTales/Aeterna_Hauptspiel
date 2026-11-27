// AP 0.2: Pegel der Geräusche. Gemessen wurde je Datei das lauteste 100-ms-Fenster (RMS, dBFS, Mittel der Varianten);
// wirksam ist Messwert + Pegel in audio.js + Verstärkung des Aufrufs. Neu messen: siehe README, AP 0.2.
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path');
global.window=global.window||{};require(path.join(__dirname,'../../quellcode/assets/game/service/audio.js'));
const {levels}=window.CHA,measured={stone:-13.8,scrape:-15.3,grind:-14.2,slam:-13,click:-27.5,draw:-21.7,land:-22.6,hit:-12.1,clash:-14.4};
const db=(group,gain=1)=>measured[group]+20*Math.log10(levels[group]*gain);

test('Steingeräusche: Tippen leiser als Kampf, Einrasten als Akzent des Übergangs',()=>{
 assert.ok(Math.abs(db('stone')+24)<1,'Menü-Tipp ≈ −24 dB');
 assert.ok(db('stone')<=db('hit')-8,'ein Tipp ist deutlich leiser als ein Treffer');
 assert.ok(Math.abs(db('scrape',.9)-db('grind'))<2,'Schleifen und Mahlen gleich laut');
 const accent=db('slam')-Math.max(db('scrape',.9),db('grind'));assert.ok(accent>=3&&accent<=6,'Einrasten 3–6 dB darüber');
 assert.ok(Math.abs(db('click')-db('stone'))<5,'Klick und Stein-Tipp in derselben Liga');
 for(const g of Object.keys(levels))assert.ok(levels[g]>0&&levels[g]<=1.2,g);
});

test('Deutsche Stimmen decken Helden, Legendäre und Chronisten ab und liegen als Offline-Ogg vor',()=>{
 const fs=require('node:fs'),path=require('node:path'),root=path.resolve(__dirname,'../../quellcode/assets/game');
 const D=require(path.join(root,'model/data.js')),lines=require(path.join(root,'assets/audio/stimmen.json'));
 const ids=['anfang','monument','ende'];
 for(const h of D.heroes)for(const cue of ['gruss','vorteil','gefahr','chronik'])ids.push(h.id+'-'+cue);
 for(const c of D.cards.filter(c=>c.rarity==='legendary'))for(const cue of ['auftritt','angriff','abschied'])ids.push(c.id+'-'+cue);
 assert.deepEqual(Object.keys(lines).sort(),ids.sort());
 for(const id of ids){assert.ok(lines[id].length>=6,id);
  const data=fs.readFileSync(path.join(root,'assets/audio/stimmen',id+'.ogg'));
  assert.equal(data.toString('ascii',0,4),'OggS',id);assert.ok(data.includes(Buffer.from('vorbis')),id);}
});
