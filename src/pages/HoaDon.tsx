import { FormEvent, useState } from 'react'
import Header from '../components/Header'
import BieuTuong from '../components/BieuTuong'
import { Btn, Card, Chip, Hero } from '../components/ui'
import { danhSachHoaDon } from '../data/mock'

type ThongTinHoaDon = { thang: string; soTien: string; sanLuong: number; ngay: string; ngayPhatHanh: string; daThanhToan: boolean }
type BoLocHoaDon = { tuKy: string; denKy: string; trangThai: 'ALL' | 'DA_THANH_TOAN' | 'CHUA_THANH_TOAN' }

function TheHoaDon({ thang, soTien, sanLuong, ngay, daThanhToan }: ThongTinHoaDon) {
  return (
    <Card bg={daThanhToan ? 'bg-white' : 'bg-orange-50'}>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xs text-slate-500">Kỳ hóa đơn</div>
          <b>Tháng {thang}</b>
        </div>
        <Chip color={daThanhToan ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-600'}>
          <span className="inline-flex items-center gap-1">
            <BieuTuong ten={daThanhToan ? 'xacNhan' : 'dongHo'} className="h-3.5 w-3.5" />
            {daThanhToan ? 'Đã thanh toán' : 'Chưa thanh toán'}
          </span>
        </Chip>
      </div>
      <div className="flex justify-between items-end mt-2 mb-2">
        <div>
          <div className="text-xs text-slate-500">Số tiền {daThanhToan ? '' : 'cần '}thanh toán</div>
          <div className="text-2xl font-extrabold">{soTien}<sup>đ</sup></div>
        </div>
        <div className="text-xs text-right">
          Sản lượng: <b>{sanLuong} m³</b>
          <br />
          {daThanhToan ? 'Ngày thanh toán' : 'Hạn thanh toán'}: <b className={daThanhToan ? 'text-emerald-700' : 'text-red-600'}>{ngay}</b>
        </div>
      </div>
      {daThanhToan ? <Btn outline to={`/bills/detail?period=${encodeURIComponent(thang)}`} className="!py-1.5">Xem chi tiết ›</Btn> : <Btn to={`/bills/detail?period=${encodeURIComponent(thang)}`}><BieuTuong ten="thanhToan" className="h-5 w-5" />Thanh toán ngay <span aria-hidden="true">›</span></Btn>}
    </Card>
  )
}

export default function HoaDon() {
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
      <Hero title="Hóa đơn" sub="Theo dõi các kỳ hóa đơn và trạng thái thanh toán" icon="hoaDon" />
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
        {khoangKyKhongHopLe ? (
          <Card bg="bg-red-50"><p role="alert" className="text-sm text-red-600">Kỳ bắt đầu phải trước hoặc bằng kỳ kết thúc.</p></Card>
        ) : hoaDonHienThi.length > 0 ? (
          hoaDonHienThi.map((hoaDon) => <TheHoaDon key={hoaDon.thang} {...hoaDon} />)
        ) : (
          <Card><p className="py-4 text-center text-sm text-slate-500">Không tìm thấy hóa đơn phù hợp với điều kiện đã chọn.</p></Card>
        )}
      </div>
    </>
  )
}
