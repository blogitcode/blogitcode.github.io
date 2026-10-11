/* Môn Khám phá (Tự nhiên và Xã hội lớp 1) - 6 chủ đề: gia đình, trường học, cộng đồng, thực vật và động vật, con người và sức khỏe, Trái Đất và bầu trời */
const SUBJ='kp';
const HELLO='Cùng Mầm khám phá thế giới xung quanh nào! Chạm 🔊 để nghe câu hỏi.';

/* Mỗi câu: câu hỏi | đáp án đúng | sai 1 | sai 2 | emoji (không bắt buộc) */
const QA={
gd:`Mẹ của bố con gọi là gì?|Bà nội|Bà ngoại|Dì|👵
Mẹ của mẹ con gọi là gì?|Bà ngoại|Bà nội|Cô|👵
Anh trai của bố con gọi là gì?|Bác|Chú|Cậu
Em trai của bố con gọi là gì?|Chú|Bác|Dì
Em gái của mẹ con gọi là gì?|Dì|Cô|Bác
Anh hoặc em trai của mẹ con gọi là gì?|Cậu|Chú|Bác
Em gái của bố con gọi là gì?|Cô|Dì|Bà
Đồ vật nào ở nhà nguy hiểm, con không được nghịch?|Ổ điện|Gấu bông|Quyển truyện|🔌
Để giữ nhà cửa sạch sẽ, con nên làm gì?|Cất đồ chơi gọn gàng|Vẽ lên tường|Vứt rác ra sàn
Cả nhà ngồi vào bàn ăn cơm, con nên làm gì?|Mời ông bà, bố mẹ ăn cơm|Ăn xong rồi chạy đi chơi|Không nói gì|🍚`,
tr:`Nơi con đến để học chữ và học toán là đâu?|Trường học|Chợ|Bệnh viện|🏫
Người dạy con học ở lớp là ai?|Thầy giáo, cô giáo|Bác sĩ|Chú công an
Ai trông coi cổng trường để các con an toàn?|Bác bảo vệ|Bác nông dân|Bác tài xế
Khi cô giáo bước vào lớp, con nên làm gì?|Đứng dậy chào cô|Chạy khắp lớp|Nằm xuống bàn
Muốn phát biểu trong giờ học, con làm gì?|Giơ tay xin phép|Hét thật to|Nói chuyện riêng
Giờ ra chơi, trò chơi nào an toàn?|Nhảy dây|Leo lên cửa sổ|Đẩy bạn ngã
Rác ở sân trường nên bỏ vào đâu?|Thùng rác|Gầm bàn|Bồn hoa|🗑️
Thư viện của trường có gì?|Nhiều sách|Nhiều xe máy|Nhiều giường|📚
Bạn bị ngã, con nên làm gì?|Hỏi thăm và giúp bạn|Cười bạn|Bỏ đi
Đồ dùng nào dùng để viết chữ?|Bút|Kéo|Thìa|✏️`,
cd:`Nơi người dân đến mua rau, cá, thịt là đâu?|Chợ|Trường học|Bưu điện|🛒
Khi bị ốm nặng, người ta đến đâu để khám bệnh?|Bệnh viện|Siêu thị|Công viên|🏥
Ai giúp dập tắt đám cháy?|Chú lính cứu hỏa|Cô giáo|Bác nông dân|🚒
Ai giữ gìn an ninh, trật tự cho mọi người?|Chú công an|Cô bán hàng|Bác thợ may
Ai khám và chữa bệnh cho mọi người?|Bác sĩ|Cô giáo|Chú thợ xây|🩺
Ai trồng lúa, trồng rau?|Bác nông dân|Chú công an|Cô y tá|🌾
Đèn giao thông màu đỏ có nghĩa là gì?|Dừng lại|Đi nhanh lên|Quay đầu xe|🔴
Đèn giao thông màu xanh có nghĩa là gì?|Được đi|Phải dừng lại|Chạy ngược lại|🟢
Khi qua đường, con nên đi ở đâu?|Vạch dành cho người đi bộ|Giữa lòng đường|Đường ray xe lửa
Ngồi xe máy cùng bố mẹ, con cần đội gì?|Mũ bảo hiểm|Mũ len|Nón lá
Nơi mọi người đến để gửi thư là đâu?|Bưu điện|Công viên|Nhà sách|📮`,
tv:`Các bộ phận chính của cây là gì?|Rễ, thân, lá|Đầu, tay, chân|Mắt, mũi, miệng|🌳
Bộ phận nào của cây hút nước từ đất?|Rễ|Lá|Hoa
Cây cần gì để sống và lớn lên?|Nước và ánh sáng|Kẹo và bánh|Đồ chơi|🌱
Con vật nào đẻ trứng?|Con gà|Con chó|Con mèo|🥚
Con vật nào sống dưới nước?|Con cá|Con gà|Con bò|🐟
Con vật nào biết bay?|Con chim|Con cá|Con voi|🐦
Con vật nào giúp trông nhà?|Con chó|Con cá|Con ếch|🐶
Con vật nào cho chúng ta sữa?|Con bò|Con vịt|Con cá|🐄
Con vật nào bò chậm và có mai trên lưng?|Con rùa|Con thỏ|Con mèo|🐢
Muốn cây xanh tốt, con nên làm gì?|Tưới nước cho cây|Bẻ cành|Giẫm lên cỏ`,
ng:`Con dùng mắt để làm gì?|Nhìn|Nghe|Ngửi|👁️
Con dùng tai để làm gì?|Nghe|Nhìn|Nếm|👂
Con dùng mũi để làm gì?|Ngửi|Nhìn|Nghe|👃
Con dùng lưỡi để làm gì?|Nếm vị|Nhìn|Ngửi|👅
Da giúp con biết được điều gì?|Nóng, lạnh|Mùi thơm|Âm thanh|✋
Khi nào con cần rửa tay?|Trước khi ăn, sau khi đi vệ sinh|Chỉ khi thích|Không bao giờ|🧼
Con nên đánh răng vào lúc nào?|Sáng ngủ dậy và tối trước khi ngủ|Chỉ khi đau răng|Không cần đánh răng|🪥
Thức ăn nào tốt cho sức khỏe?|Rau và hoa quả|Kẹo ngọt thật nhiều|Nước ngọt có ga|🥦
Con nên uống gì khi khát?|Nước lọc|Nước ngọt thật nhiều|Trà đặc|🥛
Khi trời lạnh, con nên mặc thế nào?|Mặc áo ấm|Mặc áo mỏng|Không mặc áo|🧥`,
td:`Ban ngày, trên bầu trời có gì chiếu sáng?|Mặt trời|Mặt trăng|Cầu vồng|☀️
Ban đêm, con thường thấy gì trên bầu trời?|Mặt trăng và các vì sao|Cầu vồng|Mặt trời|🌙
Trời mưa, con nên mang theo gì?|Áo mưa hoặc ô|Kính râm|Quạt|☔
Trời nắng gắt, con nên đội gì?|Mũ, nón|Khăn len|Áo mưa|🌞
Mưa rơi xuống từ đâu?|Từ đám mây|Từ mặt đất|Từ cái cây|🌧️
Một năm có mấy mùa?|Bốn mùa|Hai mùa|Mười mùa
Mùa nào trời lạnh nhất?|Mùa đông|Mùa hè|Mùa thu|❄️
Mùa nào trời nóng nhất?|Mùa hè|Mùa đông|Mùa xuân|🔥
Cầu vồng thường xuất hiện khi nào?|Sau cơn mưa khi có nắng|Lúc nửa đêm|Khi có tuyết|🌈
Khi có sấm chớp, con nên làm gì?|Vào trong nhà|Đứng dưới gốc cây to|Chạy ra sân|⛈️`
};
/* Việc làm: nên hay không nên (câu | đáp án) */
const SH={
gd:`Giúp mẹ dọn dẹp nhà cửa|Nên
Chạy nhảy trong bếp khi mẹ đang nấu ăn|Không nên
Chào ông bà khi đi học về|Nên
Nghịch ổ điện|Không nên
Cất giày dép gọn gàng|Nên
Nói trống không với người lớn|Không nên`,
tr:`Xếp hàng ngay ngắn khi vào lớp|Nên
Vẽ bậy lên bàn ghế|Không nên
Bỏ rác vào thùng rác|Nên
Xô đẩy bạn ở cầu thang|Không nên
Giúp bạn nhặt bút rơi|Nên
Nói chuyện khi cô đang giảng bài|Không nên`,
cd:`Đi qua đường ở vạch dành cho người đi bộ|Nên
Chạy ra đường khi có xe|Không nên
Đội mũ bảo hiểm khi ngồi xe máy|Nên
Vứt rác ra đường|Không nên
Chào hỏi hàng xóm|Nên
Theo người lạ khi được cho kẹo|Không nên`,
tv:`Tưới nước cho cây|Nên
Bẻ cành, hái hoa ở công viên|Không nên
Cho thú cưng ăn đúng giờ|Nên
Trêu chọc con chó đang ăn|Không nên
Rửa tay sau khi chơi với vật nuôi|Nên
Ngắt lá cây bừa bãi|Không nên`,
ng:`Rửa tay trước khi ăn|Nên
Ăn nhiều kẹo ngọt trước khi đi ngủ|Không nên
Ngủ đủ giấc|Nên
Xem ti vi sát màn hình cả ngày|Không nên
Uống đủ nước mỗi ngày|Nên
Dùng chung khăn mặt với bạn bị đau mắt|Không nên`,
td:`Đội mũ khi trời nắng|Nên
Đứng dưới gốc cây to khi có sấm chớp|Không nên
Mặc áo ấm khi trời lạnh|Nên
Nhìn thẳng vào mặt trời|Không nên
Mang áo mưa khi trời sắp mưa|Nên
Chơi ngoài trời khi có sấm sét|Không nên`
};
const parse=o=>Object.fromEntries(Object.entries(o).map(([k,v])=>[k,v.split('\n').map(l=>l.split('|'))]));
const QAP=parse(QA),SHP=parse(SH),ALLQA=Object.values(QAP).flat(),ALLSH=Object.values(SHP).flat();

