import { useRef, useState, useSyncExternalStore } from 'react'
import Header from '../components/Header'
import BieuTuong from '../components/BieuTuong'
import { Btn, Card, Chip, Tile } from '../components/ui'
import { hoaDonChuaThanhToan, notifications, thongTinKhachHang } from '../data/mock'
import { dangKyThayDoiThongBao, danhSachThongBaoDaDoc, layThongBaoDaDoc } from '../data/trangThaiThongBao'
import { dangKyThayDoiThanhToanDemo, layDanhSachThanhToanDemo } from '../data/trangThaiThanhToanDemo'

export default function TrangChu() {
  const danhSachThongBaoRef = useRef<HTMLDivElement>(null)
  const [viTriThongBao, datViTriThongBao] = useState(0)
  const thongBaoDaDoc = useSyncExternalStore(dangKyThayDoiThongBao, layThongBaoDaDoc, () => '')
  const thanhToanDemo = useSyncExternalStore(
    dangKyThayDoiThanhToanDemo,
    layDanhSachThanhToanDemo,
    layDanhSachThanhToanDemo,
  )
  const danhSachDaDoc = danhSachThongBaoDaDoc(thongBaoDaDoc)
  const hoaDonGanNhat = hoaDonChuaThanhToan
  const giaoDichDemo = thanhToanDemo[hoaDonGanNhat.soHoaDon]
  const daThanhToanDemo = !hoaDonGanNhat.daThanhToan && giaoDichDemo?.trangThai === 'success'
  const daThanhToan = hoaDonGanNhat.daThanhToan || daThanhToanDemo
  const kyHoaDonChiTiet = `/bills/detail?period=${encodeURIComponent(hoaDonGanNhat.thang)}`
  const tinMoiNhat = [...notifications]
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .slice(0, 2)

  function chuyenDenThongBao(viTri: number) {
    const danhSachThongBao = danhSachThongBaoRef.current
    if (!danhSachThongBao) return

    danhSachThongBao.scrollTo({
      left: viTri * danhSachThongBao.clientWidth,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col gap-3 px-4 pb-24 md:px-8">
        <Card
          to="/profile"
          bg="bg-sky-100"
          className="relative flex items-center gap-3 overflow-hidden border border-white/70 bg-cover bg-center"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: "url('/the-thong-tin-khach-hang.svg')" }}
          />
          <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-white">
            <BieuTuong ten="nguoiDung" className="h-7 w-7 text-blue-600" />
          </span>
          <div className="relative z-10 min-w-0 flex-1">
            <div className="text-sm font-medium text-slate-700">Xin chào,</div>
            <div className="truncate text-xl font-extrabold">{thongTinKhachHang.hoTen}</div>
            <div className="text-sm font-medium text-slate-700">Mã KH: {thongTinKhachHang.maKhachHang}</div>
          </div>
          <BieuTuong ten="muiTenTrai" className="relative z-10 h-5 w-5 rotate-180 text-blue-700" />
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 text-base font-semibold">
                <BieuTuong ten="hoaDon" className="h-5 w-5 text-blue-600" />
                Tiền nước tháng {hoaDonGanNhat.thang}
              </div>
              <div className="mt-1 text-4xl font-extrabold leading-tight">{hoaDonGanNhat.soTien}<sup className="text-2xl">đ</sup></div>
            </div>
            <Chip color={daThanhToan ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-600'} className="!px-3 !py-1.5 !text-sm">
              {daThanhToanDemo ? 'Đã thanh toán (demo)' : daThanhToan ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </Chip>
          </div>
          <div className="mb-3 mt-2 text-base font-medium">
            {daThanhToanDemo ? 'Ngày mô phỏng: ' : daThanhToan ? 'Ngày thanh toán: ' : 'Hạn thanh toán: '}
            <b className={daThanhToan ? 'text-emerald-700' : 'text-red-600'}>
              {daThanhToanDemo && giaoDichDemo?.thoiGianThanhToan
                ? new Intl.DateTimeFormat('vi-VN').format(new Date(giaoDichDemo.thoiGianThanhToan))
                : hoaDonGanNhat.ngay}
            </b>
          </div>
          <Btn to={daThanhToanDemo ? `/payment/receipt?period=${encodeURIComponent(hoaDonGanNhat.thang)}` : kyHoaDonChiTiet}>
            <BieuTuong ten={daThanhToanDemo ? 'hoaDon' : 'thanhToan'} className="h-5 w-5" />
            {daThanhToanDemo ? 'Xem biên nhận demo' : daThanhToan ? 'Xem hóa đơn' : 'Thanh toán ngay'}
            <span aria-hidden="true">›</span>
          </Btn>
        </Card>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Tile prominent icon="hoaDon" title="Hóa đơn" sub="Tra cứu và xem lịch sử" to="/bills" color="bg-blue-100" />
          <Tile prominent icon="suaChua" title="Sự cố" sub="Báo sự cố và theo dõi xử lý" to="/incidents" color="bg-red-100" />
          <Tile prominent icon="chuong" title="Thông báo" sub="Xem thông báo cấp nước" to="/notifications" color="bg-cyan-100" />
          <Tile prominent icon="nguoiDung" title="Thông tin người dùng" sub="Thông tin khách hàng" to="/profile" color="bg-indigo-100" />
        </div>

        <Tile prominent icon="chiSoNuoc" title="Khai báo chỉ số nước" sub="Gửi chỉ số đồng hồ nước định kỳ" to="/profile?dialog=reading" color="bg-sky-100" />

        <section className="space-y-2" aria-label="Thông báo mới nhất">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#124b84]">Thông báo mới nhất</h2>
            <Btn to="/notifications" outline className="!w-auto !px-3 !py-2 text-sm">Xem thêm</Btn>
          </div>
          {tinMoiNhat.length > 0 && (
            <>
              <div
                ref={danhSachThongBaoRef}
                onScroll={(suKien) => {
                  const { scrollLeft, clientWidth } = suKien.currentTarget
                  if (clientWidth > 0) datViTriThongBao(Math.round(scrollLeft / clientWidth))
                }}
                className="flex snap-x snap-mandatory overflow-x-auto rounded-2xl scroll-smooth"
                role="region"
                aria-label="Vuốt ngang để xem thông báo mới nhất"
              >
                {tinMoiNhat.map((tin, viTri) => (
                  <div
                    key={tin.id}
                    className="w-full shrink-0 snap-start"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Thông báo ${viTri + 1} trên ${tinMoiNhat.length}`}
                  >
                    <Card
                      to={`/notifications/${encodeURIComponent(tin.id)}`}
                      bg={tin.category === 'invoice' ? 'bg-white' : 'bg-red-50'}
                      className="flex min-h-32 items-start gap-3 border border-slate-100 !p-4"
                    >
                      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${tin.category === 'invoice' ? 'bg-sky-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                        <BieuTuong ten={tin.category === 'invoice' ? 'hoaDon' : 'loa'} className="h-6 w-6" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-start justify-between gap-2">
                          <span className="text-base font-bold leading-snug text-slate-900">{tin.title}</span>
                          {!tin.read && !danhSachDaDoc.has(tin.id) && <Chip color="bg-orange-100 text-orange-600">Mới</Chip>}
                        </span>
                        <span className="mt-1 block line-clamp-2 text-sm font-medium leading-relaxed text-slate-700">{tin.message}</span>
                        <time dateTime={tin.createdAt} className="mt-2 block text-right text-xs font-medium text-slate-600">{tin.timeLabel}</time>
                      </span>
                    </Card>
                  </div>
                ))}
              </div>
              {tinMoiNhat.length > 1 && (
                <div className="flex justify-center gap-2" role="group" aria-label="Chọn thông báo">
                  {tinMoiNhat.map((tin, viTri) => (
                    <button
                      key={tin.id}
                      type="button"
                      aria-label={`Xem thông báo ${viTri + 1}`}
                      aria-current={viTriThongBao === viTri ? 'true' : undefined}
                      onClick={() => chuyenDenThongBao(viTri)}
                      className={`h-2 rounded-full transition-all ${viTriThongBao === viTri ? 'w-5 bg-blue-600' : 'w-2 bg-slate-300'}`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
          {tinMoiNhat.length === 0 && <Card className="text-base font-medium text-slate-700">Chưa có thông báo mới.</Card>}
        </section>

        <div
          role="img"
          aria-label="Nước sạch Hậu Giang – Cho cuộc sống xanh hơn"
          className="relative w-full overflow-hidden rounded-2xl shadow-sm"
        >
          <img src="/banner-hau-giang.svg?v=2" alt="" aria-hidden="true" className="block w-full" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 text-center">
            <p className="absolute left-0 right-0 top-[22%] text-2xl font-bold leading-tight text-[#07558a] sm:text-4xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Nước sạch Hậu Giang
            </p>
            <p className="absolute left-0 right-0 top-[48%] text-xl leading-tight text-[#176a9b] sm:text-3xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Cho cuộc sống xanh hơn
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <a href="tel:02933572019" className="flex min-h-14 min-w-0 items-center justify-center gap-2 rounded-xl bg-white px-2 py-2 text-sm font-bold leading-tight text-blue-800 shadow-sm">
            <BieuTuong ten="dienThoai" className="h-5 w-5 shrink-0 text-blue-600" />
            <span className="text-center">Hotline CSKH<br />02933 572 019</span>
          </a>
          <Btn to="/guide" outline className="!min-h-14 !px-2 !py-2 text-sm">
            <BieuTuong ten="huongDan" className="h-4 w-4" />
            <span className="text-center">Hướng dẫn sử dụng</span>
          </Btn>
        </div>
      </div>
    </>
  )
}