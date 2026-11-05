import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import BieuTuong from '../components/BieuTuong'
import { Btn, Card, Hero, Row } from '../components/ui'
import { thongTinKhachHang } from '../data/mock'

export default function LienKetKhachHang() {
  const chuyenTrang = useNavigate()
  const [daTraCuu, datDaTraCuu] = useState(false)
  const [daXacNhan, datDaXacNhan] = useState(false)

  return (
    <>
      <Header back="/" />
      <Hero title="Liên kết mã khách hàng" sub="Liên kết để tra cứu, thanh toán hóa đơn nhanh chóng, chính xác." />
      <div className="px-4 space-y-3">
        <Card className="p-4 space-y-3">
          <label className="block text-sm font-semibold">
            Mã khách hàng
            <input className="mt-1 w-full border border-slate-300 rounded-lg p-2.5 font-normal" defaultValue={thongTinKhachHang.maKhachHang} />
          </label>
          <label className="block text-sm font-semibold">
            Số điện thoại
            <input className="mt-1 w-full border border-slate-300 rounded-lg p-2.5 font-normal" defaultValue={thongTinKhachHang.soDienThoaiHienThi} />
          </label>
          <Btn onClick={() => datDaTraCuu(true)}><BieuTuong ten="timKiem" className="h-5 w-5" />Tra cứu thông tin <span aria-hidden="true">›</span></Btn>
        </Card>

        {daTraCuu && (
          <Card className="p-4">
            <b className="text-emerald-600">✔ Thông tin khách hàng</b>
            <div className="bg-blue-50 rounded-lg px-3 mt-2">
              <Row a="Họ tên" b={thongTinKhachHang.hoTen} />
              <Row a="Địa chỉ" b={thongTinKhachHang.diaChi} />
              <Row a="Loại khách hàng" b={thongTinKhachHang.loaiKhachHang} />
              <Row a="Trạng thái" b={thongTinKhachHang.trangThai} className="text-emerald-600" />
            </div>
            <label className="flex gap-2 text-sm mt-3">
              <input type="checkbox" checked={daXacNhan} onChange={(suKien) => datDaXacNhan(suKien.target.checked)} />
              Tôi xác nhận các thông tin trên là đúng và đồng ý liên kết mã khách hàng này với tài khoản Zalo.
            </label>
            <Btn className="mt-3" disabled={!daXacNhan} onClick={() => chuyenTrang('/')}><BieuTuong ten="lienKet" className="h-5 w-5" />Liên kết ngay <span aria-hidden="true">›</span></Btn>
          </Card>
        )}
        <p className="flex items-start gap-2 text-xs text-slate-500"><BieuTuong ten="khoa" className="mt-0.5 h-4 w-4 shrink-0" />Thông tin của bạn được bảo mật và chỉ dùng cho mục đích tra cứu, thanh toán hóa đơn.</p>
      </div>
    </>
  )
}
