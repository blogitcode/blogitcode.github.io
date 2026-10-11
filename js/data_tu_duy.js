/* Môn Tư duy: tìm quy luật, phân loại, suy luận, đố vui, trò chơi trí nhớ */
const SUBJ='td';
const HELLO='Mầm và con cùng luyện đầu óc thông minh nhé!';

const CATS={
  'trái cây':['🍎','🍌','🍇','🍓','🍊','🍉'],
  'con vật':['🐶','🐱','🐰','🐸','🐥','🐘'],
  'phương tiện':['🚗','🚌','🚲','✈️','🚂','⛵'],
  'đồ dùng học tập':['✏️','📏','✂️','📚','🖍️','🎒']
};
const CK=Object.keys(CATS),FACE=['🍎','🐱','⭐','🌸','🚗','🐟','🍓','🎈','🐥','🌙'];
const NAMES=['An','Bình','Chi','Dũng','Hà','Lan','Nam','Mai'];
const RIDDLE=`Con gì kêu "meo meo" và thích bắt chuột?|Con mèo|Con chó|Con gà|🐱
Con gì gáy "ò ó o" mỗi sáng?|Con gà trống|Con vịt|Con bò|🐓
Quả gì vỏ vàng, cong cong, khỉ rất thích ăn?|Quả chuối|Quả cam|Quả táo|🍌
Con gì có vòi dài và tai to?|Con voi|Con thỏ|Con mèo|🐘
Con gì bơi dưới nước và có vảy?|Con cá|Con gà|Con trâu|🐟
Cái gì có kim ngắn, kim dài để xem giờ?|Đồng hồ|Quyển sách|Cái ô|🕐
Cái gì che mưa cho con khi đi học?|Cái ô|Cái quạt|Cái thìa|☂️
Cái gì có bốn chân nhưng không biết đi?|Cái bàn|Con mèo|Con gà
Con gì sống trong vỏ và bò rất chậm?|Con ốc|Con chim|Con voi|🐌
Con gì có hai cánh, bay từ hoa này sang hoa khác?|Con bướm|Con cá|Con rùa|🦋`.split('\n').map(l=>l.split('|'));
const PAT=[['A','B'],['A','A','B'],['A','B','C']];
const OUT=[['🐱','🐶'],['🍎','🍅'],['🌞','🌝'],['🔴','🟠'],['🐥','🐤'],['🔵','🟣'],['🌸','🌼'],['🍋','🧀']];

const gens={
  pattern(m,t){
    const u=PAT[(t.lv||R(1,3))-1],E=sample(FACE,3),map={A:E[0],B:E[1],C:E[2]},n=u.length;
    const total=n*2+R(1,n-1),seq=[];for(let i=0;i<total;i++)seq.push(map[u[i%n]]);
    const ans=map[u[total%n]],used=[...new Set(u.map(x=>map[x]))];
    return{q:'Hình nào đi tiếp theo?',vis:seq.join(' ')+' ❓',opts:choices(ans,[...used,...FACE],4),ans}},
  step(m,t){
    const d=[1,2,3,5,10][R(0,4)],s=R(0,10),a=[0,1,2,3].map(i=>s+d*i),ans=s+d*4;
    return{q:'Số nào đi tiếp theo?',vis:a.join(', ')+', __',opts:nums(ans,0,ans+6),ans}},
  odd(){
    const [a,b]=sample(CK,2),three=sample(CATS[a],3),x=CATS[b][R(0,CATS[b].length-1)];
    return{q:'Hình nào khác với các hình còn lại?',vis:'',opts:shuffle([...three,x]),ans:x}},
  classify(){
    const g=CK[R(0,3)],x=CATS[g][R(0,CATS[g].length-1)],o=CK.filter(k=>k!==g).map(k=>CATS[k][R(0,CATS[k].length-1)]);
    return{q:'Hình nào thuộc nhóm "'+g+'"?',vis:'',opts:shuffle([x,...sample(o,3)]),ans:x}},
  diff(){
    const [b,o]=OUT[R(0,OUT.length-1)],r=R(0,2),c=R(0,2),byRow=R(0,1),rows=[];
    for(let i=0;i<3;i++){const row=[];for(let j=0;j<3;j++)row.push(i===r&&j===c?o:b);rows.push(row.join(' '))}
    return{q:'Hình khác nằm ở '+(byRow?'hàng':'cột')+' thứ mấy?',vis:rows.join('\n'),opts:['1','2','3'],ans:String((byRow?r:c)+1)}},
  logic(){
    const [a,b,c]=sample(NAMES,3),tall=R(0,1),w=tall?['cao','cao nhất']:['thấp','thấp nhất'];
    return{q:a+' '+w[0]+' hơn '+b+'. '+b+' '+w[0]+' hơn '+c+'. Ai '+w[1]+'?',vis:'',say:'',opts:shuffle([a,b,c]),ans:a}},
  riddle(){const x=RIDDLE[R(0,RIDDLE.length-1)];
    return{q:x[0],vis:x[4]||'',say:x[0],opts:shuffle([x[1],x[2],x[3]]),ans:x[1]}}
};
function PAIRS(){return sample(['🐱','🐶','🍎','🌸','🚗','🐟','🎈','🐥','⭐','🍓'],4).map(e=>[e,e])}
const OUTSETS=OUT;

