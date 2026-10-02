/* Dữ liệu môn Toán: bộ sinh câu hỏi, bài học, trò chơi */
const SUBJ='toan';
/* ---------- Bộ sinh câu hỏi (m = số lớn nhất của phạm vi) ---------- */
const gens={
  count(){const n=R(1,10);return{q:'Có bao nhiêu hình?',vis:pick().repeat(n),opts:nums(n,0,10),ans:n}},
  add(m){const a=R(1,m-1),b=R(1,m-a),e=pick();return{q:a+' + '+b+' = ?',vis:m<=10?e.repeat(a)+' + '+e.repeat(b):'',opts:nums(a+b,0,m),ans:a+b}},
  sub(m){const a=R(1,m),b=R(0,a);return{q:a+' − '+b+' = ?',vis:'',opts:nums(a-b,0,m),ans:a-b}},
  cmp(m){let a=R(0,m),b=R(0,m);if(R(1,5)==1)b=a;return{q:'Chọn dấu thích hợp',vis:a+'  ?  '+b,opts:['>','<','='],ans:a>b?'>':a<b?'<':'='}},
  seq(m){const s=R(0,m-5),k=R(1,3),a=[0,1,2,3,4].map(i=>s+i);return{q:'Số nào còn thiếu?',vis:a.map((x,i)=>i==k?'__':x).join(', '),opts:nums(a[k],0,m),ans:a[k]}},
  near(m){const n=R(1,m-1),x=R(0,1),a=x?n+1:n-1;return{q:'Số liền '+(x?'sau':'trước')+' của '+n+' là?',vis:'',opts:nums(a,0,m),ans:a}},
  tens(){const t=R(1,9),u=R(0,9),x=R(0,1),a=x?t:u;return{q:(t*10+u)+' gồm mấy '+(x?'chục':'đơn vị')+'?',vis:'',opts:nums(a,0,9),ans:a}},
  shape(){const L=[['🔴','hình tròn'],['🟦','hình vuông'],['🔺','hình tam giác'],['⭐','ngôi sao']],s=L[R(0,3)];return{q:'Đây là hình gì?',vis:s[0],opts:shuffle(L.map(x=>x[1])),ans:s[1]}},
  clock(){const h=R(1,12);return{q:'Đồng hồ chỉ mấy giờ?',vis:String.fromCodePoint(0x1F54F+h),opts:nums(h,1,12),ans:h}},
  times(m){const b=R(1,10);return{q:m+' × '+b+' = ?',vis:'',opts:nums(m*b,0,m*10),ans:m*b}},
  tf(m){const a=R(1,m-1),b=R(1,m-a),s=a+b;let c=R(0,1)?s:s+(R(0,1)?1:-1)*R(1,3);if(c<0)c=s+1;return{q:'Đúng hay sai?',vis:a+' + '+b+' = '+c,opts:['Đúng','Sai'],ans:c===s?'Đúng':'Sai'}},
  big(m){const z=new Set();while(z.size<4)z.add(R(0,m));const a=[...z],x=R(0,1);return{q:x?'Số nào lớn nhất?':'Số nào bé nhất?',vis:'',opts:shuffle(a),ans:x?Math.max(...a):Math.min(...a)}},
  fill(m){const a=R(1,m-1),b=R(1,m-a);return{q:'Điền số còn thiếu',vis:a+' + __ = '+(a+b),opts:nums(b,0,m),ans:b}}
};

/* ---------- Chương trình học: thêm bài hoặc lớp mới ở đây ---------- */
const GAMES=[
  {id:'race',icon:'⏱️',name:'Đua 30 giây',desc:'Trả lời thật nhiều câu',race:1},
  {id:'match',icon:'🃏',name:'Lật thẻ ghép đôi',desc:'Ghép phép cộng với kết quả',match:1,range:1},
  {id:'pop',icon:'🎈',name:'Bắn bóng bay',desc:'Chạm bóng có kết quả đúng',pop:1,range:1},
  {id:'sort',icon:'📶',name:'Xếp số',desc:'Chạm số theo thứ tự',sort:1,range:1},
  {id:'tf',icon:'✅',name:'Đúng hay sai?',desc:'Phép cộng này đúng không',k:'tf',range:1},
  {id:'big',icon:'👑',name:'Số lớn nhất, bé nhất',desc:'Tìm số đặc biệt',k:'big',range:1}
];
const LEVELS={
  1:{topics:[
    {id:'count',icon:'🍎',name:'Đếm số',desc:'Đếm hình từ 1 đến 10',k:'count',m:10},
    {id:'add',icon:'➕',name:'Cộng',desc:'Chọn phạm vi ở trên',k:'add',range:1},
    {id:'sub',icon:'➖',name:'Trừ',desc:'Chọn phạm vi ở trên',k:'sub',range:1},
    {id:'cmp',icon:'⚖️',name:'So sánh số',desc:'Lớn hơn, bé hơn, bằng',k:'cmp',m:20},
    {id:'seq',icon:'🔢',name:'Dãy số',desc:'Tìm số còn thiếu',k:'seq',m:20},
    {id:'fill',icon:'❓',name:'Điền số',desc:'Tìm số trong phép cộng',k:'fill',m:10},
    {id:'next',icon:'👉',name:'Liền trước, liền sau',desc:'Các số đến 20',k:'near',m:20},
    {id:'tens',icon:'🧱',name:'Chục và đơn vị',desc:'Số có hai chữ số',k:'tens',m:99},
    {id:'shape',icon:'🔺',name:'Nhận biết hình',desc:'Tròn, vuông, tam giác',k:'shape',m:0},
    {id:'clock',icon:'🕐',name:'Xem giờ đúng',desc:'Đồng hồ chỉ mấy giờ',k:'clock',m:0}
  ]}
};

