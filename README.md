# Mini App Cấp nước Hậu Giang (bản mẫu giao diện)

Chỉ có giao diện và điều hướng giữa các màn hình, dữ liệu là dữ liệu giả.

## Chạy trên VS Code
1. Cài Node.js 18+ (https://nodejs.org).
2. VS Code: File > Open Folder... > chọn thư mục này.
3. Mở Terminal (Ctrl + `) rồi chạy:

       npm install
       npm run dev

4. Mở http://localhost:5173 (nên bật chế độ xem điện thoại: F12 > Ctrl+Shift+M).
   Có thể mở bằng điện thoại cùng Wi-Fi qua địa chỉ "Network" mà terminal in ra.

## Cấu trúc
- src/pages/HomePage.tsx          Màn 1 – Trang chủ
- src/pages/LinkPage.tsx          Màn 2 – Liên kết mã khách hàng
- src/pages/BillsPage.tsx         Màn 3 – Hóa đơn & lịch sử
- src/pages/BillDetailPage.tsx    Màn 4 – Chi tiết hóa đơn
- src/pages/PaymentPage.tsx       Màn 5 – Thanh toán QR & biên nhận
- src/pages/ThongBao.tsx          Màn – Quản lý thông báo
- src/pages/SuCo.tsx              Màn – Quản lý sự cố
- src/pages/ThongTinTaiKhoan.tsx  Màn – Thông tin tài khoản/Profile
- src/components/                 Header, BottomNav, ui.tsx (Card, Btn, Chip, Row, Hero, Tile)
- src/data/mock.ts                Dữ liệu giả
- src/App.tsx                     Khai báo đường dẫn (routes)

Các màn hình hiện dùng dữ liệu mẫu trong `src/data/mock.ts`. Khi backend cung cấp API, frontend có thể thay nguồn dữ liệu mẫu bằng các lời gọi API tương ứng.
