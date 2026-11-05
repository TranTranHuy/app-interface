import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react'
import Header from '../components/Header'
import BieuTuong from '../components/BieuTuong'
import { Btn, Card, Hero } from '../components/ui'
import { thongTinKhachHang } from '../data/mock'

const chiSoCu = 1270

export default function KhaiBaoChiSoNuoc() {
  const [chiSoMoi, datChiSoMoi] = useState('1275')
  const [tepAnh, datTepAnh] = useState<File | null>(null)
  const [duongDanAnh, datDuongDanAnh] = useState('')
  const [daLuu, datDaLuu] = useState(false)
  const [loi, datLoi] = useState('')
  const sanLuongTieuThu = Math.max(0, (Number(chiSoMoi) || 0) - chiSoCu)
  const chiSoHopLe = Number.isInteger(Number(chiSoMoi)) && Number(chiSoMoi) > chiSoCu

  useEffect(() => {
    if (!tepAnh) {
      datDuongDanAnh('')
      return
    }

    const urlAnh = URL.createObjectURL(tepAnh)
    datDuongDanAnh(urlAnh)
    return () => URL.revokeObjectURL(urlAnh)
  }, [tepAnh])

  function xuLyChonAnh(suKien: ChangeEvent<HTMLInputElement>) {
    const anhDaChon = suKien.target.files?.[0]
    if (!anhDaChon) return

    if (!anhDaChon.type.startsWith('image/')) {
      datLoi('Vui lòng chọn tệp hình ảnh.')
      datTepAnh(null)
      return
    }

    datLoi('')
    datDaLuu(false)
    datTepAnh(anhDaChon)
  }

  function xuLyLuuKhaiBao(suKien: FormEvent<HTMLFormElement>) {
    suKien.preventDefault()
    if (!chiSoHopLe || !tepAnh) return
    datLoi('')
    datDaLuu(true)
  }

  return (
    <>
      <Header back="/" />
      <Hero title="Khai báo chỉ số nước" sub="Gửi chỉ số đồng hồ nước để cập nhật sản lượng sử dụng" icon="chiSoNuoc" />
      <main className="flex-1 space-y-3 px-4 pb-24">
        <Card className="divide-y divide-slate-100">
          <p className="py-3 text-sm"><b>Họ tên:</b> <span className="font-semibold text-blue-700">{thongTinKhachHang.hoTen} (Mã KH: {thongTinKhachHang.maKhachHang})</span></p>
          <p className="py-3 text-sm"><b>Địa chỉ:</b> {thongTinKhachHang.diaChi}</p>
          <p className="py-3 text-sm"><b>SĐT:</b> {thongTinKhachHang.soDienThoaiHienThi}</p>
          <p className="py-3 text-sm"><b>Kỳ ghi:</b> 10/2026</p>
          <p className="py-3 text-sm"><b>Lượng tiêu thụ:</b> {sanLuongTieuThu} m³</p>
        </Card>

        <form onSubmit={xuLyLuuKhaiBao} className="space-y-3">
          <Card className="space-y-3">
            <div className="grid grid-cols-2 items-center gap-3">
              <p className="text-sm"><b>Chỉ số cũ:</b> {chiSoCu} m³</p>
              <label className="block text-sm font-semibold">
                Chỉ số mới (m³)
                <input
                  type="number"
                  min={chiSoCu + 1}
                  step="1"
                  required
                  value={chiSoMoi}
                  onChange={(suKien) => {
                    datChiSoMoi(suKien.target.value)
                    datDaLuu(false)
                    datLoi('')
                  }}
                  aria-label="Chỉ số mới"
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 font-normal"
                />
              </label>
            </div>
            <p className="text-xs text-slate-500">Chỉ số mới phải lớn hơn chỉ số cũ.</p>
          </Card>

          <div className="flex items-center justify-between gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-sm">
              <BieuTuong ten="mayAnh" className="h-5 w-5" />
              Chụp ảnh
              <input type="file" accept="image/*" capture="environment" onChange={xuLyChonAnh} className="sr-only" />
            </label>
            <Btn type="submit" disabled={!chiSoHopLe || !tepAnh} className="!w-auto !px-6">
              <BieuTuong ten="luu" className="h-5 w-5" />
              Lưu
            </Btn>
          </div>

          {loi && <p role="alert" className="text-sm text-red-600">{loi}</p>}

          <Card className="mx-auto grid aspect-square w-3/5 max-w-64 place-items-center overflow-hidden border border-sky-200">
            {duongDanAnh ? (
              <img src={duongDanAnh} alt="Ảnh đồng hồ nước đã chọn" className="h-full w-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-3 text-slate-400">
                <BieuTuong ten="khongCoAnh" className="h-20 w-20" strokeWidth={1.5} />
                <span className="text-base">Không có hình ảnh</span>
              </div>
            )}
          </Card>

          {daLuu && (
            <Card bg="bg-emerald-50">
              <p role="status" className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                <BieuTuong ten="xacNhan" className="h-5 w-5" />
                Đã lưu khai báo chỉ số {Number(chiSoMoi).toLocaleString('vi-VN')} m³ (demo).
              </p>
            </Card>
          )}
          <p className="text-center text-xs text-slate-500">Thông tin khai báo chỉ được lưu trong bản demo.</p>
        </form>
      </main>
    </>
  )
}
