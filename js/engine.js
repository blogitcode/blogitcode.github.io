/* Bộ máy bài học dùng chung cho mọi môn.
   Cần nạp trước: common.js, data_*.js (khai báo SUBJ, UNITS, gens, tuỳ chọn GAMES, ORD, PAIRS, HELLO). */
const GU=UNITS.slice();
if(typeof GAMES!=='undefined'&&GAMES.length)GU.push({id:'games',title:'Trò chơi',sub:'Chơi mà học',lessons:GAMES});
const ALL=GU.flatMap(u=>u.lessons);
const el=(t,c)=>{const e=document.createElement(t);if(c)e.className=c;return e};
const tk=t=>SUBJ+'-'+t.id+(t.range?'@'+rng:'');
const nm=t=>t.range&&t.k&&!t.game?t.name+' trong '+rng:t.name;
const makeQ=t=>gens[t.mix?t.mix[R(0,t.mix.length-1)]:t.k](t.m||rng,t);
let S={};
function show(id){['home','quiz','game','done'].forEach(x=>$(x).hidden=x!==id);window.scrollTo(0,0)}
function stop(){clearInterval(S.iv);clearTimeout(S.to);S.run=false}

/* ---------- Trang môn học: con đường các chặng ---------- */
function renderHome(){
  stop();
  const u=U();if(!u){location.href='index.html';return}
  const D=u.done||(u.done={});
  $('me').textContent=u.av+' '+u.name;
  let tot=0;Object.keys(D).forEach(k=>{if(k.startsWith(SUBJ+'-'))tot+=D[k].best});
  $('total').textContent='⭐ '+tot;
  $('hmas').innerHTML=mascot('happy','bob');
  $('hello').textContent=(typeof HELLO!=='undefined'?HELLO:'Chọn một bài để bắt đầu nhé!');
  $('units').innerHTML='';
  let nextDone=false,rbDone=false;
  const rangeBox=()=>{
    const w=el('div');w.innerHTML='<div class="lbl">Phạm vi cộng, trừ, so sánh: chọn số lớn nhất</div><div class="rng"></div>';
    for(let n=10;n<=100;n+=10){
      const c=el('button',n===rng?'on':'');c.textContent=n;
      c.onclick=()=>{rng=n;DB.rng=n;sv();beep('tick');const y=scrollY;renderHome();scrollTo(0,y)};
      w.lastChild.appendChild(c);
    }
    return w;
  };
  GU.forEach(un=>{
    const h=el('div','unit');h.innerHTML='<h2></h2><small></small>';
    h.firstChild.textContent=un.title;h.lastChild.textContent=un.sub||'';
    const p=el('div','path');
    un.lessons.forEach(l=>{
      const d=D[tk(l)];let c='node';
      if(d&&d.best)c+=' done';else if(!nextDone&&un.id!=='games'){c+=' next';nextDone=true}
      const b=el('button',c);
      b.innerHTML='<span class="dot"></span><span class="nm"><b></b><small></small><div class="stars"></div></span>';
      b.querySelector('.dot').textContent=l.icon;
      b.querySelector('b').textContent=nm(l);
      b.querySelector('small').textContent=l.desc||'';
      b.querySelector('.stars').textContent=d&&d.best?'⭐'.repeat(d.best)+(d.n>1?'  ('+d.n+' lần)':''):'';
      b.onclick=()=>{beep('tick');start(l)};
      p.appendChild(b);
    });
    $('units').append(h);
    if(!rbDone&&un.lessons.some(l=>l.range)){rbDone=true;$('units').append(rangeBox())}
    $('units').append(p);
  });
  show('home');
}

/* ---------- Bắt đầu một bài hoặc game ---------- */
function start(t){
  stop();
  S={t,i:0,score:0,run:true};
  if(t.game==='race'){
    S.race=1;S.pool=ALL.filter(l=>l.k&&!l.game&&!l.norace&&!l.slow);S.end=Date.now()+30000;
    S.iv=setInterval(tick,250);show('quiz');tick();ask();
  }else if(t.game){GAMEFN[t.game](t)}
  else{show('quiz');ask()}
}
function tick(){
  const l=Math.max(0,Math.ceil((S.end-Date.now())/1000));
  $('prog').textContent='⏱ '+l+'s, đúng '+S.score;
  $('fill').style.width=((30-l)/30*100)+'%';
  if(!l)finish();
}

