import Header from '../components/Header'
import { Btn, Card, Chip, Tile } from '../components/ui'

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col gap-3 px-4 md:px-8">
        <Card to="/link" bg="bg-sky-100" className="flex items-center gap-3">
          <span className="w-12 h-12 rounded-full bg-white grid place-items-center text-2xl">👤</span>
          <div className="flex-1">
            <div className="text-xs text-slate-600">Xin chào,</div>
            <div className="font-bold text-lg">Nguyễn Văn An</div>
            <div className="text-xs text-slate-600">Mã KH: HG0123456</div>
          </div>
          <span className="text-4xl">💧</span>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm font-medium">📄 Tiền nước tháng 10/2026</div>
              <div className="text-3xl font-extrabold mt-1">186.500<sup>đ</sup></div>
            </div>
            <Chip color="bg-orange-100 text-orange-600">Chưa thanh toán</Chip>
          </div>
          <div className="text-sm mt-2 mb-3">
            Hạn thanh toán: <b className="text-red-600">25/10/2026</b>
          </div>
          <Btn to="/bills/detail">💳 Thanh toán ngay ›</Btn>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Tile icon="📘" title="Hóa đơn" sub="Tra cứu và xem lịch sử" to="/bills" color="bg-blue-100" />
          <Tile icon="💳" title="Thanh toán" sub="Thanh toán tiền nước" to="/bills/detail" color="bg-emerald-100" />
          <Tile icon="📊" title="Sử dụng nước" sub="Theo dõi sản lượng" to="/usage" color="bg-cyan-100" />
          <Tile icon="🎧" title="CSKH" sub="Liên hệ, phản ánh" to="/service" color="bg-indigo-100" />
        </div>

        <Card to="/notifications" bg="bg-red-50">
          <div className="flex justify-between">
            <b className="text-red-600">📢 Thông báo tạm ngưng cấp nước</b>
            <Chip color="bg-orange-100 text-orange-600">Mới</Chip>
          </div>
          <p className="text-sm text-slate-600 mt-1">Tạm ngưng cấp nước tại một số khu vực phường Vị Thanh để bảo trì hệ thống.</p>
          <p className="text-xs mt-1">🗓 Từ 22:00 20/10/2026 đến 05:00 21/10/2026</p>
        </Card>

        <div className="flex-1 flex items-center justify-center min-h-[8rem] rounded-2xl bg-gradient-to-r from-sky-200 to-emerald-100 p-6 text-center italic font-semibold text-blue-700">
          Nước sạch Hậu Giang – Cho cuộc sống xanh hơn
        </div>
      </div>
    </>
  )
}