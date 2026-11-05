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
      <div className="px-4 pb-24 space-y-3">
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
          <div className="flex items-center justify-between gap-2">
            <b className="flex items-center gap-2"><BieuTuong ten="hoaDon" className="h-5 w-5 text-blue-600" />Bảng kê tiền nước</b>
            <span className="rounded-full bg-sky-100 px-2 py-1 text-[10px] font-semibold text-sky-700">Giá mẫu</span>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[330px] text-left text-xs">
              <thead className="border-b border-slate-200 text-slate-500">
                <tr>
                  <th scope="col" className="pb-2 pr-2 font-medium">Bậc giá</th>
                  <th scope="col" className="pb-2 px-2 text-right font-medium">Sản lượng</th>
                  <th scope="col" className="pb-2 px-2 text-right font-medium">Đơn giá</th>
                  <th scope="col" className="pb-2 pl-2 text-right font-medium">Tiền nước</th>
                </tr>
              </thead>
              <tbody>
                {hoaDon.bangKeBacGia.map((bacGia) => (
                  <tr key={bacGia.bac} className="border-b border-slate-100">
                    <th scope="row" className="py-2 pr-2 font-medium text-slate-700">{bacGia.bac}</th>
                    <td className="px-2 py-2 text-right text-slate-700">{bacGia.sanLuong} m³</td>
                    <td className="px-2 py-2 text-right text-slate-700">{bacGia.donGia.toLocaleString('vi-VN')}đ</td>
                    <td className="py-2 pl-2 text-right font-semibold text-slate-900">{bacGia.thanhTien.toLocaleString('vi-VN')}đ</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row" colSpan={3} className="pt-2 text-left font-semibold text-slate-700">Tiền nước theo giá mẫu</th>
                  <td className="pt-2 text-right font-bold text-[#124b84]">
                    {hoaDon.bangKeBacGia.reduce((tong, bacGia) => tong + bacGia.thanhTien, 0).toLocaleString('vi-VN')}đ
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-2 text-[11px] leading-4 text-slate-500">
            Đơn giá 6.800đ/m³ dùng để minh họa giao diện; tổng hóa đơn bên dưới vẫn lấy từ dữ liệu mẫu hiện tại.
          </p>
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
