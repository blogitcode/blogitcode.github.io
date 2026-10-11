/* Các đoạn văn đọc hiểu (mỗi đoạn có 5 câu hỏi: câu hỏi, đáp án đúng, 2 đáp án sai) */
const PASSAGES=[
 {t:'Bé Lan có một con mèo. Mèo tên là Mun. Mun có bộ lông màu đen. Mỗi sáng, Mun nằm sưởi nắng ngoài sân. Lan rất yêu Mun.',q:[
  ['Bé nuôi con vật nào?','mèo','chó','gà'],['Mèo tên là gì?','Mun','Miu','Mít'],['Lông mèo màu gì?','đen','trắng','vàng'],['Mỗi sáng mèo nằm ở đâu?','ngoài sân','trong bếp','trên giường'],['Bạn nhỏ trong bài tên là gì?','Lan','Mai','Hoa']]},
 {t:'Nhà bà ở quê có một khu vườn. Trong vườn có cây cam, cây ổi và cây chuối. Mùa hè, cam chín vàng. Bé rất thích hái cam cùng bà.',q:[
  ['Nhà bà ở đâu?','ở quê','ở thành phố','ở biển'],['Trong vườn có cây nào?','cây ổi','cây xoài','cây mít'],['Cam chín vào mùa nào?','mùa hè','mùa đông','mùa xuân'],['Cam chín có màu gì?','vàng','đỏ','xanh'],['Bé thích làm gì cùng bà?','hái cam','tưới hoa','nấu cơm']]},
 {t:'Sáng nay trời mưa to. Nam mặc áo mưa đi học. Trên đường, Nam thấy một chú chim bé bị ướt. Nam đặt chim vào chiếc mũ rồi mang về nhà. Mẹ lau khô cho chim.',q:[
  ['Sáng nay thời tiết thế nào?','trời mưa','trời nắng','trời gió'],['Nam mặc gì đi học?','áo mưa','áo ấm','áo dài'],['Trên đường Nam thấy gì?','một chú chim bé','một con mèo','một chú chó'],['Nam đặt chim vào đâu?','chiếc mũ','cái hộp','cái cặp'],['Ai lau khô cho chim?','mẹ','bà','chị']]},
 {t:'Trường của em có sân rộng. Giờ ra chơi, các bạn nhảy dây, đá cầu và chơi trốn tìm. Em thích nhảy dây nhất. Tiếng cười vang khắp sân trường.',q:[
  ['Sân trường như thế nào?','rộng','chật','tối'],['Các bạn chơi vào lúc nào?','giờ ra chơi','giờ học','giờ ngủ'],['Em thích trò nào nhất?','nhảy dây','đá cầu','trốn tìm'],['Trò nào được kể trong bài?','đá cầu','bóng đá','cờ vua'],['Khắp sân trường vang lên gì?','tiếng cười','tiếng khóc','tiếng hát']]},
 {t:'Ông mặt trời thức dậy từ sớm. Hoa nở rực rỡ trong vườn. Bướm bay lượn quanh những bông hoa. Gà trống gáy ò ó o báo hiệu một ngày mới.',q:[
  ['Ai thức dậy từ sớm?','ông mặt trời','bạn bướm','bạn gà'],['Hoa nở ở đâu?','trong vườn','ngoài ruộng','trên núi'],['Bướm làm gì quanh hoa?','bay lượn','ngủ','bơi'],['Ai gáy ò ó o?','gà trống','vịt','chim sẻ'],['Tiếng gà gáy báo hiệu gì?','một ngày mới','trời sắp mưa','giờ đi ngủ']]},
 {t:'Cuối tuần, cả nhà em đi chợ. Bố mua cá, mẹ mua rau xanh, còn em được mua một quả táo đỏ. Về nhà, mẹ nấu canh rau thơm ngon.',q:[
  ['Cuối tuần cả nhà đi đâu?','chợ','công viên','trường'],['Bố mua gì?','cá','thịt','trứng'],['Mẹ mua gì?','rau xanh','bánh','sữa'],['Em được mua gì?','quả táo đỏ','quả cam','quả chuối'],['Mẹ nấu món gì?','canh rau','cá chiên','cơm rang']]}
];
let rcP=null,rcL=-1;