/* ---------- Câu hỏi trắc nghiệm ---------- */
function ask(){
  const t=S.race?S.pool[R(0,S.pool.length-1)]:S.t,c=S.cur=makeQ(t);
  S.first=true;S.locked=false;
  if(!S.race){$('prog').textContent='Câu '+(S.i+1)+'/10';$('fill').style.width=(S.i*10)+'%'}
  $('q').textContent=c.q;
  if(c.html)$('vis').innerHTML=c.html;else $('vis').textContent=c.vis||'';
  $('pass').hidden=!c.pass;if(c.pass)$('pass').textContent=c.pass;
  S.say=c.say||c.pass||'';S.lang=c.lang||'vi-VN';
  $('say').hidden=!S.say;
  $('fb').className='fb';$('fb').innerHTML=mascot('think','s');
  $('next').hidden=true;$('opts').innerHTML='';
  c.opts.forEach(o=>{
    const b=el('button','opt'+(String(o).length>4?' long':''));b.textContent=o;
    b.onclick=()=>answer(b,o);$('opts').appendChild(b);
  });
}
function say(ok,txt){$('fb').className='fb '+(ok?'good':'bad');$('fb').innerHTML=mascot(ok?'cheer':'oops','s')+'<span>'+txt+'</span>'}
function answer(b,o){
  if(S.locked)return;
  if(o===S.cur.ans){
    S.locked=true;if(S.first)S.score++;
    b.classList.add('ok');say(true,'Giỏi quá!');beep(true);
    if(S.race){const me=S;S.to=setTimeout(()=>{if(S===me&&S.run)ask()},450)}
    else{$('next').textContent=S.i===9?'Xem kết quả':'Câu tiếp';$('next').hidden=false;$('next').focus()}
  }else{
    S.first=false;b.disabled=true;b.classList.add('no');say(false,'Chưa đúng, thử lại nhé!');beep(false);
  }
}
function finish(){
  const n=S.score,r=S.race;stop();
  end(n>=(r?10:9)?3:n>=6?2:1,n,r?'Trong 30 giây, con trả lời đúng '+n+' câu':'Đúng ngay lần đầu: '+n+'/10 câu');
}

/* ---------- Kết thúc: lưu sao, tặng sticker ---------- */
function end(stars,sc,txt){
  const u=U(),k=tk(S.t),d=u.done[k]||(u.done[k]={n:0,best:0,sc:0});
  const first3=stars===3&&d.best<3;
  d.n++;d.best=Math.max(d.best,stars);d.sc=Math.max(d.sc,sc);
  u.hist=u.hist||[];
  u.hist.unshift({t:nm(S.t),s:stars,d:new Date().toLocaleDateString('vi-VN')});
  u.hist.length=Math.min(u.hist.length,8);
  touchDay(u);
  const st=first3?giveSticker(u):null;
  sv();
  $('dmas').innerHTML=mascot(stars===3?'cheer':stars===2?'happy':'think','l bob');
  $('dstars').textContent='⭐'.repeat(stars);
  $('dmsg').textContent=stars===3?'Tuyệt vời!':stars===2?'Giỏi lắm!':'Cố lên, con làm được!';
  $('dscore').textContent=txt;
  $('dsticker').innerHTML='';
  if(st){const e=el('div','panel');e.innerHTML='Con được tặng sticker mới: <span style="font-size:44px"></span>';e.lastChild.textContent=st;$('dsticker').appendChild(e)}
  show('done');
  if(stars>=2)confetti(stars===3?36:18);
}

