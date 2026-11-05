import { useState } from 'react'
import Header from '../components/Header'
import BieuTuong from '../components/BieuTuong'
import { Btn, Card, Chip, Row } from '../components/ui'
import { thongTinKhachHang } from '../data/mock'

export default function ThanhToan() {
  const [daThanhToan, datDaThanhToan] = useState(false)
  return (
    <>
      <Header back="/bills/detail" />
      <div className="px-4 space-y-3">
        <Card>
          <b className="flex items-center gap-2"><BieuTuong ten="thanhToan" className="h-5 w-5 text-blue-600" />Thanh toán tiền nước</b>
          <div className="bg-blue-50 rounded-lg px-3 mt-2">
            <Row a="Mã khách hàng" b={thongTinKhachHang.maKhachHang} />
            <Row a="Kỳ hóa đơn" b="10/2026" />
            <Row a="Số tiền thanh toán" b="186.500đ" className="text-xl" />
          </div>
        </Card>

        <Card className="p-4 text-center">
          <b>Quét mã để thanh toán</b>
          <p className="text-xs text-slate-500 mb-3">Dùng ứng dụng ngân hàng / ví điện tử để quét mã VietQR</p>
          <div
            className="w-40 h-40 mx-auto rounded-lg border-8 border-white outline outline-2 outline-blue-600"
            style={{ background: 'conic-gradient(#000 25%,#fff 0 50%,#000 0 75%,#fff 0) 0 0/20px 20px' }}
          />
          <div className="font-extrabold text-red-600 mt-2">VIETQR</div>
          <Chip color="bg-white border"><span className="inline-flex items-center gap-1"><BieuTuong ten="dongHo" className="h-4 w-4 text-red-600" />Hiệu lực trong <b className="text-red-600">10 phút</b></span></Chip>
        </Card>

        <Card>
          <b>Hướng dẫn thanh toán</b>
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] mt-2">
            <div><BieuTuong ten="theNganHang" className="mx-auto mb-1 h-6 w-6 text-blue-600" />Mở ứng dụng ngân hàng, chọn quét mã QR</div>
            <div><BieuTuong ten="xacNhan" className="mx-auto mb-1 h-6 w-6 text-emerald-600" />Kiểm tra thông tin và xác nhận</div>
            <div><BieuTuong ten="hoaDon" className="mx-auto mb-1 h-6 w-6 text-blue-600" />Nhận thông báo thanh toán thành công</div>
          </div>
        </Card>

        {daThanhToan ? (
          <Card bg="bg-emerald-50">
            <b className="text-emerald-600 text-lg">✔ Thanh toán thành công</b>
            <div className="text-sm mb-1">Cảm ơn Quý khách đã thanh toán tiền nước!</div>
            <Row a="Mã giao dịch" b="FT26102026123456" />
            <Row a="Thời gian thanh toán" b="20/10/2026 14:32" />
            <Row a="Số tiền" b="186.500đ" />
            <Row a="Nội dung" b="Thanh toán tiền nước kỳ 10/2026" />
            <Btn to="/bills" className="mb-2 mt-2"><BieuTuong ten="hoaDon" className="h-5 w-5" />Xem biên nhận <span aria-hidden="true">›</span></Btn>
            <Btn to="/" outline><BieuTuong ten="trangChu" className="h-5 w-5" />Về trang chủ</Btn>
          </Card>
        ) : (
          <Btn onClick={() => datDaThanhToan(true)}>Giả lập: đã thanh toán xong</Btn>
        )}
      </div>
    </>
  )
}
