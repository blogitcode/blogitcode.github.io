/* Môn Toán lớp 1 - bám mục lục sách Kết nối tri thức với cuộc sống (tập 1, chủ đề 1-5), kèm phần mở rộng */
const SUBJ='toan';
const HELLO='Mầm sẽ cùng con học Toán. Chọn chặng sáng nhấp nháy nhé!';

/* ---------- Hình vẽ SVG ---------- */
const COLS=['#4f8cff','#ff7a59','#2fa56b','#e0a800','#a07cf0'];
const SHAPES=[
  ['hình vuông',c=>`<rect x="14" y="14" width="72" height="72" rx="6" fill="${c}"/>`],
  ['hình tròn',c=>`<circle cx="50" cy="50" r="38" fill="${c}"/>`],
  ['hình tam giác',c=>`<polygon points="50,10 92,86 8,86" fill="${c}" stroke-linejoin="round"/>`],
  ['hình chữ nhật',c=>`<rect x="4" y="26" width="92" height="48" rx="6" fill="${c}"/>`]
];
const svg=s=>`<svg viewBox="0 0 100 100" width="110" height="110" role="img">${s}</svg>`;
const SHN=SHAPES.map(s=>s[0]);

/* ---------- Bộ sinh câu hỏi: gens[k](m, lesson) ---------- */
const gens={
  count(m,t){const lo=t.lo??0,hi=t.hi??10,n=R(lo,hi),e=pick();
    return{q:'Có bao nhiêu hình?',vis:n?e.repeat(n):'(không có hình nào)',opts:nums(n,0,10),ans:n}},
  more(m,t){const e=pick();let a=R(1,8),b=R(1,8);if(R(1,4)==1)b=a;const x=R(0,1);
    const ans=a===b?'Bằng nhau':x?(a<b?'Bên trái':'Bên phải'):(a>b?'Bên trái':'Bên phải');
    return{q:'Bên nào '+(x?'ít hơn':'nhiều hơn')+'?',vis:'Trái:  '+e.repeat(a)+'\nPhải: '+e.repeat(b),opts:['Bên trái','Bên phải','Bằng nhau'],ans}},
  cmp(m){let a=R(0,m),b=R(0,m);if(R(1,5)==1)b=a;
    return{q:'Chọn dấu thích hợp',vis:a+'  ?  '+b,opts:['>','<','='],ans:a>b?'>':a<b?'<':'='}},
  parts(m){const n=R(2,Math.min(m,10)),a=R(1,n-1);
    return{q:n+' gồm '+a+' và mấy?',vis:'',opts:nums(n-a,0,10),ans:n-a}},
  add(m){const a=R(1,m-1),b=R(1,m-a),e=pick();
    return{q:a+' + '+b+' = ?',vis:m<=10?e.repeat(a)+' + '+e.repeat(b):'',opts:nums(a+b,0,m),ans:a+b}},
  sub(m){const a=R(1,m),b=R(0,a);
    return{q:a+' − '+b+' = ?',vis:'',opts:nums(a-b,0,m),ans:a-b}},
  missing(m){const v=R(0,2);
    if(v===0){const a=R(1,m-1),b=R(1,m-a);return{q:'Điền số còn thiếu',vis:a+' + __ = '+(a+b),opts:nums(b,0,m),ans:b}}
    if(v===1){const a=R(1,m-1),b=R(1,m-a);return{q:'Điền số còn thiếu',vis:'__ + '+b+' = '+(a+b),opts:nums(a,0,m),ans:a}}
    const a=R(2,m),b=R(1,a-1);return{q:'Điền số còn thiếu',vis:a+' − __ = '+(a-b),opts:nums(b,0,m),ans:b}},
  tf(m){const a=R(1,m-1),b=R(1,m-a),s=a+b;let c=R(0,1)?s:s+(R(0,1)?1:-1)*R(1,3);if(c<0)c=s+1;
    return{q:'Đúng hay sai?',vis:a+' + '+b+' = '+c,opts:['Đúng','Sai'],ans:c===s?'Đúng':'Sai'}},
  shape(){const i=R(0,3);
    return{q:'Đây là hình gì?',html:svg(SHAPES[i][1](COLS[R(0,4)])),opts:shuffle(SHN.slice()),ans:SHN[i]}},
  countshape(){const T=[['🔴','hình tròn'],['🟦','hình vuông'],['🔺','hình tam giác']],g=T[R(0,2)];
    const n=R(1,5),others=R(2,4),list=[];for(let i=0;i<n;i++)list.push(g[0]);
    for(let i=0;i<others;i++)list.push(T.filter(x=>x!==g)[R(0,1)][0]);
    return{q:'Có bao nhiêu '+g[1]+'?',vis:shuffle(list).join(' '),opts:nums(n,0,9),ans:n}},
  cube(){const I=[['🎲','khối lập phương'],['🧊','khối lập phương'],['📦','khối hộp chữ nhật'],['🎁','khối hộp chữ nhật'],['🧱','khối hộp chữ nhật']],x=I[R(0,I.length-1)];
    return{q:'Đồ vật này có dạng khối gì?',vis:x[0],opts:['khối lập phương','khối hộp chữ nhật'],ans:x[1]}},
  pos(){const A=sample(['🐱','🐶','🐰','🐼','🦊','🐸','🐥'],3),v=R(0,2);
    if(v===0){const w=[['ở giữa',1],['bên trái',0],['bên phải',2]][R(0,2)];return{q:'Con nào '+w[0]+'?',vis:A.join('   '),opts:shuffle(A),ans:A[w[1]]}}
    if(v===1){const up=R(0,1);return{q:'Con nào ở '+(up?'trên':'dưới')+'?',vis:A[0]+'\n'+A[1],opts:shuffle([A[0],A[1]]),ans:up?A[0]:A[1]}}
    const w=[['ở giữa',1],['ở trên cùng',0],['ở dưới cùng',2]][R(0,2)];return{q:'Con nào '+w[0]+'?',vis:A.join('\n'),opts:shuffle(A),ans:A[w[1]]}},
  seq(m){const s=R(0,m-5),k=R(1,3),a=[0,1,2,3,4].map(i=>s+i);
    return{q:'Số nào còn thiếu?',vis:a.map((x,i)=>i==k?'__':x).join(', '),opts:nums(a[k],0,m),ans:a[k]}},
  near(m){const n=R(1,m-1),x=R(0,1),a=x?n+1:n-1;
    return{q:'Số liền '+(x?'sau':'trước')+' của '+n+' là?',vis:'',opts:nums(a,0,m),ans:a}},
  tens(){const t=R(1,9),u=R(0,9),x=R(0,1),a=x?t:u;
    return{q:(t*10+u)+' gồm mấy '+(x?'chục':'đơn vị')+'?',vis:'',opts:nums(a,0,9),ans:a}},
  clock(){const h=R(1,12);
    return{q:'Đồng hồ chỉ mấy giờ?',vis:String.fromCodePoint(0x1F54F+h),opts:nums(h,1,12),ans:h}}
};

