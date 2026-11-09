import { useRef, useState, useSyncExternalStore } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { QRCodeCanvas } from 'qrcode.react'
import Header from '../components/Header'
import BieuTuong from '../components/BieuTuong'
import { Card, Row } from '../components/ui'
import { danhSachHoaDon, thongTinKhachHang } from '../data/mock'
import {
  capNhatThanhToanDemo,
  dangKyThayDoiThanhToanDemo,
  layDanhSachThanhToanDemo,
  type KetQuaThanhToanDemo,
} from '../data/trangThaiThanhToanDemo'

const danhSachNganHang = [
  { id: 'agribank', ten: 'Agribank', logo: '/banks/agribank.png' },
  { id: 'vnpt', ten: 'VNPT Money', logo: '/banks/vnpt.png' },
  { id: 'vnpay', ten: 'VNPay', logo: '/banks/vnpay.png' },
  { id: 'momo', ten: 'MoMo', logo: '/banks/momo.png' },
  { id: 'zalopay', ten: 'ZaloPay', logo: '/banks/zalopay.png' },
  { id: 'vietinbank', ten: 'VietinBank', logo: '/banks/vietinbank.png' },
  { id: 'viettel', ten: 'Viettel', logo: '/banks/viettel.png' },
  { id: 'payoo', ten: 'Payoo', logo: '/banks/payoo.png' },
]

const thongTinTrangThaiDemo: Record<
  KetQuaThanhToanDemo,
  { nhan: string; moTa: string; mau: string; icon: 'dongHo' | 'xacNhan' | 'canhBao' }
> = {
  waiting: {
    nhan: 'Đang chờ xác nhận',
    moTa: 'Giao dịch chưa được xác nhận. Hãy kiểm tra lại sau ít phút.',
    mau: 'bg-amber-50 text-amber-800',
    icon: 'dongHo',
  },
  success: {
    nhan: 'Thành công (mô phỏng)',
    moTa: 'Trạng thái hóa đơn đã cập nhật trong phiên demo, không phải xác nhận thanh toán thật.',
    mau: 'bg-emerald-50 text-emerald-800',
    icon: 'xacNhan',
  },
  failed: {
    nhan: 'Giao dịch thất bại (mô phỏng)',
    moTa: 'Giao dịch demo chưa thành công. Hóa đơn vẫn chưa được thanh toán.',
    mau: 'bg-rose-50 text-rose-800',
    icon: 'canhBao',
  },
  expired: {
    nhan: 'Mã thanh toán hết hạn (mô phỏng)',
    moTa: 'Mã demo đã hết hạn. Có thể tạo lại mã trong luồng tích hợp thật.',
    mau: 'bg-orange-50 text-orange-800',
    icon: 'dongHo',
  },
  connection_error: {
    nhan: 'Không thể kiểm tra trạng thái',
    moTa: 'Lỗi kết nối không đồng nghĩa giao dịch thất bại. Hãy thử kiểm tra lại.',
    mau: 'bg-rose-50 text-rose-800',
    icon: 'canhBao',
  },
}

function formatCurrency(amount: number): string {
  return `${amount.toLocaleString('vi-VN')}đ`
}

