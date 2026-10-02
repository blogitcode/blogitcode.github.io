/* Dùng chung: tiện ích, tài khoản (localStorage), âm thanh */
/* ---------- Tiện ích ---------- */
const $=id=>document.getElementById(id);
const R=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
const EMO=['🍎','⭐','🐟','🚗','🍓','🐥','🎈'];
const pick=()=>EMO[R(0,EMO.length-1)];
function nums(ans,lo,hi){const s=new Set([ans]);while(s.size<4){const n=ans+R(-3,3);if(n>=lo&&n<=hi)s.add(n)}return shuffle([...s])}

/* ---------- Tài khoản (lưu trên thiết bị, offline) ---------- */
const KEY='toan-vui-v2';
let DB;try{DB=JSON.parse(localStorage.getItem(KEY))}catch(e){}
DB=DB||{users:{},cur:null};
const sv=()=>{try{localStorage.setItem(KEY,JSON.stringify(DB))}catch(e){}};
const U=()=>DB.users[DB.cur];
const AVS=['🐱','🐶','🐰','🐼','🦊','🐯','🐸','🦄'];
let av=AVS[0];
let rng=DB.rng||10;

/* ---------- Âm thanh: true = đúng, false = sai/chọn đại, 'tick' = chạm ---------- */
let ac;
function beep(k){try{
  ac=ac||new(window.AudioContext||window.webkitAudioContext)();
  const t=ac.currentTime,N={ok:[[660,0],[880,.12]],no:[[392,0],[262,.15]],tick:[[520,0]]}[k===true?'ok':k===false?'no':k];
  N.forEach(([f,d])=>{
    const o=ac.createOscillator(),g=ac.createGain(),L=k==='tick'?.08:.28;
    o.type=k===false?'triangle':'sine';o.frequency.value=f;o.connect(g);g.connect(ac.destination);
    g.gain.setValueAtTime(.18,t+d);g.gain.exponentialRampToValueAtTime(.001,t+d+L);
    o.start(t+d);o.stop(t+d+L);
  });
}catch(e){}}

