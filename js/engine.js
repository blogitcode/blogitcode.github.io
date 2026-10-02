/* Bộ máy bài học dùng chung cho mọi môn (cần common.js và data_*.js nạp trước) */
/* ---------- Màn hình ---------- */
let grade=1,S={};
function show(id){['home','quiz','done','match','sort','pop'].forEach(x=>{const e=$(x);if(e)e.hidden=x!==id});window.scrollTo(0,0)}
function stop(){clearInterval(S.iv);S.run=false}
const tk=t=>SUBJ+'-'+t.id+(t.range?rng:'');
const nm=t=>t.range?t.name+(GAMES.includes(t)?' đến ':' trong ')+rng:t.name;
const pickT=()=>{const a=LEVELS[grade].topics;return a[R(0,a.length-1)]};

function renderHome(){
  stop();
  if(!U()){location.href='index.html';return}
  const u=U(),D=u.done;
  $('me').textContent=u.av+' '+u.name;
  $('total').textContent='⭐ '+Object.values(D).reduce((a,d)=>a+d.best,0);
  $('rng').innerHTML='';
  for(let n=10;n<=100;n+=10){
    const c=document.createElement('button');c.className='chip'+(n===rng?' on':'');c.textContent=n;
    c.onclick=()=>{rng=n;DB.rng=n;sv();beep('tick');const y=scrollY;renderHome();scrollTo(0,y)};
    $('rng').appendChild(c);
  }
  const row=(t,box)=>{
    const b=document.createElement('button'),d=D[tk(t)];
    b.className='topic';
    b.innerHTML='<span class="ic"></span><span><b></b><small></small></span><span class="st"></span>';
    b.children[0].textContent=t.icon;
    b.querySelector('b').textContent=nm(t);
    b.querySelector('small').textContent=d?'Đã chơi '+d.n+' lần'+(d.sc?', cao nhất '+d.sc:''):t.desc;
    b.querySelector('.st').textContent=d?'⭐'.repeat(d.best):'';
    b.onclick=()=>start(t);
    $(box).appendChild(b);
  };
  $('topics').innerHTML='';$('games').innerHTML='';
  LEVELS[grade].topics.forEach(t=>row(t,'topics'));
  GAMES.forEach(t=>row(t,'games'));
  $('hist').innerHTML='';
  if(!u.hist.length)$('hist').innerHTML='<li>Chưa có bài nào. Chọn một bài để bắt đầu!</li>';
  u.hist.forEach(h=>{const li=document.createElement('li');li.textContent=h.d+': '+h.t+' '+'⭐'.repeat(h.s);$('hist').appendChild(li)});
  show('home');
}

function start(t){
  stop();
  if(t.match)return startMatch(t);if(t.sort)return startSort(t);if(t.pop)return startPop(t);
  S={t,i:0,score:0,run:true};show('quiz');
  if(t.race){S.race=1;S.end=Date.now()+30000;S.iv=setInterval(tick,250);tick()}
  ask();
}
function tick(){
  const l=Math.max(0,Math.ceil((S.end-Date.now())/1000));
  $('prog').textContent='⏱ '+l+'s, đúng '+S.score;
  $('fill').style.width=((30-l)/30*100)+'%';
  if(!l)finish();
}

function ask(){
  const t=S.race?pickT():S.t,c=S.cur=gens[t.k](t.range?rng:t.m);
  S.first=true;S.locked=false;
  if(!S.race){$('prog').textContent='Câu '+(S.i+1)+'/10';$('fill').style.width=(S.i*10)+'%'}
  $('q').textContent=c.q;$('vis').textContent=c.vis;
  $('fb').textContent='';$('fb').className='fb';
  $('next').hidden=true;$('opts').innerHTML='';
  c.opts.forEach(o=>{
    const b=document.createElement('button');
    b.className='opt';b.textContent=o;
    if(String(o).length>3)b.style.fontSize='26px';
    b.onclick=()=>answer(b,o);
    $('opts').appendChild(b);
  });
}

function answer(b,o){
  if(S.locked)return;
  if(o===S.cur.ans){
    S.locked=true;
    if(S.first)S.score++;
    b.classList.add('ok');
    $('fb').textContent='Giỏi quá! 🎉';$('fb').className='fb good';
    beep(true);
    if(S.race)setTimeout(()=>{if(S.run)ask()},450);
    else{$('next').textContent=S.i===9?'Xem kết quả':'Câu tiếp';$('next').hidden=false;$('next').focus()}
  }else{
    S.first=false;b.disabled=true;b.classList.add('no');
    $('fb').textContent='Chưa đúng, thử lại nhé!';$('fb').className='fb bad';
    beep(false);
  }
}
$('next').onclick=()=>{S.i++;S.i===10?finish():ask()};
['exit','mexit','sexit','pexit','home2'].forEach(i=>{const e=$(i);if(e)e.onclick=renderHome});
$('again').onclick=()=>start(S.t);

