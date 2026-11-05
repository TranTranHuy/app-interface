import { Btn, Card } from '../components/ui'
import BieuTuong, { type TenBieuTuong } from '../components/BieuTuong'
import { taiKhoanDemo } from '../xacThuc'
import { thongTinKhachHang } from '../data/mock'

const cacBuocHuongDan: { icon: TenBieuTuong; title: string; description: string }[] = [
  { icon: 'khoa', title: 'Đăng nhập', description: 'Nhập số điện thoại và mật khẩu demo ở màn hình đăng nhập để vào ứng dụng.' },
  { icon: 'hoaDon', title: 'Xem hóa đơn', description: 'Chọn Hóa đơn để xem kỳ cần thanh toán, lịch sử và chi tiết hóa đơn.' },
  { icon: 'thanhToan', title: 'Thanh toán', description: 'Mở chi tiết hóa đơn, chọn phương thức thanh toán. Bản demo chỉ mô phỏng kết quả thanh toán.' },
  { icon: 'bieuDo', title: 'Theo dõi và gửi yêu cầu', description: 'Dùng mục Sử dụng nước để xem dữ liệu mẫu, hoặc vào Dịch vụ để thử gửi phản ánh.' },
]

export default function HuongDanSuDung() {
  return (
    <main className="flex flex-1 flex-col px-4 py-6">
      <header className="mb-4 text-center">
        <div className="text-4xl">📖</div>
        <h1 className="mt-2 text-2xl font-bold">Hướng dẫn sử dụng</h1>
        <p className="mt-1 text-sm text-slate-600">Các bước làm quen với Mini App Cấp nước Hậu Giang</p>
      </header>

      <div className="space-y-3">
        {cacBuocHuongDan.map((buoc, viTri) => (
          <Card key={buoc.title} className="flex gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sky-100">
              <BieuTuong ten={buoc.icon} className="h-5 w-5 text-blue-700" />
            </span>
            <div>
              <h2 className="font-semibold">{viTri + 1}. {buoc.title}</h2>
              <p className="text-sm text-slate-600">{buoc.description}</p>
            </div>
          </Card>
        ))}
      </div>

      <p className="my-4 text-center text-xs text-slate-500">
        Tài khoản demo: {thongTinKhachHang.soDienThoaiHienThi} · Mật khẩu: {taiKhoanDemo.matKhau}
      </p>
      <Btn to="/login" className="mt-auto">Quay lại đăng nhập</Btn>
    </main>
  )
}