const mix=(id,name,desc,ks)=>({id,icon:'🌟',name,desc,mix:ks});
const UNITS=[
 {id:'q',title:'Tìm quy luật',sub:'Nhìn kỹ rồi đoán hình, số đi tiếp theo',lessons:[
  {id:'p1',icon:'🔁',name:'Hai hình thay phiên',desc:'Đỏ, xanh, đỏ, xanh...',k:'pattern',lv:1},
  {id:'p2',icon:'🔂',name:'Ba hình lặp lại',desc:'Hai giống nhau, một khác',k:'pattern',lv:2},
  {id:'p3',icon:'🎡',name:'Ba hình khác nhau',desc:'Mẫu dài hơn một chút',k:'pattern',lv:3},
  {id:'p4',icon:'🪜',name:'Dãy số có quy luật',desc:'Thêm 1, thêm 2, thêm 5, thêm 10...',k:'step'}]},
 {id:'s',title:'Phân loại và so sánh',sub:'Tìm điểm khác biệt, xếp vào nhóm',lessons:[
  {id:'o1',icon:'🕵️',name:'Hình nào khác?',desc:'Tìm hình không cùng nhóm',k:'odd'},
  {id:'o2',icon:'🧺',name:'Xếp vào nhóm',desc:'Trái cây, con vật, phương tiện...',k:'classify'},
  {id:'o3',icon:'🔍',name:'Tìm hình khác biệt',desc:'Khác ở hàng nào, cột nào',k:'diff'},
  {id:'o4',icon:'🧠',name:'Ai cao nhất, ai thấp nhất?',desc:'Suy luận từ hai gợi ý',k:'logic'}]},
 {id:'r',title:'Đố vui và ôn tập',sub:'Đoán xem đó là gì',lessons:[
  {id:'r1',icon:'🎭',name:'Đố vui',desc:'Con gì? Cái gì?',k:'riddle'},
  mix('r2','Ôn tập tư duy','Trộn tất cả',['pattern','step','odd','classify','diff','logic','riddle'])]}
];
const GAMES=[
  {id:'race',icon:'⏱️',name:'Đua 30 giây',desc:'Trả lời thật nhiều câu',game:'race'},
  {id:'simon',icon:'🧠',name:'Nhớ thứ tự',desc:'Nhìn dãy hình rồi chạm lại',game:'simon'},
  {id:'pairs',icon:'🃏',name:'Lật thẻ hình',desc:'Tìm hai hình giống nhau',game:'pairs'},
  {id:'find',icon:'🔎',name:'Tìm hình khác',desc:'Chạm vào hình lạc loài',game:'find'}
];