export default function ThanhToan() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const thanhToanDemo = useSyncExternalStore(
    dangKyThayDoiThanhToanDemo,
    layDanhSachThanhToanDemo,
    layDanhSachThanhToanDemo,
  )
  const [thongBaoKiemTra, setThongBaoKiemTra] = useState('')
  const [thongBaoTienIch, setThongBaoTienIch] = useState('')
  const qrCanvasRef = useRef<HTMLCanvasElement>(null)
  const kyHoaDon = searchParams.get('period')
  const hoaDon = danhSachHoaDon.find((item) => item.thang === kyHoaDon)
  const [nganHangDangChon, setNganHangDangChon] = useState<string>('vnpay')

  if (!hoaDon) {
    return (
      <>
        <Header back="/bills" />
        <main className="invoice-readable space-y-3 px-4 pb-24">
          <Card bg="bg-amber-50">
            <h1 className="font-semibold text-amber-900">Không tìm thấy hóa đơn</h1>
            <p className="mt-1 text-sm text-amber-800">Vui lòng quay lại danh sách và chọn hóa đơn cần thanh toán.</p>
          </Card>
          <button
            type="button"
            onClick={() => navigate('/bills')}
            className="min-h-11 w-full rounded-full bg-[#087fc4] px-4 text-sm font-semibold text-white"
          >
            Quay lại danh sách hóa đơn
          </button>
        </main>
      </>
    )
  }

  const soTien = Number(hoaDon.soTien.replace(/\./g, ''))
  const soHoaDon = hoaDon.soHoaDon
  const kyHoaDonHienTai = hoaDon.thang
  const giaoDichDemo = thanhToanDemo[soHoaDon]
  const duongDanChiTiet = `/bills/detail?period=${encodeURIComponent(kyHoaDonHienTai)}`
  const trangThaiDemo =
    hoaDon.daThanhToan
      ? 'success'
      : (giaoDichDemo?.trangThai ?? 'waiting')
  const thongTinTrangThai = hoaDon.daThanhToan
    ? {
        ...thongTinTrangThaiDemo.success,
        nhan: 'Đã thanh toán (dữ liệu mẫu)',
        moTa: 'Trạng thái này có sẵn trong dữ liệu hóa đơn mẫu.',
      }
    : thongTinTrangThaiDemo[trangThaiDemo]
  const tenNganHangDangChon = danhSachNganHang.find(n => n.id === nganHangDangChon)?.ten || ''
  const noiDungQrDemo = `BANK: AGRIBANK | STK: 5500201098765 | TEN: CONG TY CO PHAN CAP THOAT NUOC HAU GIANG | SO TIEN: ${soTien} | NOI DUNG: TT TIEN NUOC ${hoaDon.thang.replace('/', '')} ${soHoaDon}`

  function chonTrangThaiDemo(trangThai: KetQuaThanhToanDemo) {
    capNhatThanhToanDemo(soHoaDon, trangThai)
    setThongBaoKiemTra('')
  }

  function xemBienNhanDemo() {
    if (trangThaiDemo !== 'success' || !giaoDichDemo?.maGiaoDich || !giaoDichDemo.thoiGianThanhToan) return

    navigate(`/payment/receipt?period=${encodeURIComponent(kyHoaDonHienTai)}`)
  }

  function kiemTraLaiDemo() {
    if (trangThaiDemo === 'waiting') {
      setThongBaoKiemTra('Đã kiểm tra mô phỏng: giao dịch vẫn đang chờ xác nhận.')
      return
    }

    chonTrangThaiDemo('waiting')
    setThongBaoKiemTra('Đã thử lại trong mô phỏng. Trạng thái đang chờ xác nhận.')
  }

  function luuAnhQr() {
    const canvas = qrCanvasRef.current
    if (!canvas) {
      setThongBaoTienIch('Không thể tạo ảnh QR. Vui lòng thử lại.')
      return
    }

    const link = document.createElement('a')
    link.download = `qr-demo-${soHoaDon}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    setThongBaoTienIch('Đã tải ảnh QR minh họa. Ảnh này không dùng để thanh toán.')
  }

  async function saoChepThongTinDemo(kyHoaDon: string) {
    const noiDungSaoChep = [
      'THÔNG TIN DEMO - KHÔNG DÙNG ĐỂ CHUYỂN TIỀN THẬT',
      'Ngân hàng: Agribank - Chi nhánh Hậu Giang',
      'Số tài khoản: 5500201098765',
      'Chủ tài khoản: CONG TY CO PHAN CAP THOAT NUOC HAU GIANG',
      `Số tiền: ${soTien} VND`,
      `Nội dung: TT TIEN NUOC ${kyHoaDon} ${soHoaDon}`,
    ].join('\n')

    try {
      await navigator.clipboard.writeText(noiDungSaoChep)
      setThongBaoTienIch('Đã sao chép thông tin demo. Không dùng để chuyển khoản thật.')
    } catch {
      setThongBaoTienIch('Không thể sao chép. Trình duyệt có thể chưa cấp quyền clipboard.')
    }
  }

  return (
    <>
      <Header back={duongDanChiTiet} title="Thanh toán hóa đơn" />
      <main className="invoice-readable space-y-3 px-4 pb-24">
        <Card className="overflow-hidden !p-0">
          <div className="bg-gradient-to-r from-[#087fc4] to-[#19a8f5] px-4 py-3 text-white">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <BieuTuong ten="thanhToan" className="h-5 w-5" />
              Thanh toán hóa đơn tiền nước
            </div>
          </div>
          <div className="px-4 py-3">
            <Row a="Khách hàng" b={thongTinKhachHang.hoTen} />
            <Row a="Mã khách hàng" b={thongTinKhachHang.maKhachHang} />
            <Row a="Số hóa đơn" b={hoaDon.soHoaDon} />
            <Row a="Kỳ hóa đơn" b={hoaDon.thang} />
            <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-sm text-slate-600">Tổng thanh toán</span>
              <b className="text-2xl text-[#124b84]">{formatCurrency(soTien)}</b>
            </div>
          </div>
        </Card>

        {/* <Card className="!p-4">
          <div className="text-center">
            <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-sky-100 text-[#087fc4]">
              <BieuTuong ten="hoaDon" className="h-5 w-5" />
            </span>
            <h1 className="mt-2 font-semibold text-slate-900">Thanh toán bằng VietQR</h1>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Đây là QR minh họa để thử giao diện, không phải mã chuyển khoản.
            </p>
          </div>

          <div className="mx-auto mt-4 grid w-52 max-w-full place-items-center rounded-2xl border border-sky-100 bg-white p-3">
            <QRCodeCanvas
              ref={qrCanvasRef}
              value={noiDungQrDemo}
              size={184}
              level="M"
              marginSize={4}
              title="QR minh họa, không dùng để thanh toán"
            />
          </div>

          <button
            type="button"
            onClick={luuAnhQr}
            className="mx-auto mt-3 flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#087fc4] px-4 text-sm font-semibold text-[#087fc4]"
          >
            <BieuTuong ten="luu" className="h-4 w-4" />
            Lưu ảnh QR
          </button>

          <p className="mt-2 text-center text-[11px] font-medium text-amber-700">
            QR chỉ chứa văn bản demo; quét mã sẽ không chuyển tiền.
          </p>

          <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
            <BieuTuong ten="dongHo" className="h-4 w-4 shrink-0" />
            Chưa áp dụng thời hạn vì đây không phải QR thanh toán
          </div>
        </Card> */}
                <Card className="!p-4">
          <div className="text-center mb-4">
            <h1 className="font-semibold text-slate-900 text-lg">Hình thức thanh toán</h1>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Chọn ngân hàng hoặc ví điện tử để thanh toán
            </p>
          </div>

          {/* Lưới chọn Ngân hàng / Ví điện tử */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {danhSachNganHang.map((nganHang) => (
              <button
                key={nganHang.id}
                type="button"
                onClick={() => setNganHangDangChon(nganHang.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all ${
                  nganHangDangChon === nganHang.id
                    ? 'border-[#087fc4] bg-sky-50' // Trạng thái được chọn
                    : 'border-transparent bg-white shadow-sm hover:bg-slate-50' // Trạng thái bình thường
                }`}
              >
                {/* Khung chứa Logo */}
                <div className="h-10 w-10 mb-1 flex items-center justify-center overflow-hidden rounded-md">
                  <img src={nganHang.logo} alt={nganHang.ten} className="h-full w-full object-contain" />
                </div>
                <span className="text-[11px] font-medium text-center text-slate-700 leading-tight line-clamp-2">
                  {nganHang.ten}
                </span>
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-5">
            <p className="text-center text-sm font-semibold text-slate-800 mb-3">
              Quét mã QR để thanh toán
            </p>
            
            <div className="mx-auto grid w-52 max-w-full place-items-center rounded-2xl border border-sky-100 bg-white p-3 shadow-sm">
              <QRCodeCanvas
                ref={qrCanvasRef}
                value={noiDungQrDemo}
                size={184}
                level="M"
                marginSize={4}
                title={`QR minh họa thanh toán qua ${tenNganHangDangChon}`}
              />
            </div>

            <button
              type="button"
              onClick={luuAnhQr}
              className="mx-auto mt-4 flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#087fc4] px-4 text-sm font-semibold text-[#087fc4] bg-white hover:bg-sky-50"
            >
              <BieuTuong ten="luu" className="h-4 w-4" />
              Lưu ảnh QR
            </button>

            <p className="mt-3 text-center text-[11px] font-medium text-amber-700">
              QR chỉ chứa văn bản demo; quét mã sẽ không chuyển tiền.
            </p>
          </div>
        </Card>

        {/* <Card className="!p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="font-semibold text-slate-900">Thông tin nhận tiền</h2>
              <p className="mt-0.5 text-xs text-slate-500">Sẽ được điền tự động từ phản hồi VietQR</p>
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600">Chờ API</span>
          </div>
          <div className="mt-3 divide-y divide-slate-100 rounded-lg bg-slate-50 px-3">
            <Row a="Ngân hàng" b="Chưa có dữ liệu" className="text-slate-400" />
            <Row a="Số tài khoản" b="Chưa có dữ liệu" className="text-slate-400" />
            <Row a="Chủ tài khoản" b="Chưa có dữ liệu" className="text-slate-400" />
            <Row a="Nội dung chuyển khoản" b="Sẽ sinh theo mã đơn hàng" className="text-right text-slate-400" />
          </div>
          <p className="mt-2 text-xs text-amber-700">Chưa có STK thật; nút chỉ sao chép nội dung minh họa.</p>
          <button
            type="button"
            onClick={() => void saoChepThongTinDemo()}
            className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-semibold text-slate-700"
          >
            <BieuTuong ten="lienKet" className="h-4 w-4" />
            Copy STK/Cú pháp (demo)
          </button>
        </Card> */}
                <Card className="!p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="font-semibold text-slate-900">Thông tin nhận tiền</h2>
              <p className="mt-0.5 text-xs text-slate-500">Dữ liệu demo hiển thị</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">Demo</span>
          </div>
          
          <div className="mt-3 divide-y divide-slate-100 rounded-lg bg-slate-50 px-3">
            {/* ĐÃ SỬA: Dùng Agribank cho đồng bộ với danh sách 8 ngân hàng */}
            <Row a="Ngân hàng" b="Agribank - Chi nhánh Hậu Giang" className="text-right text-slate-900" />
            <Row a="Số tài khoản" b="5500201098765" className="text-[#087fc4] font-mono tracking-wider" />
            
            {/* ĐÃ SỬA: Lấy tên công ty từ mock.ts */}
            <Row a="Chủ tài khoản" b="CONG TY CO PHAN CAP THOAT NUOC HAU GIANG" className="text-slate-900" />
            
            <Row a="Nội dung chuyển khoản" b={`TT TIEN NUOC ${hoaDon.thang.replace('/', '')} ${soHoaDon}`} className="text-right text-[#087fc4] font-semibold" />
          </div>
          
          <button
            type="button"
            // Truyền kyHoaDonHienTai (hoặc hoaDon.thang) vào đây
            onClick={() => void saoChepThongTinDemo(kyHoaDonHienTai.replace('/', ''))}
            className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <BieuTuong ten="lienKet" className="h-4 w-4" />
            Copy STK/Cú pháp (demo)
          </button>
        </Card>

        {thongBaoTienIch && (
          <p role="status" className="text-center text-xs font-medium text-slate-600">
            {thongBaoTienIch}
          </p>
        )}

        <Card className="!p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-semibold text-slate-900">Trạng thái thanh toán</h2>
            <span className="rounded-full bg-sky-100 px-2 py-1 text-[10px] font-semibold text-sky-800">
              {hoaDon.daThanhToan ? 'Dữ liệu mẫu' : 'Mô phỏng'}
            </span>
          </div>
          <div className={`mt-3 flex items-start gap-2 rounded-xl p-3 ${thongTinTrangThai.mau}`}>
            <BieuTuong ten={thongTinTrangThai.icon} className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="text-sm font-semibold">{thongTinTrangThai.nhan}</p>
              <p className="mt-1 text-xs leading-5">{thongTinTrangThai.moTa}</p>
            </div>
          </div>
          {!hoaDon.daThanhToan && trangThaiDemo !== 'success' && (
            <button
              type="button"
              onClick={kiemTraLaiDemo}
              className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-full border border-[#087fc4] px-4 text-sm font-semibold text-[#087fc4]"
            >
              <BieuTuong ten="lamMoi" className="h-4 w-4" />
              {trangThaiDemo === 'failed' || trangThaiDemo === 'expired' ? 'Thử lại (demo)' : 'Kiểm tra lại (demo)'}
            </button>
          )}
          {thongBaoKiemTra && (
            <p role="status" className="mt-2 text-center text-xs text-slate-600">
              {thongBaoKiemTra}
            </p>
          )}
          {!hoaDon.daThanhToan && trangThaiDemo === 'success' && giaoDichDemo?.maGiaoDich && (
            <button
              type="button"
              onClick={xemBienNhanDemo}
              className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#087fc4] px-4 text-sm font-semibold text-white"
            >
              <BieuTuong ten="hoaDon" className="h-5 w-5" />
              Xem biên nhận (demo)
            </button>
          )}
          {!hoaDon.daThanhToan && <details className="mt-3 border-t border-slate-100 pt-3">
            <summary className="cursor-pointer text-xs font-semibold text-slate-600">
              Chọn kết quả để thử các trạng thái
            </summary>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Cập nhật trạng thái demo trên các màn hóa đơn trong phiên hiện tại; không gọi API hay sửa dữ liệu hóa đơn gốc.
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {([
                ['waiting', 'Đang chờ'],
                ['success', 'Thành công'],
                ['failed', 'Thất bại'],
                ['expired', 'Hết hạn'],
                ['connection_error', 'Lỗi kết nối'],
              ] as const).map(([trangThai, nhan]) => (
                <button
                  key={trangThai}
                  type="button"
                  aria-pressed={trangThaiDemo === trangThai}
                  onClick={() => chonTrangThaiDemo(trangThai)}
                  className={`min-h-9 rounded-lg border px-2 text-xs font-medium ${
                    trangThaiDemo === trangThai
                      ? 'border-[#087fc4] bg-sky-50 text-[#087fc4]'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {nhan}
                </button>
              ))}
            </div>
          </details>}
        </Card>

        <Card bg="bg-sky-50" className="flex items-start gap-2 !p-3">
          <BieuTuong ten="khoa" className="mt-0.5 h-4 w-4 shrink-0 text-[#087fc4]" />
          <p className="text-xs leading-5 text-slate-600">
            QR và trạng thái chỉ phục vụ kiểm thử giao diện. Chưa kết nối ngân hàng/API; trạng thái mô phỏng không xác nhận giao dịch thật.
          </p>
        </Card>
      </main>
    </>
  )
}
