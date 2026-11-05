import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import BieuTuong from '../components/BieuTuong'
import { Card, Row } from '../components/ui'
import { danhSachHoaDon, thongTinKhachHang } from '../data/mock'

type DuLieuBienNhanDemo = {
  demo: true
  maGiaoDich: string
  thoiGianThanhToan: string
}

function laDuLieuBienNhanDemo(value: unknown): value is DuLieuBienNhanDemo {
  if (typeof value !== 'object' || value === null) return false

  const state = value as Record<string, unknown>
  return (
    state.demo === true &&
    typeof state.maGiaoDich === 'string' &&
    typeof state.thoiGianThanhToan === 'string' &&
    !Number.isNaN(Date.parse(state.thoiGianThanhToan))
  )
}

function formatCurrency(amount: number): string {
  return `${amount.toLocaleString('vi-VN')}đ`
}

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default function BienNhanThanhToan() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const kyHoaDon = searchParams.get('period')
  const hoaDon = danhSachHoaDon.find((item) => item.thang === kyHoaDon)
  const duLieuBienNhan = laDuLieuBienNhanDemo(location.state) ? location.state : null

  if (!hoaDon || !duLieuBienNhan) {
    return (
      <>
        <Header back={hoaDon ? `/pay?period=${encodeURIComponent(hoaDon.thang)}` : '/bills'} title="Biên nhận thanh toán" />
        <main className="space-y-3 px-4 pb-24">
          <Card bg="bg-amber-50">
            <h1 className="font-semibold text-amber-900">Không có biên nhận hợp lệ</h1>
            <p className="mt-1 text-sm leading-5 text-amber-800">
              Biên nhận này chỉ được tạo sau khi chọn kết quả thành công trong luồng mô phỏng.
            </p>
          </Card>
          <button
            type="button"
            onClick={() => navigate(hoaDon ? `/pay?period=${encodeURIComponent(hoaDon.thang)}` : '/bills')}
            className="min-h-11 w-full rounded-full bg-[#087fc4] px-4 text-sm font-semibold text-white"
          >
            {hoaDon ? 'Quay lại thanh toán' : 'Quay lại danh sách hóa đơn'}
          </button>
        </main>
      </>
    )
  }

  const soTien = Number(hoaDon.soTien.replace(/\./g, ''))
  const duongDanChiTiet = `/bills/detail?period=${encodeURIComponent(hoaDon.thang)}`

  return (
    <>
      <Header back={`/pay?period=${encodeURIComponent(hoaDon.thang)}`} title="Biên nhận thanh toán" />
      <main className="space-y-3 px-4 pb-24">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 px-5 py-7 text-center text-white shadow-lg shadow-emerald-100">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/20">
            <BieuTuong ten="xacNhan" className="h-9 w-9" strokeWidth={2.2} />
          </span>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-50">Biên nhận thanh toán</p>
          <h1 className="mt-1 text-xl font-bold">Thanh toán thành công</h1>
          <p className="mt-2 text-3xl font-bold">{formatCurrency(soTien)}</p>
          <span className="mt-4 inline-flex rounded-full border border-white/40 bg-white/15 px-3 py-1 text-xs font-semibold">
            BẢN DEMO — KHÔNG XÁC NHẬN GIAO DỊCH THẬT
          </span>
        </div>

        <Card className="!p-4">
          <h2 className="mb-2 font-semibold text-slate-900">Thông tin giao dịch mô phỏng</h2>
          <div className="divide-y divide-slate-100">
            <Row a="Mã giao dịch" b={duLieuBienNhan.maGiaoDich} className="break-all text-[#087fc4]" />
            <Row a="Thời gian mô phỏng" b={formatDateTime(duLieuBienNhan.thoiGianThanhToan)} />
            <Row a="Phương thức" b="VietQR (mô phỏng)" />
            <Row a="Kết quả" b="Thành công (mô phỏng)" className="text-emerald-700" />
          </div>
        </Card>

        <Card className="!p-4">
          <h2 className="mb-2 font-semibold text-slate-900">Hóa đơn</h2>
          <div className="divide-y divide-slate-100">
            <Row a="Khách hàng" b={thongTinKhachHang.hoTen} />
            <Row a="Mã khách hàng" b={thongTinKhachHang.maKhachHang} />
            <Row a="Số hóa đơn" b={hoaDon.soHoaDon} />
            <Row a="Kỳ hóa đơn" b={hoaDon.thang} />
            <Row a="Số tiền" b={formatCurrency(soTien)} className="text-[#124b84]" />
          </div>
        </Card>

        <Card bg="bg-amber-50" className="flex items-start gap-2 !p-3">
          <BieuTuong ten="canhBao" className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
          <p className="text-xs leading-5 text-amber-900">
            Đây là biên nhận mẫu để xem trước giao diện. Không có giao dịch ngân hàng và trạng thái hóa đơn chưa được cập nhật.
          </p>
        </Card>

        <button
          type="button"
          onClick={() => navigate(duongDanChiTiet)}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#087fc4] px-4 text-sm font-semibold text-white"
        >
          <BieuTuong ten="hoaDon" className="h-5 w-5" />
          Xem chi tiết hóa đơn
        </button>
      </main>
    </>
  )
}
