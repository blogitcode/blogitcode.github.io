/* Môn Tiếng Việt lớp 1 - bám mục lục sách Kết nối tri thức với cuộc sống (bài 1 đến bài 83) */
const SUBJ='tv';
const HELLO='Mầm sẽ cùng con học chữ và đọc. Chạm 🔊 để nghe nhé!';

/* ---------- Từ điển vần: mỗi vần có vài tiếng mẫu ---------- */
const LEX={
'an':'bạn,đàn,sàn,than','ăn':'ăn,khăn,chăn,văn','ân':'sân,mận,cân,thân,gần',
'on':'con,non,bón,tròn','ôn':'bốn,hôn,tôn,ôn','ơn':'sơn,cơn,đơn,ơn',
'en':'sen,đèn,khen,hen','ên':'nên,tên,lên,bền','in':'tin,xin,chín,mịn','un':'bún,cún,mùn,vun',
'am':'tám,cam,làm,tràm','ăm':'năm,tắm,chăm,nằm','âm':'tâm,ấm,nấm,cầm',
'om':'tóm,đóm,bom,khom','ôm':'ôm,tôm,cốm,hôm','ơm':'cơm,thơm,rơm,bơm',
'em':'xem,kem,nem,tem','êm':'êm,đêm,thêm,nêm','im':'chim,tim,nhím,kìm','um':'chùm,cúm,um,nhúm',
'ai':'bài,hai,tai,cải,mai','ay':'tay,bay,máy,chạy,hay','ây':'cây,dây,mây,đây,bậy',
'oi':'voi,còi,nói,đói','ôi':'tôi,đôi,cối,nổi','ơi':'bơi,mời,chơi,rơi',
'ui':'túi,mùi,vui,bụi,cúi','ưi':'gửi,ngửi','ao':'cao,sao,bao,chào','eo':'mèo,heo,kéo,leo,chéo',
'au':'sau,cau,màu,lau','âu':'câu,đầu,trâu,sâu','êu':'nếu,kêu,lều,thêu',
'iu':'chịu,dịu,líu,địu','ưu':'cứu,lưu,hưu,mưu',
'ac':'các,bạc,nhạc,khác','ăc':'lắc,mắc,tắc,bắc','âc':'bậc,gấc,nhấc,tấc',
'oc':'sóc,học,góc,khóc,tóc,cóc','ôc':'ốc,cốc,mộc,gốc','uc':'cúc,trúc,mục,phục','ưc':'mực,sức,lực,thức',
'at':'hát,cát,mát,bát,vạt','ăt':'mắt,cắt,bắt,chặt','ât':'mật,đất,cất,gật',
'ot':'hót,rót,chót,nhót','ôt':'một,cột,bột,tốt','ơt':'ớt,vợt,hớt,rớt',
'et':'vẹt,hét,nét,chẹt','êt':'tết,hết,kết,vết,dệt','it':'mít,vịt,thịt,bịt,nịt',
'ut':'sút,mút,cút,nút','ưt':'bứt,sứt,mứt,đứt',
'ap':'cáp,sạp,tháp,nháp','ăp':'cặp,sắp,bắp,gặp','âp':'cấp,tập,lấp,nhập',
'op':'họp,góp,chóp','ôp':'hộp,chộp,lộp,đốp','ơp':'lớp,cớp,hớp,tớp',
'ep':'nẹp,chép,kẹp,lép','êp':'xếp,nếp,bếp','ip':'nhịp,kịp,bịp','up':'búp,chụp,cúp,húp',
'anh':'anh,bánh,chanh,tranh','ênh':'kênh,bệnh,lệnh,chênh','inh':'xinh,kính,mình,sinh',
'ach':'sách,cách,lạch,mạch','êch':'ếch,lệch,chếch,nhếch','ich':'lịch,tích,thích,ích',
'ang':'sang,vàng,làng,nàng','ăng':'măng,trăng,nắng,lắng','âng':'vâng,tầng,lâng,nâng',
'ong':'bóng,cong,sóng,vòng','ông':'ông,bông,sông,không','ung':'chung,vung,cung,tung','ưng':'dừng,cứng,đứng,rừng,mừng',
'iêc':'xiếc,việc,tiếc,biếc','iên':'biển,tiền,viên,kiến','iêp':'tiếp,nghiệp,hiệp,kiếp',
'iêng':'tiếng,miệng,riêng,chiêng','iêm':'niềm,kiếm,chiêm,hiểm','yên':'yên,yến',
'iêt':'tiết,biết,viết,việt','iêu':'chiều,điều,hiểu,tiêu','yêu':'yêu,yếu',
'uôi':'cuối,tuổi,muối,chuối','uôm':'buồm,nhuộm','uôc':'cuộc,thuốc,buộc,chuộc','uôt':'chuột,suốt,nuốt,tuột',
'uôn':'cuốn,muốn,luôn,buồn','uông':'chuông,uống,xuống,buồng',
'ươi':'cười,mười,tươi,người','ươu':'hươu,rượu,bướu,khướu','ươc':'nước,bước,được,thước,trước','ươt':'ướt,mượt,lướt,trượt',
'ươm':'ươm,bướm,tươm','ươp':'cướp,nượp,ướp','ươn':'vườn,lươn,sườn,mượn','ương':'sương,đường,trường,thương',
'oa':'hoa,loa,toa,hòa','oe':'khỏe,xòe,loe,toe','oan':'toàn,hoàn,khoan,đoàn','oăn':'xoắn,khoăn,ngoằn',
'oat':'hoạt,thoát,toát,loạt','oăt':'thoắt,choắt,ngoặt','oai':'khoai,xoài,ngoài,hoài',
'uê':'huệ,quê,thuê,xuê','uy':'tuy,quý,suy,huy','uân':'xuân,tuần,quân,huân','uât':'tuất,luật,xuất,thuật',
'uyên':'tuyến,chuyện,huyền,thuyền','uyêt':'tuyệt,quyết,huyệt,duyệt'
};
const LX={},VANS=Object.keys(LEX);VANS.forEach(v=>LX[v]=LEX[v].split(','));
const UP=s=>s.charAt(0).toUpperCase()+s.slice(1);
const noTone=w=>w.normalize('NFD').replace(/[̣̀́̉̃]/g,'').normalize('NFC');
const ALPHA='a ă â b c d đ e ê g h i k l m n o ô ơ p q r s t u ư v x y'.split(' ');
const DIG=['ch','kh','ng','ngh','gh','nh','th','tr','ph','gi','qu'];