/* ---------- Bài chạm theo thứ tự và lật thẻ ---------- */
const ORD={num(m){const z=new Set();while(z.size<5)z.add(R(0,Math.max(m,6)));const up=R(0,1),o=[...z].sort((a,b)=>up?a-b:b-a);
  return{q:up?'Chạm số từ bé đến lớn':'Chạm số từ lớn đến bé',order:o}}};
function PAIRS(t){const m=t.m||rng,used=new Set(),p=[];
  while(p.length<4){const a=R(1,m-1),b=R(1,m-a),s=a+b;if(used.has(s))continue;used.add(s);p.push([a+' + '+b,String(s)])}
  return p}

/* ---------- Các chặng học theo mục lục sách ---------- */
const mix=(id,name,desc,ks,m=10)=>({id,icon:'🌟',name,desc,mix:ks,m});
const UNITS=[
 {id:'cd1',title:'Chủ đề 1: Các số từ 0 đến 10',sub:'Bài 1 đến bài 6',lessons:[
  {id:'b1',icon:'🍎',name:'Các số 0, 1, 2, 3, 4, 5',desc:'Bài 1: đếm và nhận biết số',k:'count',lo:0,hi:5},
  {id:'b2',icon:'🍓',name:'Các số 6, 7, 8, 9, 10',desc:'Bài 2: đếm và nhận biết số',k:'count',lo:6,hi:10},
  {id:'b3',icon:'⚖️',name:'Nhiều hơn, ít hơn, bằng nhau',desc:'Bài 3',k:'more'},
  {id:'b4',icon:'🔣',name:'So sánh số',desc:'Bài 4: lớn hơn, bé hơn, bằng',k:'cmp',m:10},
  {id:'b5',icon:'🧩',name:'Mấy và mấy',desc:'Bài 5: tách và gộp số',k:'parts',m:10},
  mix('b6','Luyện tập chung','Bài 6',['count','more','cmp','parts'])]},
 {id:'cd2',title:'Chủ đề 2: Làm quen với một số hình phẳng',sub:'Bài 7 đến bài 9',lessons:[
  {id:'b7',icon:'🔷',name:'Hình vuông, tròn, tam giác, chữ nhật',desc:'Bài 7: nhận biết hình',k:'shape'},
  {id:'b8',icon:'🧱',name:'Thực hành lắp ghép, xếp hình',desc:'Bài 8: đếm các hình',k:'countshape'},
  mix('b9','Luyện tập chung','Bài 9',['shape','countshape'])]},
 {id:'cd3',title:'Chủ đề 3: Phép cộng, phép trừ trong phạm vi 10',sub:'Bài 10 đến bài 13',lessons:[
  {id:'b10',icon:'➕',name:'Phép cộng trong phạm vi 10',desc:'Bài 10',k:'add',m:10},
  {id:'b11',icon:'➖',name:'Phép trừ trong phạm vi 10',desc:'Bài 11',k:'sub',m:10},
  {id:'b12',icon:'📋',name:'Bảng cộng, bảng trừ trong phạm vi 10',desc:'Bài 12: điền số còn thiếu',k:'missing',m:10},
  mix('b13','Luyện tập chung','Bài 13',['add','sub','missing'])]},
 {id:'cd4',title:'Chủ đề 4: Làm quen với một số hình khối',sub:'Bài 14 đến bài 16',lessons:[
  {id:'b14',icon:'🎲',name:'Khối lập phương, khối hộp chữ nhật',desc:'Bài 14',k:'cube'},
  {id:'b15',icon:'🧭',name:'Vị trí, định hướng trong không gian',desc:'Bài 15: trên, dưới, trái, phải, giữa',k:'pos'},
  mix('b16','Luyện tập chung','Bài 16',['cube','pos'])]},
 {id:'cd5',title:'Chủ đề 5: Ôn tập học kì 1',sub:'Bài 17 đến bài 20',lessons:[
  mix('b17','Ôn tập các số trong phạm vi 10','Bài 17',['count','cmp','parts','near']),
  mix('b18','Ôn tập phép cộng, phép trừ trong phạm vi 10','Bài 18',['add','sub','missing','tf']),
  mix('b19','Ôn tập hình học','Bài 19',['shape','countshape','cube','pos']),
  mix('b20','Ôn tập chung','Bài 20',['count','cmp','parts','add','sub','shape','cube','pos'])]},
 {id:'ext',title:'Mở rộng: số đến 100',sub:'Chọn phạm vi 10 đến 100 ở phía trên',lessons:[
  {id:'add',icon:'➕',name:'Cộng',desc:'Chọn phạm vi ở trên',k:'add',range:1},
  {id:'sub',icon:'➖',name:'Trừ',desc:'Chọn phạm vi ở trên',k:'sub',range:1},
  {id:'cmpx',icon:'🔣',name:'So sánh số',desc:'Chọn phạm vi ở trên',k:'cmp',range:1},
  {id:'seq',icon:'🔢',name:'Dãy số',desc:'Tìm số còn thiếu',k:'seq',range:1},
  {id:'near',icon:'👉',name:'Số liền trước, liền sau',desc:'Chọn phạm vi ở trên',k:'near',range:1},
  {id:'tf',icon:'✅',name:'Đúng hay sai?',desc:'Phép cộng này đúng không',k:'tf',range:1},
  {id:'tens',icon:'🧱',name:'Chục và đơn vị',desc:'Số có hai chữ số',k:'tens',m:99},
  {id:'clock',icon:'🕐',name:'Xem giờ đúng',desc:'Đồng hồ chỉ mấy giờ',k:'clock',m:12}]}
];
const GAMES=[
  {id:'race',icon:'⏱️',name:'Đua 30 giây',desc:'Trả lời thật nhiều câu',game:'race'},
  {id:'pop',icon:'🎈',name:'Bắn bóng bay',desc:'Chạm bóng có kết quả đúng',game:'pop',mix:['add','sub'],range:1},
  {id:'ord',icon:'📶',name:'Xếp số',desc:'Chạm số theo thứ tự',game:'order',k:'num',range:1},
  {id:'pairs',icon:'🃏',name:'Lật thẻ ghép phép tính',desc:'Ghép phép cộng với kết quả',game:'pairs',range:1}
];
