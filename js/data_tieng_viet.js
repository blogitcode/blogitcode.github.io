/* Dữ liệu môn Tiếng Việt lớp 1 */
const SUBJ='tv';
const W=[['🍎','táo'],['🐱','mèo'],['🐟','cá'],['🚗','xe'],['🌸','hoa'],['⭐','sao'],['🐔','gà'],['🐘','voi'],['🌳','cây'],['📖','sách'],['🐮','bò'],['🍬','kẹo'],['🎈','bóng'],['🐝','ong']];
const AB='abcdeghiklmnoprstuvxy'.split('');
const OPP=[['to','nhỏ'],['cao','thấp'],['nóng','lạnh'],['nhanh','chậm'],['vui','buồn'],['đẹp','xấu'],['dài','ngắn'],['nặng','nhẹ'],['sáng','tối'],['ngày','đêm'],['trên','dưới']];
const pk=(a,p)=>shuffle([a,...shuffle(p.filter(x=>x!==a)).slice(0,3)]);
const rw=()=>W[R(0,W.length-1)];
const gens={
  letter(){const w=rw(),a=w[1][0];return{q:'Từ này bắt đầu bằng chữ gì?',vis:w[0],opts:pk(a,AB),ans:a}},
  missing(){const w=rw(),t=w[1],ix=[...t].map((c,i)=>/[a-z]/.test(c)?i:-1).filter(i=>i>=0),i=ix[R(0,ix.length-1)];return{q:'Điền chữ còn thiếu',vis:w[0]+' '+t.slice(0,i)+'_'+t.slice(i+1),opts:pk(t[i],AB),ans:t[i]}},
  pic(){const w=rw();return{q:'Đây là cái gì?',vis:w[0],opts:pk(w[1],W.map(x=>x[1])),ans:w[1]}},
  opp(){const p=OPP[R(0,OPP.length-1)],f=R(0,1),a=p[f],b=p[1-f];return{q:'Từ trái nghĩa với "'+b+'" là?',vis:'',opts:pk(a,OPP.flat().filter(x=>x!==b)),ans:a}}
};
const GAMES=[{id:'race',icon:'⏱️',name:'Đua 30 giây',desc:'Trả lời thật nhiều câu',race:1}];
const LEVELS={1:{topics:[
  {id:'letter',icon:'🔤',name:'Chữ cái đầu',desc:'Từ này bắt đầu bằng chữ gì',k:'letter',m:0},
  {id:'missing',icon:'✏️',name:'Điền chữ còn thiếu',desc:'Hoàn thành từ',k:'missing',m:0},
  {id:'pic',icon:'🖼️',name:'Nhìn hình chọn từ',desc:'Đây là cái gì',k:'pic',m:0},
  {id:'opp',icon:'↔️',name:'Từ trái nghĩa',desc:'Cao thì ngược lại là gì',k:'opp',m:0}
]}};
