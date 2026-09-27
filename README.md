# WWII Quiz / Quiz Thế chiến II

## Hai chế độ / Two quiz modes

- index.html: ô chữ lịch sử Việt–Anh, bảy hàng ngang và một từ khóa cuối cùng.
- legacy.html: trắc nghiệm ý nghĩa Thế chiến II, sáu câu hỏi, bốn lựa chọn mỗi câu.

Dùng thanh chuyển chế độ để đi giữa hai phần. VI / EN chuyển ngôn ngữ.
Trắc nghiệm giữ nguyên câu đã chọn khi chuyển ngôn ngữ. Ô chữ có một bộ riêng cho mỗi ngôn ngữ.
Tiến độ cả hai chế độ được lưu trong sessionStorage của thẻ trình duyệt hiện tại,
bao gồm khi tải lại trang hoặc chuyển chế độ. Tùy chọn ngôn ngữ được lưu trong localStorage.
Nếu trình duyệt không cho phép lưu trữ, có thể chơi nhưng tiến độ không được giữ qua lần tải trang.

## Trắc nghiệm

Chọn một trong bốn đáp án, rồi nhấn Kiểm tra. Phím 1–4 chọn đáp án; Enter kiểm tra.
Mỗi câu chỉ được chấm một lần trong một lượt. Đáp án đã kiểm tra được khóa.
Sau khi kiểm tra, xem đáp án đúng, giải thích và nguồn lịch sử.
Hoàn thành sáu câu để xem điểm và xem lại từng câu. Làm lại bắt đầu một lượt mới
cho phần trắc nghiệm, không xóa tiến độ ô chữ.

## GitHub Pages

1. Giải nén ZIP và upload nội dung vào thư mục gốc repo; giữ nguyên thư mục assets.
2. index.html phải ở ngoài cùng. Không upload nguyên ZIP.
3. Settings → Pages → Deploy from a branch → main → /(root) → Save.
4. Dùng liên kết GitHub Pages mà GitHub hiển thị khi triển khai xong.

Khi cập nhật, thay các tệp cùng tên bằng bản mới. Upload đủ các tệp để cả hai chế độ hoạt động.
Trang ý nghĩa dạng bài đọc trước đây đã được thay bằng trắc nghiệm. legacy-template.mjs cũ không còn được sử dụng.

## Chạy trên máy / Run locally

Mở thư mục bằng VS Code và dùng Live Server, hoặc một máy chủ HTTP cục bộ.
Không mở qua file:// vì JavaScript dùng ES modules. Không cần npm hoặc bước build.
Font Be Vietnam Pro được tải qua Google Fonts; có font dự phòng khi không có mạng.
Các hiệu ứng tôn trọng tùy chọn giảm chuyển động của hệ điều hành.

## Ảnh tư liệu / Archival photograph

Ảnh USS Arizona xuất hiện sau khi giải đúng câu Pearl Harbor trong ô chữ.
US National Archives, 80-G-32420, NAID 520601; 7 December 1941.
Source: https://www.archives.gov/research/still-pictures/highlights/uss-arizona-burning
Public-domain collection (item 127): https://www.archives.gov/research/military/ww2/photos
Ảnh được giảm kích thước và chuyển sang WebP; không cắt xén hoặc tô màu.

## Main files

Crossword: index.html, style.css, script.js, puzzle.mjs, i18n.mjs, motion.mjs.
Multiple choice: legacy.html, legacy.css, legacy.js, meaning-quiz.mjs, legacy-data.mjs.
The multiple-choice score is based on the first checked answer per question.
Progress survives mode changes and reloads in the same tab; reset affects only its own mode.