/* Chọn 4 đáp án vần: vần đúng, các vần cùng bài, rồi vần gần giống */
function vanOpts(v,set){
  const o=[v,...set.filter(x=>x!==v)];
  const near=shuffle(VANS.filter(x=>!o.includes(x)&&(x[0]===v[0]||x.slice(-1)===v.slice(-1))));
  const rest=shuffle(VANS.filter(x=>!o.includes(x)&&!near.includes(x)));
  return shuffle([...o,...near,...rest].slice(0,4));
}

/* ---------- Từ có hình ---------- */
const PICS=[['🐟','cá'],['🐱','mèo'],['🐔','gà'],['🍎','táo'],['🐘','voi'],['🌸','hoa'],['🌳','cây'],['📖','sách'],['🐮','bò'],['🍬','kẹo'],
 ['🎈','bóng'],['🐝','ong'],['🚗','xe'],['⭐','sao'],['🦆','vịt'],['🍇','nho'],['🐻','gấu'],['🍚','gạo'],['🍑','đào'],['🍃','lá'],['🕯️','nến'],
 ['🐢','rùa'],['🐐','dê'],['🐖','lợn'],['🐅','hổ'],['🪣','xô'],['👕','áo'],['🐸','ếch'],['🌶️','ớt'],['🐌','ốc'],['👶','em'],
 ['🥚','trứng'],['🍌','chuối'],['🏠','nhà'],['🌙','trăng'],['🐶','chó'],['🐰','thỏ'],['🌽','ngô'],['🪑','ghế'],['🐃','nghé'],['🍊','quả cam'],
 ['🍜','phở'],['🐒','khỉ'],['👟','giày']];
