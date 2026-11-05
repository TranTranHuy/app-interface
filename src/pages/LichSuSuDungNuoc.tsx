import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import BieuTuong from '../components/BieuTuong'
import { Card, Hero } from '../components/ui'
import { bangSuDungNuoc, cacThangSuDung, sanLuongSuDung } from '../data/mock'

export default function LichSuSuDungNuoc() {
  const chuyenTrang = useNavigate()
  const [soThangHienThi, datSoThangHienThi] = useState(12)
  const soThangDuLieu = Math.min(soThangHienThi, 12)
  const cacSanLuong = sanLuongSuDung.slice(-soThangDuLieu)
  const cacNhanThang = cacThangSuDung.slice(-soThangDuLieu)

  return (
    <>
      <Header back="/" />
      <Hero title="Lịch sử sử dụng nước" sub="Theo dõi sản lượng và chi phí theo tháng" />
      <div className="px-4 space-y-3">
        <div className="flex bg-white rounded-full p-1 text-sm">
          {[6, 12, 24].map((r) => (
            <button key={r} onClick={() => datSoThangHienThi(r)} className={`flex-1 py-2 rounded-full ${soThangHienThi === r ? 'bg-blue-600 text-white' : ''}`}>{r} tháng</button>
          ))}
        </div>

        <Card>
          <b className="flex items-center gap-2"><BieuTuong ten="bieuDo" className="h-5 w-5 text-blue-600" />Biểu đồ sản lượng và số tiền</b>
          <div className="flex items-end gap-1 h-40 mt-3 border-b border-slate-200">
            {cacSanLuong.map((sanLuong, viTri) => (
              <div key={viTri} className="flex-1 rounded-t bg-gradient-to-t from-sky-300 to-sky-500" style={{ height: `${(sanLuong * 100) / 40}%` }} />
            ))}
          </div>
          <div className="flex gap-1 text-[10px] text-slate-500">
            {cacNhanThang.map((nhanThang) => <div key={nhanThang} className="flex-1 text-center">{nhanThang.slice(0, 2)}</div>)}
          </div>
        </Card>

        <Card bg="bg-emerald-50" className="flex items-center gap-3">
          <BieuTuong ten="bieuDo" className="h-8 w-8 shrink-0 text-emerald-600" />
          <div className="flex-1">
            <b className="text-emerald-700">Tháng này giảm 8%</b>
            <div className="text-xs">so với tháng trước</div>
          </div>
          <div className="text-sm text-right">24 m³ ▼8%<br /><b>186.500đ</b></div>
        </Card>

        <Card to="/alert" bg="bg-red-50"><b className="text-red-600">⚠ Xem ví dụ cảnh báo tiêu thụ bất thường ›</b></Card>

        <Card>
          <b>Chi tiết các tháng gần đây</b>
          {bangSuDungNuoc.map((banGhi) => (
            <div key={banGhi.thang} onClick={() => chuyenTrang('/bills/detail')} className="flex justify-between text-sm py-2 border-b border-slate-100 cursor-pointer">
              <span className="w-20">{banGhi.thang}</span>
              <span>{banGhi.sanLuong} m³</span>
              <span>{banGhi.soTien}</span>
              <span>›</span>
            </div>
          ))}
        </Card>
      </div>
    </>
  )
}