/* ---------- Bài ghép thứ tự: chạm lần lượt theo đúng thứ tự (ORD[k] trả về {q, order}) ---------- */
const GAMEFN={};
GAMEFN.order=function(t){S={t,r:0,err:0,run:true};show('game');orderRound()};
function orderRound(){
  const t=S.t,rounds=t.rounds||3,c=ORD[t.k](t.m||rng);
  S.order=c.order;S.n=0;
  $('ginfo').textContent='Vòng '+(S.r+1)+'/'+rounds;
  $('gq').textContent=c.q;
  $('gbody').innerHTML='<div class="slotline" id="slot"></div><div class="mgrid c3" id="tiles"></div>';
  shuffle(c.order.map((v,i)=>[v,i])).forEach(([v])=>{
    const b=el('button','tile w');b.textContent=v;
    b.onclick=()=>{
      if(b.classList.contains('hit'))return;
      if(v===S.order[S.n]){
        b.classList.add('hit');beep(true);
        const w=el('span','word');w.textContent=v;$('slot').appendChild(w);
        if(++S.n===S.order.length)S.to=setTimeout(()=>{++S.r===rounds?end(S.err<=1?3:S.err<=4?2:1,0,'Con chạm nhầm '+S.err+' lần'):orderRound()},600);
      }else{S.err++;beep(false);b.classList.add('no');setTimeout(()=>b.classList.remove('no'),300)}
    };
    $('tiles').appendChild(b);
  });
}

/* ---------- Lật thẻ ghép đôi (PAIRS(t) trả về 4 cặp [a,b]) ---------- */
GAMEFN.pairs=function(t){
  S={t,moves:0,pairs:0,open:null,lock:false,run:true};
  const cards=[];PAIRS(t).forEach(([a,b],i)=>cards.push({k:i,x:a},{k:i,x:b}));
  show('game');$('ginfo').textContent='Lượt: 0';$('gq').textContent='Lật hai thẻ ghép đúng đôi';
  $('gbody').innerHTML='<div class="mgrid" id="tiles"></div>';
  S.deck=shuffle(cards);S.deck.forEach(c=>{
    const b=el('button','tile');b.textContent='❓';
    b.onclick=()=>{
      if(S.lock||b.classList.contains('up'))return;
      b.classList.add('up');b.textContent=c.x;beep('tick');
      if(!S.open){S.open={b,c};return}
      const o=S.open;S.open=null;S.moves++;$('ginfo').textContent='Lượt: '+S.moves;
      if(o.c.k===c.k){
        o.b.classList.add('hit');b.classList.add('hit');beep(true);
        if(++S.pairs===cards.length/2)S.to=setTimeout(()=>end(S.moves<=6?3:S.moves<=9?2:1,0,'Con ghép xong sau '+S.moves+' lượt lật'),700);
      }else{S.lock=true;beep(false);S.to=setTimeout(()=>{[o.b,b].forEach(x=>{x.classList.remove('up');x.textContent='❓'});S.lock=false},750)}
    };
    $('tiles').appendChild(b);
  });
};

/* ---------- Bắn bóng bay: dùng câu hỏi của bài (mỗi bóng một đáp án) ---------- */
const COL=['#e5484d','#2f7be5','#2fa56b','#e08a00'];
GAMEFN.pop=function(t){S={t,i:0,score:0,run:true};show('game');popRound()};
function popRound(){
  if(!S.run)return;
  if(S.i===10){const n=S.score;stop();return end(n>=9?3:n>=6?2:1,n,'Con bắn trúng '+n+'/10 bóng')}
  const me=S,c=S.cur=makeQ(S.t),pos=shuffle([4,28,52,76]);S.done=false;
  $('ginfo').textContent='Bóng '+(S.i+1)+'/10, đúng '+S.score;
  $('gq').textContent=c.q+(c.vis?'  '+c.vis:'');
  $('gbody').innerHTML='<div class="sky" id="sky"></div>';
  const next=()=>{if(S===me&&S.run){S.i++;popRound()}};
  c.opts.slice(0,4).forEach((o,k)=>{
    const b=el('button','bl');b.textContent=o;
    b.style.cssText='left:'+pos[k]+'%;background:'+COL[k]+';animation-duration:'+R(55,80)/10+'s';
    b.onclick=()=>{
      if(S.done||b.disabled)return;
      if(o===c.ans){S.done=true;S.score++;beep(true);b.style.transform='scale(1.4)';b.style.opacity=0;S.to=setTimeout(next,500)}
      else{b.disabled=true;b.style.opacity=.3;beep(false)}
    };
    if(o===c.ans)b.onanimationend=()=>{if(S===me&&S.run&&!S.done){S.done=true;beep(false);next()}};
    $('sky').appendChild(b);
  });
}