const onsetOf=w=>{const b=noTone(w.split(' ')[0]);const d=[...DIG].sort((x,y)=>y.length-x.length).find(x=>b.startsWith(x));return d||b[0]};
const PIC1=PICS.filter(p=>onsetOf(p[1]).length===1),PICD=PICS.filter(p=>onsetOf(p[1]).length>1);
const TONEN=['không dấu','dấu huyền','dấu sắc','dấu hỏi','dấu ngã','dấu nặng'];
const TB=['ba bà bá bả bã bạ','be bè bé bẻ bẽ bẹ','bo bò bó bỏ bõ bọ','ca cà cá cả cã cạ','co cò có cỏ cõ cọ','ma mà má mả mã mạ','la là lá lả lã lạ','ta tà tá tả tã tạ','da dà dá dả dã dạ','ha hà há hả hã hạ','na nà ná nả nã nạ','mo mò mó mỏ mõ mọ'].map(s=>s.split(' '));
const SPELL={
 ck:{c:['c','k'],w:[['cá','c','🐟'],['cò','c','🦢'],['cô','c'],['cờ','c'],['kẻ','k'],['kẹo','k','🍬'],['kéo','k','✂️'],['kê','k'],['kì','k']]},
 ggh:{c:['g','gh'],w:[['gà','g','🐔'],['gỗ','g','🪵'],['gạo','g','🍚'],['gấu','g','🐻'],['ghế','gh','🪑'],['ghi','gh'],['ghé','gh']]},
 nggh:{c:['ng','ngh'],w:[['ngô','ng','🌽'],['ngà','ng'],['ngủ','ng','😴'],['nghe','ngh','👂'],['nghé','ngh','🐃'],['nghỉ','ngh']]}
};

