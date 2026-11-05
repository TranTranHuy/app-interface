import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import BieuTuong from '../components/BieuTuong'
import PageBanner from '../components/PageBanner'
import { Btn, Card } from '../components/ui'
import { danhSachHoaDon } from '../data/mock'

type ThongTinHoaDon = {
  soHoaDon: string
  thang: string
  soTien: string
  sanLuong: number
  ngay: string
  ngayPhatHanh: string
  chiSoCu: number
  chiSoMoi: number
  daThanhToan: boolean
  hoaDonDienTu?: {
    kyHieu: string
    maSoThue: string
    maTraCuu: string
    ngayKy: string
    donViKySo: string
    pdfUrl: string | null
  }
}
type BoLocHoaDon = { tuKy: string; denKy: string; trangThai: 'ALL' | 'DA_THANH_TOAN' | 'CHUA_THANH_TOAN' }
type CheDoHienThi = 'list' | 'chart'
type SoKyBieuDo = 6 | 12

function TheHoaDon({ soHoaDon, thang, soTien, sanLuong, ngay, chiSoCu, chiSoMoi, daThanhToan, hoaDonDienTu }: ThongTinHoaDon) {
  const navigate = useNavigate()
  const [hddtDangMo, datHddtDangMo] = useState(false)
  const detailPath = `/bills/detail?period=${encodeURIComponent(thang)}`

  return (
    <Card bg={daThanhToan ? 'bg-white' : 'bg-orange-50'} className="!p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sky-100 text-[#087fc4]">
            <BieuTuong ten="hoaDon" className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <span className="block text-[11px] leading-tight text-slate-500">Kỳ hóa đơn</span>
            <b className="block text-sm leading-tight text-[#124b84]">Tháng {thang}</b>
            <span className="block truncate text-[10px] text-slate-500">Số HĐ: {soHoaDon}</span>
          </div>
        </div>
        <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${daThanhToan ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
          <BieuTuong ten={daThanhToan ? 'xacNhan' : 'dongHo'} className="h-3 w-3" />
          {daThanhToan ? 'Đã thanh toán' : 'Chưa thanh toán'}
        </span>
      </div>

      <div className="my-2 border-t border-slate-200/80" />

      <div className="grid grid-cols-2">
        <div className="min-w-0 pr-3">
          <div className="mb-1.5 flex items-center gap-1.5 text-[10px] text-slate-500">
            <span>Chỉ số cũ → mới (m³)</span>
          </div>
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#124b84]">
            <span>{chiSoCu.toLocaleString('vi-VN')}</span>
            <span className="text-slate-400" aria-hidden="true">→</span>
            <span>{chiSoMoi.toLocaleString('vi-VN')}</span>
          </div>
          <span className="block text-[10px] text-slate-500">Số tiền {daThanhToan ? 'thanh toán' : 'cần thanh toán'}</span>
          <b className="block whitespace-nowrap text-xl leading-tight text-[#124b84]">
            {soTien}<sup className="text-xs">đ</sup>
          </b>
        </div>

        <div className="flex min-w-0 flex-col justify-center gap-2 border-l border-slate-200/80 pl-3">
          <div className="flex items-start gap-1.5">
            <BieuTuong ten="giotNuoc" className="mt-0.5 h-4 w-4 shrink-0 text-[#168fe0]" />
            <div className="min-w-0">
              <span className="block text-[10px] leading-tight text-slate-500">Sản lượng tiêu thụ</span>
              <b className="block text-xs leading-tight text-slate-800">{sanLuong} m³</b>
            </div>
          </div>
          <div className="flex items-start gap-1.5">
            <BieuTuong ten="lich" className="mt-0.5 h-4 w-4 shrink-0 text-[#168fe0]" />
            <div className="min-w-0">
              <span className="block text-[10px] leading-tight text-slate-500">{daThanhToan ? 'Ngày thanh toán' : 'Hạn thanh toán'}</span>
              <b className={`block text-xs leading-tight ${daThanhToan ? 'text-emerald-700' : 'text-red-600'}`}>{ngay}</b>
            </div>
          </div>
        </div>
      </div>

      {daThanhToan ? (
        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate(detailPath)}
            className="min-h-9 rounded-full border border-[#168fe0] bg-white px-3 text-xs font-semibold text-[#087fc4]"
          >
            Xem chi tiết <span aria-hidden="true">›</span>
          </button>
          <button
            type="button"
            onClick={() => datHddtDangMo(true)}
            className="min-h-9 rounded-full bg-[#087fc4] px-3 text-xs font-semibold text-white"
          >
            HĐĐT
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => navigate(detailPath)}
          className="mt-2 flex min-h-9 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#087fc4] to-[#19a8f5] px-3 text-xs font-semibold text-white shadow-sm shadow-sky-200"
        >
          <BieuTuong ten="thanhToan" className="h-4 w-4" />
          Thanh toán ngay
          <span aria-hidden="true">›</span>
        </button>
      )}
      {hddtDangMo && hoaDonDienTu && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          role="presentation"
          onClick={() => datHddtDangMo(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={`einvoice-title-${soHoaDon}`}
            className="w-full max-w-[420px] rounded-2xl bg-white p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id={`einvoice-title-${soHoaDon}`} className="font-bold text-[#124b84]">Hóa đơn điện tử</h2>
                <p className="mt-0.5 text-xs text-slate-500">Thông tin hóa đơn GTGT</p>
              </div>
              <button
                type="button"
                aria-label="Đóng hóa đơn điện tử"
                onClick={() => datHddtDangMo(false)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-lg text-slate-600"
              >
                ×
              </button>
            </div>
            <dl className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-100 px-3">
              <div className="flex justify-between gap-3 py-2 text-sm">
                <dt className="text-slate-500">Ký hiệu</dt>
                <dd className="font-semibold text-slate-800">{hoaDonDienTu.kyHieu}</dd>
              </div>
              <div className="flex justify-between gap-3 py-2 text-sm">
                <dt className="text-slate-500">Số hóa đơn</dt>
                <dd className="font-semibold text-slate-800">{soHoaDon}</dd>
              </div>
              <div className="flex justify-between gap-3 py-2 text-sm">
                <dt className="text-slate-500">Mã số thuế</dt>
                <dd className="text-right font-semibold text-slate-800">{hoaDonDienTu.maSoThue}</dd>
              </div>
              <div className="flex justify-between gap-3 py-2 text-sm">
                <dt className="text-slate-500">Ngày ký</dt>
                <dd className="font-semibold text-slate-800">{hoaDonDienTu.ngayKy}</dd>
              </div>
              <div className="flex justify-between gap-3 py-2 text-sm">
                <dt className="text-slate-500">Đơn vị ký số</dt>
                <dd className="text-right font-semibold text-slate-800">{hoaDonDienTu.donViKySo}</dd>
              </div>
              <div className="flex justify-between gap-3 py-2 text-sm">
                <dt className="text-slate-500">Mã tra cứu</dt>
                <dd className="font-semibold text-slate-800">{hoaDonDienTu.maTraCuu}</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs leading-5 text-amber-700">
              Thông tin đang dùng dữ liệu minh họa. Liên kết tải PDF sẽ có khi kết nối API hóa đơn điện tử.
            </p>
            {hoaDonDienTu.pdfUrl ? (
              <a
                href={hoaDonDienTu.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex min-h-11 items-center justify-center rounded-full bg-[#087fc4] px-4 text-sm font-semibold text-white"
              >
                Tải PDF hóa đơn
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="mt-3 min-h-11 w-full rounded-full bg-slate-200 px-4 text-sm font-semibold text-slate-500"
              >
                Tải PDF hóa đơn (chưa khả dụng)
              </button>
            )}
          </section>
        </div>
      )}
    </Card>
  )
}

export default function HoaDon() {
  const [cheDoHienThi, datCheDoHienThi] = useState<CheDoHienThi>('list')
  const [soKyBieuDo, datSoKyBieuDo] = useState<SoKyBieuDo>(6)
  const [tuKy, datTuKy] = useState('')
  const [denKy, datDenKy] = useState('')
  const [trangThai, datTrangThai] = useState<BoLocHoaDon['trangThai']>('ALL')
  const [boLocDaTim, datBoLocDaTim] = useState<BoLocHoaDon>({ tuKy: '', denKy: '', trangThai: 'ALL' })
  const cacKyHoaDon = [...new Set(danhSachHoaDon.map((hoaDon) => hoaDon.thang))]
    .sort((a, b) => {
      const [thangA, namA] = a.split('/').map(Number)
      const [thangB, namB] = b.split('/').map(Number)
      return namB - namA || thangB - thangA
    })
  const layKhoaKy = (ky: string) => {
    const [thang, nam] = ky.split('/')
    return `${nam}-${thang}`
  }
  const khoangKyKhongHopLe = Boolean(
    boLocDaTim.tuKy && boLocDaTim.denKy &&
    layKhoaKy(boLocDaTim.tuKy) > layKhoaKy(boLocDaTim.denKy),
  )
  const hoaDonDaLoc = danhSachHoaDon
    .filter((hoaDon) => {
      const khoaKy = layKhoaKy(hoaDon.thang)
      return (!boLocDaTim.tuKy || khoaKy >= layKhoaKy(boLocDaTim.tuKy)) &&
        (!boLocDaTim.denKy || khoaKy <= layKhoaKy(boLocDaTim.denKy)) &&
        (boLocDaTim.trangThai === 'ALL' ||
          (boLocDaTim.trangThai === 'DA_THANH_TOAN') === hoaDon.daThanhToan)
    })
    .sort((a, b) => layKhoaKy(b.thang).localeCompare(layKhoaKy(a.thang)))
  const duLieuBieuDo = [...danhSachHoaDon]
    .sort((a, b) => layKhoaKy(a.thang).localeCompare(layKhoaKy(b.thang)))
    .slice(-soKyBieuDo)
  const mucTieuThuCaoNhat = Math.max(...duLieuBieuDo.map((hoaDon) => hoaDon.sanLuong), 1)

  function xuLyTimKiem(suKien: FormEvent<HTMLFormElement>) {
    suKien.preventDefault()
    datBoLocDaTim({ tuKy, denKy, trangThai })
  }

  function lamMoiBoLoc() {
    datTuKy('')
    datDenKy('')
    datTrangThai('ALL')
    datBoLocDaTim({ tuKy: '', denKy: '', trangThai: 'ALL' })
  }

  const hoaDonHienThi = hoaDonDaLoc

  return (
    <>
      <Header back="/" />
      <div className="mx-4 mb-3">
        <PageBanner title="Hóa đơn" description="Theo dõi các kỳ hóa đơn và trạng thái thanh toán" />
      </div>
      <div className="px-4 pb-24 space-y-3">
        <form onSubmit={xuLyTimKiem} className="space-y-3 rounded-2xl bg-sky-100 p-3">
          <div className="grid grid-cols-2 gap-2">
            <label className="text-xs font-semibold text-slate-600">
              Từ kỳ
              <select
                aria-label="Lọc hóa đơn từ kỳ"
                value={tuKy}
                onChange={(suKien) => datTuKy(suKien.target.value)}
                className="mt-1 w-full rounded-xl bg-white px-3 py-2.5 text-sm font-normal text-slate-800 shadow-sm outline-none"
              >
                <option value="">Tất cả kỳ</option>
                {cacKyHoaDon.map((ky) => <option key={ky} value={ky}>{ky}</option>)}
              </select>
            </label>
            <label className="text-xs font-semibold text-slate-600">
              Đến kỳ
              <select
                aria-label="Lọc hóa đơn đến kỳ"
                value={denKy}
                onChange={(suKien) => datDenKy(suKien.target.value)}
                className="mt-1 w-full rounded-xl bg-white px-3 py-2.5 text-sm font-normal text-slate-800 shadow-sm outline-none"
              >
                <option value="">Tất cả kỳ</option>
                {cacKyHoaDon.map((ky) => <option key={ky} value={ky}>{ky}</option>)}
              </select>
            </label>
          </div>
          <label className="block text-xs font-semibold text-slate-600">
            Trạng thái
            <select
              aria-label="Lọc hóa đơn theo trạng thái"
              value={trangThai}
              onChange={(suKien) => {
                const giaTri = suKien.target.value
                if (giaTri === 'ALL' || giaTri === 'DA_THANH_TOAN' || giaTri === 'CHUA_THANH_TOAN') {
                  datTrangThai(giaTri)
                }
              }}
              className="mt-1 w-full rounded-xl bg-white px-3 py-2.5 text-sm font-normal text-slate-800 shadow-sm outline-none"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="DA_THANH_TOAN">Đã thanh toán</option>
              <option value="CHUA_THANH_TOAN">Chưa thanh toán</option>
            </select>
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Btn type="submit"><BieuTuong ten="timKiem" className="h-5 w-5" />Tìm kiếm</Btn>
            </div>
            <div className="w-2/5 shrink-0">
              <Btn type="button" outline onClick={lamMoiBoLoc} className="whitespace-nowrap">
              <BieuTuong ten="lamMoi" className="h-5 w-5" />
              Làm mới
              </Btn>
            </div>
          </div>
        </form>
        <div className="relative grid grid-cols-2 rounded-xl bg-sky-100 p-1" role="tablist" aria-label="Chế độ xem hóa đơn">
          <span
            aria-hidden="true"
            className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-lg bg-white shadow-sm transition-transform duration-300 ease-out motion-reduce:transition-none ${cheDoHienThi === 'chart' ? 'translate-x-full' : 'translate-x-0'}`}
          />
          <button
            id="invoice-list-tab"
            type="button"
            role="tab"
            aria-selected={cheDoHienThi === 'list'}
            aria-controls="invoice-tab-panel"
            onClick={() => datCheDoHienThi('list')}
            className={`relative z-10 flex min-h-10 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors duration-200 motion-reduce:transition-none ${cheDoHienThi === 'list' ? 'text-[#087fc4]' : 'text-slate-600'}`}
          >
            <BieuTuong ten="hoaDon" className="h-4 w-4" />
            Danh sách
          </button>
          <button
            id="invoice-chart-tab"
            type="button"
            role="tab"
            aria-selected={cheDoHienThi === 'chart'}
            aria-controls="invoice-tab-panel"
            onClick={() => datCheDoHienThi('chart')}
            className={`relative z-10 flex min-h-10 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors duration-200 motion-reduce:transition-none ${cheDoHienThi === 'chart' ? 'text-[#087fc4]' : 'text-slate-600'}`}
          >
            <BieuTuong ten="bieuDo" className="h-4 w-4" />
            Biểu đồ
          </button>
        </div>

        <section
          key={cheDoHienThi}
          id="invoice-tab-panel"
          role="tabpanel"
          aria-labelledby={cheDoHienThi === 'list' ? 'invoice-list-tab' : 'invoice-chart-tab'}
          className="invoice-tab-panel space-y-3"
        >
          {cheDoHienThi === 'list' ? (
            khoangKyKhongHopLe ? (
              <Card bg="bg-red-50"><p role="alert" className="text-sm text-red-600">Kỳ bắt đầu phải trước hoặc bằng kỳ kết thúc.</p></Card>
            ) : hoaDonHienThi.length > 0 ? (
              hoaDonHienThi.map((hoaDon) => <TheHoaDon key={hoaDon.thang} {...hoaDon} />)
            ) : (
              <Card><p className="py-4 text-center text-sm text-slate-500">Không tìm thấy hóa đơn phù hợp với điều kiện đã chọn.</p></Card>
            )
          ) : (
            <>
              <Card className="!p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="flex items-center gap-2 text-sm font-semibold text-[#124b84]">
                      <BieuTuong ten="bieuDo" className="h-5 w-5 text-[#087fc4]" />
                      Sản lượng tiêu thụ
                    </h2>
                    <p className="mt-0.5 text-xs text-slate-500">Theo dõi mức sử dụng nước theo kỳ</p>
                  </div>
                  <div className="flex shrink-0 rounded-lg bg-slate-100 p-0.5" role="group" aria-label="Số kỳ trên biểu đồ">
                    {([6, 12] as const).map((soKy) => (
                      <button
                        key={soKy}
                        type="button"
                        aria-pressed={soKyBieuDo === soKy}
                        onClick={() => datSoKyBieuDo(soKy)}
                        className={`min-h-8 rounded-md px-2 text-xs font-semibold transition-colors motion-reduce:transition-none ${soKyBieuDo === soKy ? 'bg-white text-[#087fc4] shadow-sm' : 'text-slate-600'}`}
                      >
                        {soKy} kỳ
                      </button>
                    ))}
                  </div>
                </div>
                {duLieuBieuDo.length > 0 ? (
                  <>
                    <div className="relative mt-5 h-48 border-b border-l border-slate-200 px-2">
                      {[25, 50, 75, 100].map((moc) => (
                        <div
                          key={moc}
                          aria-hidden="true"
                          className="absolute inset-x-0 border-t border-dashed border-slate-200"
                          style={{ bottom: `${moc}%` }}
                        />
                      ))}
                      <div className="relative z-10 flex h-full items-end justify-around gap-2">
                        {duLieuBieuDo.map((hoaDon, viTri) => (
                          <div key={hoaDon.thang} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end">
                            <span className="mb-1 text-[10px] font-semibold text-slate-600">{hoaDon.sanLuong} m³</span>
                            <div
                              role="img"
                              aria-label={`${hoaDon.thang}: ${hoaDon.sanLuong} mét khối`}
                              title={`${hoaDon.thang}: ${hoaDon.sanLuong} m³`}
                              className="invoice-chart-bar w-full max-w-10 rounded-t-md bg-gradient-to-t from-[#087fc4] to-[#48baf3] transition-[height] duration-500 ease-out motion-reduce:transition-none"
                              style={{
                                height: `${Math.max((hoaDon.sanLuong / mucTieuThuCaoNhat) * 70, 8)}%`,
                                animationDelay: `${viTri * 75}ms`,
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-1 flex justify-around gap-2 px-2">
                      {duLieuBieuDo.map((hoaDon) => (
                        <span key={hoaDon.thang} className="min-w-0 flex-1 text-center text-[10px] text-slate-500">
                          {hoaDon.thang}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-center text-[11px] text-slate-500">
                      Đang hiển thị {duLieuBieuDo.length} kỳ có sẵn trong dữ liệu mẫu.
                    </p>
                  </>
                ) : (
                  <p className="py-10 text-center text-sm text-slate-500">Chưa có dữ liệu sản lượng để hiển thị.</p>
                )}
              </Card>
              <p className="px-1 text-[11px] leading-4 text-slate-500">
                Biểu đồ đang dùng dữ liệu hóa đơn mẫu; khi kết nối API sẽ hiển thị tối đa {soKyBieuDo} kỳ gần nhất.
              </p>
            </>
          )}
        </section>
      </div>
    </>
  )
}
