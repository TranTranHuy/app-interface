import { useState } from 'react'
import Header from '../components/Header'
import BieuTuong from '../components/BieuTuong'
import { Btn, Card, Chip, Hero, Tile } from '../components/ui'

export default function DichVu() {
  const [daGuiYeuCau, datDaGuiYeuCau] = useState(false)
  return (
    <>
      <Header back="/" />
      <Hero title="Dịch vụ & CSKH" sub="Luôn đồng hành cùng bạn" icon="hop" />
      <div className="px-4 space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Tile icon="suaChua" title="Báo sự cố nước yếu/rò rỉ" sub="Gửi yêu cầu xử lý" to="/incidents" color="bg-red-100" />
          <Tile icon="them" title="Đăng ký lắp mới" sub="Hộ gia đình, doanh nghiệp" to="/service" color="bg-emerald-100" />
          <Tile icon="loa" title="Phản ánh/kiến nghị" sub="Về chất lượng dịch vụ" to="/service" color="bg-violet-100" />
          <Tile icon="hoTro" title="Liên hệ CSKH" sub="Tư vấn, hỗ trợ" to="/service" color="bg-blue-100" />
        </div>

        <Card className="p-4 space-y-2">
          <b className="flex items-center gap-2"><BieuTuong ten="hoaDon" className="h-5 w-5 text-blue-600" />Gửi yêu cầu dịch vụ</b>
          <textarea rows={3} maxLength={500} placeholder="Nhập nội dung phản ánh, kiến nghị..." className="w-full border border-slate-300 rounded-lg p-2.5 text-sm" />
          <input placeholder="Địa chỉ (số nhà, đường, phường, TP. Vị Thanh...)" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm" />
          <div className="flex items-center gap-2 text-xs text-slate-500"><BieuTuong ten="them" className="h-4 w-4" />Chọn ảnh – tối đa 5 ảnh, ≤ 5MB (JPG, PNG, HEIC)</div>
          <Btn onClick={() => datDaGuiYeuCau(true)}><BieuTuong ten="lienKet" className="h-5 w-5" />Gửi yêu cầu</Btn>
          {daGuiYeuCau && <div className="text-sm text-emerald-600 text-center">✔ Đã gửi yêu cầu (demo)</div>}
        </Card>

        <Card>
          <div className="flex justify-between">
            <b className="flex items-center gap-2"><BieuTuong ten="dongHo" className="h-5 w-5 text-blue-600" />Yêu cầu gần đây</b>
            <span className="text-blue-600 text-sm">Xem tất cả ›</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100 text-sm">
            <div><b>Báo sự cố nước yếu</b><div className="text-xs text-slate-500">#DV202610200001 · Đường Nguyễn Văn Cừ</div></div>
            <div><Chip color="bg-orange-100 text-orange-600">Đang xử lý</Chip></div>
          </div>
          <div className="flex justify-between py-2 text-sm">
            <div><b>Đăng ký lắp mới</b><div className="text-xs text-slate-500">#DV202610180002 · Đường Trần Hưng Đạo</div></div>
            <div><Chip color="bg-blue-100 text-blue-600">Đã tiếp nhận</Chip></div>
          </div>
        </Card>
      </div>
    </>
  )
}
