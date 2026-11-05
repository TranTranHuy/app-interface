import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import TrangChu from './pages/TrangChu'
import LienKetKhachHang from './pages/LienKetKhachHang'
import HoaDon from './pages/HoaDon'
import ChiTietHoaDon from './pages/ChiTietHoaDon'
import ThanhToan from './pages/ThanhToan'
import ThongBao from './pages/ThongBao'
import SuCo from './pages/SuCo'
import ThongTinTaiKhoan from './pages/ThongTinTaiKhoan'
import LichSuSuDungNuoc from './pages/LichSuSuDungNuoc'
import DichVu from './pages/DichVu'
import CanhBaoBatThuong from './pages/CanhBaoBatThuong'
import DangNhap from './pages/DangNhap'
import HuongDanSuDung from './pages/HuongDanSuDung'
import { daDangNhap } from './xacThuc'

function YeuCauDangNhap() {
  return daDangNhap() ? <Outlet /> : <Navigate to="/login" replace />
}

export default function App() {
  const { pathname: duongDanHienTai } = useLocation()
  const daXacThuc = daDangNhap()

  return (
    <div className="max-w-[430px] md:max-w-2xl mx-auto min-h-screen bg-sky-50 flex flex-col">
      <Routes>
        <Route path="/login" element={daXacThuc ? <Navigate to="/" replace /> : <DangNhap />} />
        <Route path="/guide" element={<HuongDanSuDung />} />
        <Route element={<YeuCauDangNhap />}>
          <Route path="/" element={<TrangChu />} />
          <Route path="/link" element={<LienKetKhachHang />} />
          <Route path="/bills" element={<HoaDon />} />
          <Route path="/bills/detail" element={<ChiTietHoaDon />} />
          <Route path="/pay" element={<ThanhToan />} />
          <Route path="/notifications" element={<ThongBao />} />
          <Route path="/incidents" element={<SuCo />} />
          <Route path="/profile" element={<ThongTinTaiKhoan />} />
          <Route path="/usage" element={<LichSuSuDungNuoc />} />
          <Route path="/service" element={<DichVu />} />
          <Route path="/alert" element={<CanhBaoBatThuong />} />
          <Route path="/khai-bao-chi-so-nuoc" element={<Navigate to="/profile?dialog=reading" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {daXacThuc && duongDanHienTai !== '/guide' && duongDanHienTai !== '/login' && <BottomNav />}
    </div>
  )
}
