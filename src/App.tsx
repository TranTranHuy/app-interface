import { Route, Routes } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'

import BillsPage from './pages/BillsPage'
import BillDetailPage from './pages/BillDetailPage'
import PaymentPage from './pages/PaymentPage'
import ThongBao from './pages/ThongBao'
import SuCo from './pages/SuCo'
import ThongTinTaiKhoan from './pages/ThongTinTaiKhoan'

export default function App() {
  return (
    <div className="max-w-[430px] md:max-w-2xl mx-auto min-h-screen bg-[#f1f9ff] flex flex-col pb-24">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bills" element={<BillsPage />} />
        <Route path="/bills/detail" element={<BillDetailPage />} />
        <Route path="/pay" element={<PaymentPage />} />
        <Route path="/notifications" element={<ThongBao />} />
        <Route path="/incidents" element={<SuCo />} />
        <Route path="/profile" element={<ThongTinTaiKhoan />} />
      </Routes>
      <BottomNav />
    </div>
  )
}
