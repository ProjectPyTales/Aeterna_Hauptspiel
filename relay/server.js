// Ein Prozess hält beide Plätze und genau einen Regelzustand je Einladung.
'use strict';
const {randomBytes, randomInt} = require('node:crypto');
const {WebSocketServer, WebSocket} = require('ws');
const game = '../quellcode/assets/game/model/';
const E = require(game + 'engine.js'), D = require(game + 'data.js');
const {version} = require(game + 'neu.js');
const P = require(game + 'profile.js');

function start({port = 8787, host = '127.0.0.1'} = {}) {
  const server = new WebSocketServer({port, host, maxPayload: 8192, perMessageDeflate: false});
  const rooms = new Map();
  const send = (ws, data) => { if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify(data)); };
  function publish(room) {
    const g = room.game, online = room.seats.map(p => !!p?.ws);
    room.seats.forEach((p, seat) => {
      if (!p) return;
      const data = {type:'state', code:room.code, seat, online, rev:room.rev,
        phase:g?.phase || 'waiting', active:g?.active, winner:g?.winner, turn:g?.turn};
      if (g) {
        data.players = g.players.map(a => ({
          hero:a.hero, health:a.health, armor:a.armor, mana:a.mana, maxMana:a.maxMana,
          hand:a.hand.length, deck:a.deck.length, board:a.board, weapon:a.weapon,
          ambush:E.ambushes(a).length
        }));
        data.hand = g.players[seat].hand.map(c => ({...c, cost:E.cost(g,seat,c)}));
        data.actions = E.legal(g,seat);
        data.choices = g.choice?.p === seat ? g.choice.options : [];
        data.kept = p.mull !== null;
      }
      send(p.ws,data);
    });
  }
  function retire(room) {
    rooms.delete(room.code);
    for (const p of room.seats) p?.ws?.close(4002,'Einladung abgelaufen');
  }
  const timer = setInterval(() => {
    const now = Date.now();
    for (const r of rooms.values()) if (now-r.seen > 2*60*60*1000) retire(r);
    for (const ws of server.clients) {
      if (!ws.alive) ws.terminate();
      else { ws.alive=false; ws.ping(); }
    }
  },30000);
  timer.unref();
  server.on('close',()=>clearInterval(timer));
  server.on('connection',ws=>{
    let room, seat;
    ws.alive=true;
    ws.on('pong',()=>{ws.alive=true;});
    ws.on('error',()=>ws.terminate());
    ws.on('close',()=>{
      if (room?.seats[seat]?.ws === ws) {room.seats[seat].ws=null;publish(room);}
    });
    ws.on('message',raw=>{
      try {
        const m=JSON.parse(raw);
        if (!room) {
          if (m.version!==version) return ws.close(4001,'Beide Seiten brauchen Aeterna '+version);
          let r=rooms.get(m.code), n;
          if (m.type==='resume') {
            n=r?.seats.findIndex(p=>p && p.key===m.key);
            if (n==null || n<0) return ws.close(4002,'Einladung abgelaufen oder Schlüssel ungültig');
          } else {
            const hero=m.hero, deck=m.deck;
            if (!Object.hasOwn(D.heroById,hero) || !Array.isArray(deck) || deck.length!==30)
              return ws.close(4004,'Ungültiges Deck');
            // Der Relay prüft die Spielregeln. Besitz und Sammlung bleiben auf dem Gerät.
            const owned=Object.fromEntries(D.cards.map(c=>[c.id,2]));
            if (deck.some(id=>typeof id!=='string'||!Object.hasOwn(D.byId,id)) ||
                P.validateDeck({collection:owned},hero,deck)) return ws.close(4004,'Ungültiges Deck');
            if (m.type==='create') {
              if (rooms.size>=512) return ws.close(4004,'Alle Räume sind belegt');
              let code;
              do {code=randomBytes(5).toString('hex').toUpperCase();} while(rooms.has(code));
              r={code,seats:[null,null],rev:0,seen:Date.now()};rooms.set(code,r);n=0;
            } else if (m.type==='join' && r && !r.seats[1]) n=1;
            else return ws.close(4004,'Einladung ungültig oder bereits besetzt');
            r.seats[n]={hero,deck,key:randomBytes(24).toString('hex'),mull:null};
            if (n===1) {
              const [a,b]=r.seats;
              r.game=E.create({hero:a.hero,foe:b.hero,deck:a.deck,enemyDeck:b.deck,
                first:randomInt(2),seed:randomInt(1,2**32),mode:'friends'});
              r.rev++;
            }
          }
          room=r;seat=n;const p=room.seats[seat];p.ws?.close(4003,'Platz auf anderem Client geöffnet');
          p.ws=ws;room.seen=Date.now();
          send(ws,{type:'seat',code:room.code,seat,key:p.key});publish(room);return;
        }
        const p=room.seats[seat],g=room.game;
        if (p.ws===ws && m.type==='leave') {
          if (!g) {retire(room);return;}
          if (g.phase!=='over') {g.phase='over';g.winner=1-seat;room.rev++;publish(room);}
          return;
        }
        if (p.ws!==ws || !g || !room.seats.every(s=>s?.ws)) return publish(room);
        if (m.type==='mull' && g.phase==='mulligan' && p.mull===null && Array.isArray(m.ids)
          && m.ids.length<=g.players[seat].hand.length && m.ids.every(id=>g.players[seat].hand.some(c=>c.uid===id))) {
          p.mull=m.ids;
          if (room.seats.every(s=>s.mull!==null)) E.mulligan(g,room.seats[0].mull,room.seats[1].mull);
        } else if (m.rev!==room.rev) return publish(room);
        else if (m.type==='act' && seat===g.active && Number.isInteger(m.index)) {
          const action=E.legal(g,seat)[m.index];if (!action) return publish(room);
          if (m.position!=null) action.position=m.position;
          if (!E.apply(g,action).ok) return publish(room);
        } else return publish(room);
        room.seen=Date.now();room.rev++;publish(room);
      } catch { ws.close(4004,'Ungültige Nachricht'); }
    });
  });
  return server;
}
module.exports={start};
if (require.main===module) start({port:Number(process.env.PORT||8787),host:process.env.HOST||'127.0.0.1'});