function finish(){
  const n=S.score,r=S.race;stop();
  end(n>=(r?10:9)?3:n>=6?2:1,n,r?'Trong 30 giây, con trả lời đúng '+n+' câu':'Đúng ngay lần đầu: '+n+'/10 câu');
}
function end(stars,sc,txt){
  const u=U(),k=tk(S.t),d=u.done[k]||(u.done[k]={n:0,best:0,sc:0});
  d.n++;d.best=Math.max(d.best,stars);d.sc=Math.max(d.sc,sc);
  u.hist.unshift({t:nm(S.t),s:stars,d:new Date().toLocaleDateString('vi-VN')});
  u.hist.length=Math.min(u.hist.length,6);sv();
  $('dstars').textContent='⭐'.repeat(stars);
  $('dmsg').textContent=stars===3?'Tuyệt vời!':stars===2?'Giỏi lắm!':'Cố lên, con làm được!';
  $('dscore').textContent=txt;
  show('done');
}

/* ---------- Trò chơi lật thẻ ---------- */
function startMatch(t){
  const m=rng,used=new Set(),cards=[];
  while(used.size<4){const a=R(1,m-1),b=R(1,m-a),s=a+b;if(used.has(s))continue;used.add(s);cards.push({k:s,x:a+'+'+b},{k:s,x:''+s})}
  S={t,moves:0,pairs:0,open:null,lock:false};
  $('mmoves').textContent='Lượt: 0';$('mgrid').innerHTML='';
  shuffle(cards).forEach(c=>{
    const b=document.createElement('button');b.className='tile';b.textContent='❓';
    b.onclick=()=>flip(b,c);$('mgrid').appendChild(b);
  });
  show('match');
}
function flip(b,c){
  if(S.lock||b.classList.contains('up'))return;
  b.classList.add('up');b.textContent=c.x;beep('tick');
  if(!S.open){S.open={b,c};return}
  const o=S.open;S.open=null;S.moves++;$('mmoves').textContent='Lượt: '+S.moves;
  if(o.c.k===c.k){
    o.b.classList.add('hit');b.classList.add('hit');beep(true);
    if(++S.pairs===4)setTimeout(()=>end(S.moves<=6?3:S.moves<=9?2:1,0,'Con ghép xong sau '+S.moves+' lượt lật'),700);
  }else{
    S.lock=true;beep(false);
    setTimeout(()=>{[o.b,b].forEach(x=>{x.classList.remove('up');x.textContent='❓'});S.lock=false},700);
  }
}

/* ---------- Trò chơi xếp số ---------- */
function startSort(t){S={t,r:0,err:0};show('sort');sortRound()}
function sortRound(){
  const up=R(0,1),z=new Set();while(z.size<5)z.add(R(0,rng));
  S.order=[...z].sort((a,b)=>up?a-b:b-a);S.n=0;
  $('sinfo').textContent='Vòng '+(S.r+1)+'/3';
  $('sq').textContent=up?'Chạm số từ bé đến lớn':'Chạm số từ lớn đến bé';
  $('sgrid').innerHTML='';
  shuffle(S.order).forEach(v=>{
    const b=document.createElement('button');b.className='tile w';b.textContent=v;
    b.onclick=()=>sortTap(b,v);$('sgrid').appendChild(b);
  });
}
function sortTap(b,v){
  if(b.classList.contains('hit'))return;
  if(v===S.order[S.n]){
    b.classList.add('hit');beep(true);
    if(++S.n===5)setTimeout(()=>{++S.r===3?end(S.err<=1?3:S.err<=4?2:1,0,'Con chạm nhầm '+S.err+' lần'):sortRound()},500);
  }else{S.err++;beep(false);b.classList.add('no');setTimeout(()=>b.classList.remove('no'),300)}
}

/* ---------- Trò chơi bắn bóng bay ---------- */
const COL=['#e5484d','#2f7be5','#2fa56b','#e08a00'];
function startPop(t){S={t,i:0,score:0,run:true};show('pop');popRound()}
function popNext(){if(S.run){S.i++;popRound()}}
function popRound(){
  if(!S.run)return;
  if(S.i===10){const n=S.score;stop();return end(n>=9?3:n>=6?2:1,n,'Con bắn trúng '+n+'/10 bóng')}
  const c=gens[R(0,1)?'add':'sub'](rng),pos=shuffle([4,28,52,76]);
  S.done=false;
  $('pinfo').textContent='Bóng '+(S.i+1)+'/10, đúng '+S.score;
  $('pq').textContent=c.q;$('sky').innerHTML='';
  c.opts.forEach((o,k)=>{
    const b=document.createElement('button');b.className='bl';b.textContent=o;
    b.style.cssText='left:'+pos[k]+'%;background:'+COL[k]+';animation-duration:'+R(55,80)/10+'s';
    b.onclick=()=>{
      if(S.done||b.disabled)return;
      if(o===c.ans){S.done=true;S.score++;beep(true);b.style.transform='scale(1.4)';b.style.opacity=0;setTimeout(popNext,500)}
      else{b.disabled=true;b.style.opacity=.3;beep(false)}
    };
    if(o===c.ans)b.onanimationend=()=>{if(S.run&&!S.done){S.done=true;beep(false);popNext()}};
    $('sky').appendChild(b);
  });
}

renderHome();
