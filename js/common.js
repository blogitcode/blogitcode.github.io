/* Dùng chung: tiện ích, tài khoản (localStorage), âm thanh, nhân vật Mầm, phần thưởng */
const $=id=>document.getElementById(id);
const R=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
const sample=(a,n)=>shuffle(a).slice(0,n);
const EMO=['🍎','⭐','🐟','🚗','🍓','🐥','🎈'];
const pick=()=>EMO[R(0,EMO.length-1)];
const nfc=s=>String(s).normalize('NFC').trim().toLowerCase();
function nums(ans,lo,hi){const s=new Set([ans]);let g=0;while(s.size<4&&g++<60){const n=ans+R(-3,3);if(n>=lo&&n<=hi)s.add(n)}return shuffle([...s])}
/* 4 đáp án gồm đáp án đúng và 3 đáp án nhiễu lấy từ danh sách pool */
const choices=(a,pool,n=4)=>shuffle([a,...sample([...new Set(pool)].filter(x=>x!==a),n-1)]);

/* ---------- Tài khoản (lưu trên thiết bị, offline) ---------- */
const KEY='toan-vui-v2';
let DB;try{DB=JSON.parse(localStorage.getItem(KEY))}catch(e){}
DB=DB||{users:{},cur:null};
const sv=()=>{try{localStorage.setItem(KEY,JSON.stringify(DB))}catch(e){}};
const U=()=>{const u=DB.users[DB.cur];if(u){u.stickers=u.stickers||[];u.days=u.days||[]}return u};
const AVS=['🐱','🐶','🐰','🐼','🦊','🐯','🐸','🦄'];
let av=AVS[0];
let rng=DB.rng||10;

/* ---------- Ngày học liên tiếp và sticker ---------- */
const dkey=(d=new Date())=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
function touchDay(u){const k=dkey();if(!u.days.includes(k)){u.days.push(k);u.days=u.days.slice(-120)}}
function streak(u){
  let n=0,d=new Date();
  if(!u.days.includes(dkey(d)))d.setDate(d.getDate()-1);
  while(u.days.includes(dkey(d))){n++;d.setDate(d.getDate()-1)}
  return n;
}
const STICKERS=['🦋','🐞','🐳','🦁','🐙','🦖','🚀','🌈','🍭','🎨','🎸','🏆','🦉','🐬','🍉','⛵','🎁','🪁','🐝','🌻','🦜','🐢','🍦','🛸'];
function giveSticker(u){
  const left=STICKERS.filter(s=>!u.stickers.includes(s));
  if(!left.length)return null;
  const s=left[R(0,left.length-1)];u.stickers.push(s);return s;
}

/* ---------- Âm thanh: true = đúng, false = sai, 'tick' = chạm ---------- */
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
function speak(text,lang='vi-VN'){try{
  speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=lang;u.rate=.85;speechSynthesis.speak(u);
}catch(e){}}

/* ---------- Nhân vật Mầm (SVG tự vẽ): happy, cheer, oops, think ---------- */
function mascot(mood='happy',cls=''){
  const mouth={happy:'<path d="M48 78q12 12 24 0" fill="none" stroke="#2b3a55" stroke-width="4" stroke-linecap="round"/>',
    cheer:'<path d="M46 76q14 22 28 0z" fill="#e5484d" stroke="#2b3a55" stroke-width="3" stroke-linejoin="round"/>',
    oops:'<path d="M50 86q10-9 20 0" fill="none" stroke="#2b3a55" stroke-width="4" stroke-linecap="round"/>',
    think:'<path d="M52 82h16" fill="none" stroke="#2b3a55" stroke-width="4" stroke-linecap="round"/>'}[mood]||'';
  const arms=mood==='cheer'?'<path d="M22 70q-14-18-8-32M98 70q14-18 8-32" fill="none" stroke="#3fa845" stroke-width="8" stroke-linecap="round"/>':'<path d="M22 78q-10 8-8 18M98 78q10 8 8 18" fill="none" stroke="#3fa845" stroke-width="8" stroke-linecap="round"/>';
  const brow=mood==='oops'?'<path d="M40 52l12 4M80 52l-12 4" stroke="#2b3a55" stroke-width="3.5" stroke-linecap="round"/>':'';
  const spark=mood==='cheer'?'<text x="6" y="30" font-size="20">✨</text><text x="92" y="26" font-size="20">✨</text>':'';
  return `<svg class="mascot ${cls}" viewBox="0 0 120 130" role="img" aria-label="Bạn Mầm">
  <ellipse cx="60" cy="124" rx="30" ry="5" fill="#0002"/>${arms}
  <path d="M60 30C60 14 70 6 86 8c0 16-10 26-26 22z" fill="#58c24a" stroke="#2e8f3a" stroke-width="3"/>
  <path d="M60 30C58 18 48 12 36 16c2 12 10 18 24 14z" fill="#7ed957" stroke="#2e8f3a" stroke-width="3"/>
  <circle cx="60" cy="74" r="44" fill="#9cec72" stroke="#3fa845" stroke-width="4"/>
  <ellipse cx="60" cy="86" rx="30" ry="26" fill="#c8f7a9" opacity=".7"/>
  <circle cx="44" cy="64" r="9" fill="#fff"/><circle cx="76" cy="64" r="9" fill="#fff"/>
  <circle cx="${mood==='think'?47:45}" cy="${mood==='think'?61:65}" r="5" fill="#2b3a55"/><circle cx="${mood==='think'?79:75}" cy="${mood==='think'?61:65}" r="5" fill="#2b3a55"/>
  <circle cx="46.5" cy="62.5" r="1.8" fill="#fff"/><circle cx="76.5" cy="62.5" r="1.8" fill="#fff"/>${brow}
  <circle cx="32" cy="80" r="6" fill="#ff9db1" opacity=".8"/><circle cx="88" cy="80" r="6" fill="#ff9db1" opacity=".8"/>${mouth}${spark}</svg>`;
}

/* ---------- Pháo giấy ---------- */
function confetti(n=26){
  const E=['🎉','⭐','✨','🎈','🌟','💛'];
  for(let i=0;i<n;i++){
    const s=document.createElement('span');s.className='cf';s.textContent=E[R(0,E.length-1)];
    s.style.left=R(2,96)+'vw';s.style.animationDelay=(R(0,60)/100)+'s';s.style.fontSize=R(20,36)+'px';
    document.body.appendChild(s);setTimeout(()=>s.remove(),2600);
  }
}
