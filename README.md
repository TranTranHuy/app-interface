# Mini App Cấp nước Hậu Giang (bản mẫu giao diện)

Chỉ có giao diện và điều hướng giữa các màn hình, dữ liệu là dữ liệu giả.

## Đăng nhập demo
- Khi chưa đăng nhập, ứng dụng sẽ mở màn hình đăng nhập trước.
- Tên đăng nhập demo: `0912 345 678` hoặc mã khách hàng `HG0123456`; mật khẩu: `123456`.
- Chọn **Ghi nhớ tôi** để giữ trạng thái đăng nhập trên trình duyệt; nếu bỏ chọn, trạng thái chỉ tồn tại trong phiên tab hiện tại.
- Chức năng xác thực chưa kết nối API Wasspro; trạng thái ghi nhớ trong bản demo không phải token xác thực.
- Chọn **Hướng dẫn sử dụng** bên dưới form đăng nhập để xem hướng dẫn các chức năng.
- Logo lấy từ website Cấp nước Hậu Giang: [nuocsachhaugiang.com.vn](https://nuocsachhaugiang.com.vn/).

## Chạy trên VS Code
1. Cài Node.js 18+ (https://nodejs.org).
2. VS Code: File > Open Folder... > chọn thư mục này.
3. Mở Terminal (Ctrl + `) rồi chạy:

       npm install
       npm run dev

4. Mở http://localhost:5173 (nên bật chế độ xem điện thoại: F12 > Ctrl+Shift+M).
   Có thể mở bằng điện thoại cùng Wi-Fi qua địa chỉ "Network" mà terminal in ra.

## Cấu trúc
- src/pages/TrangChu.tsx          Màn 1 – Trang chủ
- src/pages/LienKetKhachHang.tsx  Màn 2 – Liên kết mã khách hàng
- src/pages/HoaDon.tsx            Màn 3 – Hóa đơn & lịch sử
- src/pages/ChiTietHoaDon.tsx     Màn 4 – Chi tiết hóa đơn
- src/pages/ThanhToan.tsx         Màn 5 – Thanh toán QR & biên nhận
- src/pages/ThongBao.tsx          Màn 6 – Thông báo
- src/pages/LichSuSuDungNuoc.tsx  Màn 7 – Lịch sử sử dụng nước
- src/pages/DichVu.tsx            Màn 8 – Dịch vụ & CSKH
- src/pages/CanhBaoBatThuong.tsx  Màn 9 – Cảnh báo tiêu thụ bất thường
- src/pages/DangNhap.tsx          Màn đăng nhập demo
- src/pages/HuongDanSuDung.tsx    Hướng dẫn sử dụng
- src/pages/KhaiBaoChiSoNuoc.tsx Màn khai báo chỉ số nước (demo)
- src/pages/SuCo.tsx              Quản lý sự cố
- src/pages/ThongTinTaiKhoan.tsx  Thông tin tài khoản/Profile
- src/components/                 Header, BottomNav, ui.tsx (Card, Btn, Chip, Row, Hero, Tile)
- src/components/PageBanner.tsx   Banner tiêu đề cho các trang
- src/data/mock.ts                Dữ liệu giả
- src/xacThuc.ts                  Thông tin đăng nhập demo
- src/App.tsx                     Khai báo đường dẫn (routes)

Các màn hình hiện dùng dữ liệu mẫu. Chỉ thay bằng API sau khi nhận endpoint, cấu trúc dữ liệu và hướng dẫn xác thực từ bên cung cấp.