/* ---------- Bộ sinh câu hỏi ---------- */
const gens={
  letterpick(m,t){
    const L=t.letters||ALPHA,l=L[R(0,L.length-1)],toUp=R(0,1),pool=[...L,...ALPHA,...DIG];
    return toUp?{q:'Chữ in hoa của chữ này là?',vis:l,opts:choices(UP(l),pool.map(UP)),ans:UP(l)}
               :{q:'Chữ thường của chữ này là?',vis:UP(l),opts:choices(l,pool),ans:l}},
  tone(m,t){
    const allow=t.tones||[0,1,2,3,4,5],i=allow[R(0,allow.length-1)],row=TB[R(0,TB.length-1)],ans=TONEN[i];
    const names=allow.map(x=>TONEN[x]),rest=TONEN.filter(n=>!names.includes(n));
    return{q:'Tiếng này có dấu gì?',vis:row[i],say:row[i],opts:shuffle([ans,...shuffle(names.filter(n=>n!==ans)),...shuffle(rest)].slice(0,4)),ans}},
  join2(m,t){
    const ons=t.ons||['b','c','d','đ'],vows=t.vows||['a','e','ê','o','ô','ơ'],ok=(o,v)=>!(o==='c'&&(v==='e'||v==='ê'));
    const o=ons[R(0,ons.length-1)],vs=vows.filter(v=>ok(o,v)),v=vs[R(0,vs.length-1)],ans=o+v;
    const o2=vs.filter(x=>x!==v).map(x=>o+x),pad=ons.filter(x=>x!==o).flatMap(x=>vows.filter(y=>ok(x,y)).map(y=>x+y));
    return{q:'Ghép: '+o+' + '+v+' = ?',vis:'',say:ans,opts:shuffle([ans,...shuffle(o2),...shuffle(pad)].slice(0,4)),ans}},
  initial(m,t){
    const src=t.dig?PICD:PIC1,p=src[R(0,src.length-1)],a=onsetOf(p[1]);
    const pool=t.dig?DIG:ALPHA;
    return{q:'Từ này bắt đầu bằng chữ gì?',vis:p[0],say:p[1],opts:choices(a,pool),ans:a}},
  spell(m,t){
    const g=SPELL[t.sp||['ck','ggh','nggh'][R(0,2)]],w=g.w[R(0,g.w.length-1)],pre=w[1];
    return{q:'Điền chữ còn thiếu',vis:(w[2]?w[2]+'  ':'')+'__'+w[0].slice(pre.length),say:w[0],opts:g.c.slice(),ans:pre}},
  pic(){const p=PICS[R(0,PICS.length-1)];return{q:'Đây là cái gì?',vis:p[0],say:p[1],opts:choices(p[1],PICS.map(x=>x[1])),ans:p[1]}},
  rhyme(m,t){
    const set=(t.vans||VANS).filter(v=>LX[v]),v=set[R(0,set.length-1)],w=LX[v][R(0,LX[v].length-1)];
    return{q:'Tiếng này có vần gì?',vis:w,say:w,opts:vanOpts(v,set),ans:v}},
  join(m,t){
    const set=(t.vans||VANS).filter(v=>LX[v]);
    for(let g=0;g<40;g++){
      const v=set[R(0,set.length-1)],w=LX[v][R(0,LX[v].length-1)],b=noTone(w);
      if(!b.endsWith(v))continue;const o=b.slice(0,b.length-v.length);
      if(!o||o==='q')continue;
      const ops=vanOpts(v,set).map(x=>o+x);
      return{q:'Ghép: '+o+' + '+v+' = ?',vis:'',say:b,opts:ops,ans:b}
    }
    return gens.rhyme(m,t)},
  opp(){const O=[['to','nhỏ'],['cao','thấp'],['nóng','lạnh'],['nhanh','chậm'],['vui','buồn'],['đẹp','xấu'],['dài','ngắn'],['nặng','nhẹ'],['sáng','tối'],['ngày','đêm'],['trên','dưới']],
      p=O[R(0,O.length-1)],f=R(0,1),a=p[f],b=p[1-f];
    return{q:'Từ trái nghĩa với "'+b+'" là?',vis:'',opts:choices(a,O.flat().filter(x=>x!==b)),ans:a}},
  read(m,t){const i=(typeof S!=='undefined'&&S.i)||0,k=i%5;
    if(k===0||!rcP){let n;do{n=R(0,PASSAGES.length-1)}while(n===rcL);rcL=n;rcP=PASSAGES[n]}
    const [q,a,...w]=rcP.q[k];return{q,pass:rcP.t,vis:'',opts:shuffle([a,...w]),ans:a}}
};
const SENT=['bé đi học','mẹ nấu cơm','bà đi chợ','mèo ăn cá','gà ăn thóc','bố đọc sách','chim hót trên cây','trời mưa to','em yêu mẹ','em chơi với bạn','cá bơi dưới nước','hoa nở trong vườn'];
const ORD={sent(){const s=SENT[R(0,SENT.length-1)];return{q:'Chạm từng từ để ghép thành câu',order:s.split(' ')}}};
function PAIRS(){return sample(ALPHA.filter(x=>x.length===1),4).map(l=>[l,UP(l)])}

