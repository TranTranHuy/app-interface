import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import BieuTuong, { type TenBieuTuong } from '../components/BieuTuong'
import { Btn, Card, Chip, Row } from '../components/ui'
import { danhSachHoaDon, thongTinKhachHang } from '../data/mock'

const cacPhuongThucThanhToan: { icon: TenBieuTuong; name: string }[] = [
  { icon: 'hoaDon', name: 'QR/VietQR' },
  { icon: 'theNganHang', name: 'Thẻ ngân hàng' },
  { icon: 'viDienTu', name: 'Ví điện tử' },
  { icon: 'nganHang', name: 'Internet Banking' },
]

export default function ChiTietHoaDon() {
  const [phuongThucDangChon, datPhuongThucDangChon] = useState(0)
  const [thamSoTimKiem] = useSearchParams()
  const kyHoaDon = thamSoTimKiem.get('period')
  const hoaDon = danhSachHoaDon.find((muc) => muc.thang === kyHoaDon) ?? danhSachHoaDon[0]
  const ngayPhatHanh = hoaDon.ngayPhatHanh.split('-').reverse().join('/')
  const soTien = Number(hoaDon.soTien.replace(/\./g, ''))
  const tienNuoc = Math.round(soTien / 1.17)
  const phiMoiTruong = Math.round(tienNuoc * 0.05)
  const phiDichVu = Math.round(tienNuoc * 0.02)
  const thueGiatriGiaTang = soTien - tienNuoc - phiMoiTruong - phiDichVu
  const duongDanThanhToan = `/pay?period=${encodeURIComponent(hoaDon.thang)}`
  return (
    <>
      <Header back="/bills" />
      <h1 className="text-center font-bold text-lg -mt-1 mb-2">Chi tiết hóa đơn</h1>
      <div className="px-4 space-y-3">
        <Card bg={hoaDon.daThanhToan ? 'bg-emerald-50' : 'bg-white'} className="flex justify-between">
          <div>
            <b className="flex items-center gap-2"><BieuTuong ten="hoaDon" className="h-6 w-6 text-blue-600" />Hóa đơn tiền nước</b>
            <div className="text-sm">Kỳ hóa đơn: <b>{hoaDon.thang}</b></div>
            <div className="text-xs">Ngày phát hành: {ngayPhatHanh}</div>
            <div className="text-xs">{hoaDon.daThanhToan ? 'Ngày thanh toán' : 'Hạn thanh toán'}: <b className={hoaDon.daThanhToan ? 'text-emerald-700' : 'text-red-600'}>{hoaDon.ngay}</b></div>
          </div>
          <div><Chip color={hoaDon.daThanhToan ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-600'}>{hoaDon.daThanhToan ? 'Đã thanh toán' : 'Chưa thanh toán'}</Chip></div>
        </Card>

        {hoaDon.daThanhToan && (
          <Card bg="bg-emerald-100" className="flex items-center gap-3">
            <BieuTuong ten="xacNhan" className="h-8 w-8 shrink-0 text-emerald-700" />
            <div>
              <b className="text-emerald-800">Hóa đơn đã được thanh toán</b>
              <p className="text-sm text-emerald-700">Thanh toán ngày {hoaDon.ngay}</p>
            </div>
          </Card>
        )}

        <Card bg="bg-sky-100">
          <b className="flex items-center gap-2"><BieuTuong ten="nguoiDung" className="h-5 w-5 text-blue-600" />{thongTinKhachHang.hoTen}</b>
          <div className="text-sm">Mã KH: {thongTinKhachHang.maKhachHang}</div>
          <div className="text-xs text-slate-600">📍 {thongTinKhachHang.diaChi}</div>
        </Card>

        <Card>
          <b className="flex items-center gap-2"><BieuTuong ten="bieuDo" className="h-5 w-5 text-blue-600" />Chỉ số và sản lượng</b>
          <div className="grid grid-cols-4 text-center text-xs mt-2 gap-1">
            <div>Chỉ số cũ<b className="block text-base">{hoaDon.chiSoCu.toLocaleString('vi-VN')}</b>m³</div>
            <div>Chỉ số mới<b className="block text-base">{hoaDon.chiSoMoi.toLocaleString('vi-VN')}</b>m³</div>
            <div>Ngày ghi<b className="block text-sm mt-1">{hoaDon.ngayGhi}</b></div>
            <div>Tiêu thụ<b className="block text-base">{hoaDon.sanLuong}</b>m³</div>
          </div>
        </Card>

        <Card>
          <b className="flex items-center gap-2"><BieuTuong ten="hoaDon" className="h-5 w-5 text-blue-600" />Chi tiết thanh toán</b>
          <Row a={`Tiền nước (${hoaDon.sanLuong} m³)`} b={`${tienNuoc.toLocaleString('vi-VN')}đ`} />
          <Row a="Phí bảo vệ môi trường (5%)" b={`${phiMoiTruong.toLocaleString('vi-VN')}đ`} />
          <Row a="Phí dịch vụ (2%)" b={`${phiDichVu.toLocaleString('vi-VN')}đ`} />
          <Row a="Thuế GTGT" b={`${thueGiatriGiaTang.toLocaleString('vi-VN')}đ`} />
          <div className={`flex justify-between items-center rounded-lg p-2 mt-1 ${hoaDon.daThanhToan ? 'bg-emerald-50' : 'bg-blue-50'}`}>
            <b>Tổng cộng</b>
            <b className="text-xl">{hoaDon.soTien}đ</b>
          </div>
        </Card>

        {!hoaDon.daThanhToan && (
          <>
            <Card>
              <b className="flex items-center gap-2"><BieuTuong ten="thanhToan" className="h-5 w-5 text-blue-600" />Chọn phương thức thanh toán</b>
              <div className="grid grid-cols-4 gap-2 mt-2 text-center text-[11px]">
                {cacPhuongThucThanhToan.map((phuongThuc, viTri) => (
                  <button key={phuongThuc.name} onClick={() => datPhuongThucDangChon(viTri)} className={`rounded-xl p-2 border ${phuongThucDangChon === viTri ? 'border-blue-600 bg-blue-50' : 'border-slate-200'}`}>
                    <BieuTuong ten={phuongThuc.icon} className="mx-auto h-6 w-6 text-blue-600" />
                    {phuongThuc.name}
                  </button>
                ))}
              </div>
            </Card>
            <Btn to={duongDanThanhToan}><BieuTuong ten="thanhToan" className="h-5 w-5" />Thanh toán ngay <span aria-hidden="true">›</span></Btn>
          </>
        )}
      </div>
    </>
  )
}
