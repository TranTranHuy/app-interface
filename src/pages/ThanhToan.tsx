import { useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { QRCodeCanvas } from 'qrcode.react'
import Header from '../components/Header'
import BieuTuong from '../components/BieuTuong'
import { Card, Row } from '../components/ui'
import { danhSachHoaDon, thongTinKhachHang } from '../data/mock'

type TrangThaiThanhToanDemo = 'waiting' | 'success' | 'failed' | 'expired' | 'connection_error'

const thongTinTrangThaiDemo: Record<
  TrangThaiThanhToanDemo,
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
    moTa: 'Hệ thống demo đã trả về kết quả thành công. Trạng thái hóa đơn không được cập nhật.',
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
  const [trangThaiDaGiaLap, setTrangThaiDaGiaLap] = useState<{
    soHoaDon: string
    trangThai: TrangThaiThanhToanDemo
    maGiaoDich?: string
    thoiGianThanhToan?: string
  } | null>(null)
  const [thongBaoKiemTra, setThongBaoKiemTra] = useState('')
  const [thongBaoTienIch, setThongBaoTienIch] = useState('')
  const qrCanvasRef = useRef<HTMLCanvasElement>(null)
  const kyHoaDon = searchParams.get('period')
  const hoaDon = danhSachHoaDon.find((item) => item.thang === kyHoaDon)

  if (!hoaDon) {
    return (
      <>
        <Header back="/bills" />
        <main className="space-y-3 px-4 pb-24">
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
  const duongDanChiTiet = `/bills/detail?period=${encodeURIComponent(kyHoaDonHienTai)}`
  const trangThaiDemo =
    hoaDon.daThanhToan
      ? 'success'
      : trangThaiDaGiaLap?.soHoaDon === soHoaDon
        ? trangThaiDaGiaLap.trangThai
        : 'waiting'
  const thongTinTrangThai = hoaDon.daThanhToan
    ? {
        ...thongTinTrangThaiDemo.success,
        nhan: 'Đã thanh toán (dữ liệu mẫu)',
        moTa: 'Trạng thái này có sẵn trong dữ liệu hóa đơn mẫu.',
      }
    : thongTinTrangThaiDemo[trangThaiDemo]
  const noiDungQrDemo = `DEMO - KHONG PHAI LENH THANH TOAN | Hoa don ${hoaDon.soHoaDon} | ${soTien} VND`

  function chonTrangThaiDemo(trangThai: TrangThaiThanhToanDemo) {
    setTrangThaiDaGiaLap({
      soHoaDon,
      trangThai,
      ...(trangThai === 'success'
        ? {
            maGiaoDich: `DEMO-${soHoaDon}-${Date.now()}`,
            thoiGianThanhToan: new Date().toISOString(),
          }
        : {}),
    })
    setThongBaoKiemTra('')
  }

  function xemBienNhanDemo() {
    if (trangThaiDemo !== 'success' || !trangThaiDaGiaLap?.maGiaoDich || !trangThaiDaGiaLap.thoiGianThanhToan) return

    navigate(`/payment/receipt?period=${encodeURIComponent(kyHoaDonHienTai)}`, {
      state: {
        demo: true,
        maGiaoDich: trangThaiDaGiaLap.maGiaoDich,
        thoiGianThanhToan: trangThaiDaGiaLap.thoiGianThanhToan,
      },
    })
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

  async function saoChepThongTinDemo() {
    const noiDungSaoChep = [
      'THÔNG TIN DEMO - KHÔNG DÙNG ĐỂ CHUYỂN TIỀN',
      'Số tài khoản: Chưa có dữ liệu API',
      `Nội dung: DEMO - KHONG PHAI LENH THANH TOAN | Hoa don ${soHoaDon} | ${soTien} VND`,
    ].join('\n')

    try {
      await navigator.clipboard.writeText(noiDungSaoChep)
      setThongBaoTienIch('Đã sao chép thông tin demo. Không dùng để chuyển khoản.')
    } catch {
      setThongBaoTienIch('Không thể sao chép. Trình duyệt có thể chưa cấp quyền clipboard.')
    }
  }

  return (
    <>
      <Header back={duongDanChiTiet} title="Thanh toán hóa đơn" />
      <main className="space-y-3 px-4 pb-24">
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

        <Card className="!p-4">
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
        </Card>

        <Card className="!p-4">
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
              {hoaDon.daThanhToan ? 'Dữ liệu mẫu' : 'Mô phỏng BILL_08'}
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
          {!hoaDon.daThanhToan && trangThaiDemo === 'success' && trangThaiDaGiaLap?.maGiaoDich && (
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
              Chọn kết quả để thử các trạng thái BILL_08
            </summary>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Chỉ thay đổi giao diện hiện tại; không gọi API và không cập nhật dữ liệu hóa đơn.
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
            QR và trạng thái BILL_08 chỉ phục vụ kiểm thử giao diện. Chưa kết nối ngân hàng/API; trạng thái mô phỏng không xác nhận giao dịch thật.
          </p>
        </Card>
      </main>
    </>
  )
}