/* ---------- Các chặng học theo mục lục sách ---------- */
const mk=(id,icon,name,desc,o)=>Object.assign({id,icon,name,desc},o);
const VG=[
 ['V1','Bài 31 đến bài 37',['an ăn ân','on ôn ơn','en ên in un','am ăm âm','om ôm ơm','em êm im um']],
 ['V2','Bài 38 đến bài 45',['ai ay ây','oi ôi ơi','ui ưi','ao eo','au âu êu','iu ưu']],
 ['V3','Bài 46 đến bài 55',['ac ăc âc','oc ôc uc ưc','at ăt ât','ot ôt ơt','et êt it','ut ưt','ap ăp âp','op ôp ơp']],
 ['V4','Bài 56 đến bài 65',['ep êp ip up','anh ênh inh','ach êch ich','ang ăng âng','ong ông ung ưng','iêc iên iêp','iêng iêm yên','iêt iêu yêu']],
 ['V5','Bài 66 đến bài 74',['uôi uôm','uôc uôt','uôn uông','ươi ươu','ươc ươt','ươm ươp','ươn ương','oa oe']],
 ['V6','Bài 74 đến bài 80',['oan oăn oat oăt','oai uê uy','uân uât','uyên uyêt']]
];
const vanUnits=VG.map(([id,sub,list],n)=>({id,title:'Học vần '+(n+1),sub,lessons:list.map((g,i)=>mk(id+'_'+i,'🔤','Vần '+g,'Tìm vần và ghép vần',{mix:['rhyme','join'],vans:g.split(' ')}))}));
const UNITS=[
 {id:'A',title:'Làm quen chữ cái và dấu thanh',sub:'Bài 1 đến bài 10',lessons:[
  mk('a1','🅰️','Chữ a, b, c, e, ê','Bài 1 đến bài 5',{k:'letterpick',letters:['a','b','c','e','ê']}),
  mk('a2','🔻','Dấu huyền, dấu sắc','Bài 2, bài 3',{k:'tone',tones:[0,1,2]}),
  mk('a3','🅾️','Chữ o, ô, ơ, d, đ','Bài 6 đến bài 9',{k:'letterpick',letters:['o','ô','ơ','d','đ']}),
  mk('a4','🔺','Dấu hỏi, dấu ngã, dấu nặng','Bài 6, 7, 9',{k:'tone',tones:[0,3,4,5]}),
  mk('a5','🧩','Ghép chữ thành tiếng','Bài 5, bài 10: ba, be, bê...',{k:'join2'})]},
 {id:'B',title:'Chữ cái và âm',sub:'Bài 11 đến bài 29',lessons:[
  mk('b1','🔡','Chữ i, k, h, l, u, ư','Bài 11 đến bài 13',{k:'letterpick',letters:['i','k','h','l','u','ư']}),
  mk('b2','🔡','Chữ m, n, g, r, s, t','Bài 16, 17, 21, 22',{k:'letterpick',letters:['m','n','g','r','s','t']}),
  mk('b3','🔡','Chữ v, x, y, p, q','Bài 26 đến bài 28',{k:'letterpick',letters:['v','x','y','p','q']}),
  mk('b4','🖼️','Chữ cái đầu của từ','Nhìn hình chọn chữ đầu',{k:'initial'}),
  mk('b5','🔠','Chữ ghép đầu từ','ch, kh, ng, gh, nh, th, tr...',{k:'initial',dig:1}),
  mk('b6','✏️','c hay k?','Bài 3, bài 12: chính tả',{k:'spell',sp:'ck'}),
  mk('b7','✏️','g hay gh?','Bài 17, bài 18: chính tả',{k:'spell',sp:'ggh'}),
  mk('b8','✏️','ng hay ngh?','Bài 19, bài 29: chính tả',{k:'spell',sp:'nggh'}),
  mk('b9','🖼️','Nhìn hình chọn từ','Đây là cái gì',{k:'pic'})]},
 ...vanUnits,
 {id:'D',title:'Đọc, hiểu và ôn tập',sub:'Ôn tập và kể chuyện',lessons:[
  mk('d1','📖','Đọc hiểu','Đọc đoạn văn rồi trả lời',{k:'read',norace:1}),
  mk('d2','↔️','Từ trái nghĩa','Cao thì ngược lại là gì',{k:'opp'}),
  mk('d3','🌟','Ôn tập tổng hợp','Dấu thanh, vần, chữ cái',{mix:['tone','rhyme','join','initial','spell']})]}
];
const GAMES=[
  mk('race','⏱️','Đua 30 giây','Trả lời thật nhiều câu',{game:'race'}),
  mk('sent','🧱','Sắp xếp câu','Chạm từ theo đúng thứ tự',{game:'order',k:'sent',rounds:4}),
  mk('pairs','🃏','Lật thẻ chữ hoa, chữ thường','Ghép a với A',{game:'pairs'}),
  mk('pop','🎈','Bắn bóng chữ','Chạm bóng có đáp án đúng',{game:'pop',mix:['rhyme','tone','initial']})
];