const gens={
  qa(m,t){const b=t.u?QAP[t.u]:ALLQA,x=b[R(0,b.length-1)];
    return{q:x[0],vis:x[4]||'',say:x[0],opts:shuffle([x[1],x[2],x[3]]),ans:x[1]}},
  sh(m,t){const b=t.u?SHP[t.u]:ALLSH,x=b[R(0,b.length-1)];
    return{q:'Việc làm này nên hay không nên?',vis:x[0],say:x[0],opts:['Nên','Không nên'],ans:x[1]}}
};
const PB=[['👁️','Nhìn'],['👂','Nghe'],['👃','Ngửi'],['👅','Nếm'],['✋','Sờ'],['🐟','Biết bơi'],['🐦','Biết bay'],['🐶','Trông nhà'],['🐄','Cho sữa'],['🌧️','Ô, áo mưa'],['☀️','Mũ, nón'],['🧼','Rửa tay']];
function PAIRS(){return sample(PB,4)}

const CD=[['gd','Chủ đề 1: Gia đình','🏡'],['tr','Chủ đề 2: Trường học','🏫'],['cd','Chủ đề 3: Cộng đồng địa phương','🏘️'],['tv','Chủ đề 4: Thực vật và động vật','🌳'],['ng','Chủ đề 5: Con người và sức khỏe','💪'],['td','Chủ đề 6: Trái Đất và bầu trời','🌍']];
const UNITS=CD.map(([u,title,ic])=>({id:u,title,sub:'Hỏi đáp và việc nên, không nên',lessons:[
  {id:u+'_qa',icon:ic,name:'Hỏi đáp',desc:title.split(': ')[1],k:'qa',u},
  {id:u+'_sh',icon:'👍',name:'Nên hay không nên?',desc:title.split(': ')[1],k:'sh',u}]}));
UNITS.push({id:'on',title:'Ôn tập',sub:'Tất cả các chủ đề',lessons:[
  {id:'on1',icon:'🌟',name:'Ôn tập hỏi đáp',desc:'Trộn mọi chủ đề',k:'qa'},
  {id:'on2',icon:'🌟',name:'Ôn tập nên, không nên',desc:'Trộn mọi chủ đề',k:'sh'}]});
const GAMES=[
  {id:'race',icon:'⏱️',name:'Đua 30 giây',desc:'Trả lời thật nhiều câu',game:'race'},
  {id:'pairs',icon:'🃏',name:'Lật thẻ ghép đôi',desc:'Ghép hình với việc làm',game:'pairs'}
];