/* ---------- Nhớ thứ tự (kiểu Simon) ---------- */
GAMEFN.simon=function(t){
  S={t,seq:[],pos:0,run:true,busy:true};const me=S;
  const E=[['🍎','#e5484d'],['🍋','#e0a800'],['🫐','#2f7be5'],['🍏','#2fa56b']];
  show('game');$('gq').textContent='Nhìn thật kỹ, rồi chạm lại đúng thứ tự';
  $('gbody').innerHTML='<div class="simon" id="sm"></div>';
  const bs=E.map((e,i)=>{const b=el('button');b.textContent=e[0];b.style.background=e[1];b.onclick=()=>hit(i);$('sm').appendChild(b);return b});
  const lit=(i,ms=450)=>new Promise(r=>{bs[i].classList.add('lit');beep('tick');S.to=setTimeout(()=>{bs[i].classList.remove('lit');S.to=setTimeout(r,180)},ms)});
  async function round(){
    S.busy=true;S.seq.push(R(0,3));S.pos=0;$('ginfo').textContent='Dãy '+S.seq.length+' hình';
    await new Promise(r=>S.to=setTimeout(r,700));
    for(const i of S.seq){if(S!==me||!S.run)return;await lit(i)}
    S.busy=false;
  }
  function hit(i){
    if(S.busy||!S.run)return;
    lit(i,200);
    if(i!==S.seq[S.pos]){S.run=false;beep(false);const n=S.seq.length-1;return end(n>=6?3:n>=4?2:1,n,n?'Con nhớ được dãy '+n+' hình':'Lần sau con sẽ làm được!')}
    if(++S.pos===S.seq.length){
      if(S.seq.length===8){S.run=false;return end(3,8,'Con nhớ được cả dãy 8 hình!')}
      beep(true);S.busy=true;S.to=setTimeout(round,500);
    }
  }
  round();
};

/* ---------- Tìm hình khác trong lưới (cần OUT: các cặp hình gần giống nhau) ---------- */
GAMEFN.find=function(t){S={t,r:0,err:0,run:true};show('game');findRound()};
function findRound(){
  if(S.r===8)return end(S.err<=2?3:S.err<=5?2:1,0,'Con chạm nhầm '+S.err+' lần');
  const [b,o]=OUT[R(0,OUT.length-1)],at=R(0,11);
  $('ginfo').textContent='Lần '+(S.r+1)+'/8';$('gq').textContent='Chạm vào hình khác với các hình còn lại';
  $('gbody').innerHTML='<div class="mgrid" id="tiles"></div>';
  for(let i=0;i<12;i++){
    const x=el('button','tile w');x.textContent=i===at?o:b;x.style.fontSize='38px';
    x.onclick=()=>{
      if(!S.run)return;
      if(i===at){x.classList.add('hit');beep(true);S.r++;S.run=false;S.to=setTimeout(()=>{S.run=true;findRound()},600)}
      else{S.err++;beep(false);x.classList.add('no');setTimeout(()=>x.classList.remove('no'),300)}
    };
    $('tiles').appendChild(x);
  }
}

/* ---------- Gắn nút ---------- */
$('next').onclick=()=>{S.i++;S.i===10?finish():ask()};
['exit','gexit','home2'].forEach(i=>{const e=$(i);if(e)e.onclick=renderHome});
$('again').onclick=()=>start(S.t);
$('say').onclick=()=>speak(S.say,S.lang);
renderHome();
