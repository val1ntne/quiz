# Thế chiến II — Giải mã lịch sử / World War II — Decode history

Trang ô chữ song ngữ Việt–Anh, chạy bằng HTML, CSS và JavaScript.

## Đưa lên GitHub Pages

1. Giải nén gói này.
2. Upload các tệp và thư mục assets vào thư mục gốc của repo. index.html phải nằm ngoài cùng.
3. Vào Settings → Pages, chọn Deploy from a branch, nhánh main và thư mục /(root), rồi Save.
4. Mở địa chỉ GitHub Pages do GitHub hiển thị sau khi triển khai xong.

Khi cập nhật repo cũ, thay các tệp cùng tên bằng bản mới. Bản này không sử dụng video hoặc hình nhân vật.

## Chơi và chuyển ngôn ngữ

- Chọn VI hoặc EN ở góc trên. Mỗi ngôn ngữ có một ô chữ và bảy câu hỏi riêng.
- Đáp án và gợi ý của từng ngôn ngữ được giữ riêng trong lần mở trang hiện tại.
- Chơi lại chỉ xóa lượt chơi của ngôn ngữ đang chọn. Tải lại trang bắt đầu lượt chơi mới.
- Tùy chọn ngôn ngữ được ghi nhớ nếu trình duyệt cho phép lưu trữ cục bộ.
- Điền đáp án rồi nhấn Enter. Các biến thể đáp án được chấp nhận nằm trong puzzle.mjs.
- Hiệu ứng chuyển động tự giảm theo tùy chọn giảm chuyển động của hệ điều hành.

## Chạy trên máy

Mở thư mục trong VS Code và dùng Live Server, hoặc chạy một máy chủ HTTP cục bộ.
Không mở index.html qua file:// vì JavaScript dùng ES modules.

## Tệp chính

- index.html: cấu trúc trang
- style.css: giao diện và bố cục thích ứng
- script.js: tương tác, chuyển ngôn ngữ và tiến độ trong phiên
- puzzle.mjs: dữ liệu và logic của hai ô chữ
- i18n.mjs: bản dịch giao diện
- assets/favicon.svg: biểu tượng trang

Font Be Vietnam Pro được tải từ Google Fonts; trình duyệt dùng font dự phòng nếu không có kết nối.
Không cần cài npm hoặc chạy build. Gói này không có âm thanh hay video.

## English

Upload the extracted contents to the repository root, then enable GitHub Pages from main / (root).
VI and EN each offer a separate, fully playable crossword. Switching languages preserves both puzzles
for the current visit. Reloading starts a new session; only the language preference is remembered.


## Ảnh tư liệu và hiệu ứng / Archival photo and motion

Dấu chỉ hàng đang chọn di chuyển theo câu hỏi. Bảy phân đoạn tiến độ được tô dần.
Khi hoàn thành, cột từ khóa được nhấn lần lượt từ trên xuống trước khi mở kết quả.
Đổi ngôn ngữ, đổi hàng hoặc mở hộp thoại sẽ ngắt phần trình diễn đang chạy.
Nút mở thông điệp cho phép chạy lại phần trình diễn nếu đã ngắt trước đó.

Ảnh USS Arizona chỉ xuất hiện sau khi giải đúng câu Trân Châu Cảng / Pearl Harbor.
Ảnh gốc: USS Arizona burning after the attack on Pearl Harbor, 7 December 1941.
Credit: US National Archives, 80-G-32420; National Archives Identifier 520601.
Source: https://www.archives.gov/research/still-pictures/highlights/uss-arizona-burning
Original image: https://www.archives.gov/files/research/still-pictures/080-g-0032420-28-1274m.jpg
Public-domain collection (item 127): https://www.archives.gov/research/military/ww2/photos
Ảnh được giảm kích thước và chuyển sang WebP; không cắt xén hoặc tô màu.

motion.mjs quản lý chuyển động, ngắt hoạt ảnh và chế độ giảm chuyển động.
