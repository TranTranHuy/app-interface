import { useRef, useState } from 'react'
import Header from '../components/Header'
import BieuTuong from '../components/BieuTuong'
import { Btn, Card, Chip, Tile } from '../components/ui'
import { notifications, thongKeTruyCap, thongTinKhachHang } from '../data/mock'

export default function TrangChu() {
  const danhSachThongBaoRef = useRef<HTMLDivElement>(null)
  const [viTriThongBao, datViTriThongBao] = useState(0)
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
          to="/link"
          bg="bg-sky-100"
          className="relative flex items-center gap-3 overflow-hidden border border-white/70 bg-cover bg-center"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: "url('/the-thong-tin-khach-hang.svg')" }}
          />
          <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-white">
            <BieuTuong ten="nguoiDung" className="h-6 w-6 text-blue-600" />
          </span>
          <div className="relative z-10 min-w-0 flex-1">
            <div className="text-xs text-slate-600">Xin chào,</div>
            <div className="truncate font-bold text-lg">{thongTinKhachHang.hoTen}</div>
            <div className="text-xs text-slate-600">Mã KH: {thongTinKhachHang.maKhachHang}</div>
          </div>
          <BieuTuong ten="muiTenTrai" className="relative z-10 h-5 w-5 rotate-180 text-blue-700" />
        </Card>

        <Card className="space-y-1.5 !py-2">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600">
              <BieuTuong ten="bieuDo" className="h-4 w-4 text-blue-600" />
              Tổng lượt truy cập
            </span>
            <b className="text-sm text-blue-800">{thongKeTruyCap.tongLuotTruyCap.toLocaleString('vi-VN')}</b>
          </div>
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span aria-hidden="true" className="ml-1 h-2 w-2 rounded-full bg-emerald-500" />
              Đang trực tuyến
            </span>
            <b className="text-sm text-emerald-700">{thongKeTruyCap.soNguoiDangTrucTuyen.toLocaleString('vi-VN')}</b>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <BieuTuong ten="hoaDon" className="h-5 w-5 text-blue-600" />
                Tiền nước tháng 10/2026
              </div>
              <div className="text-3xl font-extrabold mt-1">186.500<sup>đ</sup></div>
            </div>
            <Chip color="bg-orange-100 text-orange-600">Chưa thanh toán</Chip>
          </div>
          <div className="text-sm mt-2 mb-3">
            Hạn thanh toán: <b className="text-red-600">25/10/2026</b>
          </div>
          <Btn to="/bills/detail"><BieuTuong ten="thanhToan" className="h-5 w-5" />Thanh toán ngay <span aria-hidden="true">›</span></Btn>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Tile icon="hoaDon" title="Quản lý hóa đơn" sub="Tra cứu và xem lịch sử" to="/bills" color="bg-blue-100" />
          <Tile icon="suaChua" title="Quản lý sự cố" sub="Báo sự cố và theo dõi xử lý" to="/incidents" color="bg-red-100" />
          <Tile icon="chuong" title="Quản lý thông báo" sub="Xem thông báo cấp nước" to="/notifications" color="bg-cyan-100" />
          <Tile icon="nguoiDung" title="Thông tin người dùng" sub="Thông tin khách hàng" to="/profile" color="bg-indigo-100" />
        </div>

        <Tile icon="chiSoNuoc" title="Khai báo chỉ số nước" sub="Gửi chỉ số đồng hồ nước định kỳ" to="/profile?dialog=reading" color="bg-sky-100" />

        <section className="space-y-2" aria-label="Thông báo mới nhất">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#124b84]">Thông báo mới nhất</h2>
            <Btn to="/notifications" outline className="!w-auto !px-3 !py-1.5 text-xs">Xem thêm</Btn>
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
                      to={`/notifications?notification=${encodeURIComponent(tin.id)}`}
                      bg={tin.category === 'invoice' ? 'bg-white' : 'bg-red-50'}
                      className="flex min-h-28 items-start gap-3 border border-slate-100"
                    >
                      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${tin.category === 'invoice' ? 'bg-sky-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                        <BieuTuong ten={tin.category === 'invoice' ? 'hoaDon' : 'loa'} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-sm text-slate-900">{tin.title}</span>
                          {!tin.read && <Chip color="bg-orange-100 text-orange-600">Mới</Chip>}
                        </span>
                        <span className="mt-1 block line-clamp-2 text-sm text-slate-600">{tin.message}</span>
                        <time dateTime={tin.createdAt} className="mt-2 block text-right text-[11px] text-slate-500">{tin.timeLabel}</time>
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
          {tinMoiNhat.length === 0 && <Card className="text-sm text-slate-600">Chưa có thông báo mới.</Card>}
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
          <a href="tel:02933572019" className="flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-xl bg-white px-2 py-2 text-xs font-semibold leading-tight text-blue-800 shadow-sm">
            <BieuTuong ten="dienThoai" className="h-5 w-5 shrink-0 text-blue-600" />
            <span className="text-center">Hotline CSKH<br />02933 572 019</span>
          </a>
          <Btn to="/guide" outline className="!min-h-12 !px-2 !py-2 text-xs">
            <BieuTuong ten="huongDan" className="h-4 w-4" />
            <span className="text-center">Hướng dẫn sử dụng</span>
          </Btn>
        </div>
      </div>
    </>
  )
}