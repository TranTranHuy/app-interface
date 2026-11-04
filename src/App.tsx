import { Route, Routes, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'
import LinkPage from './pages/LinkPage'
import BillsPage from './pages/BillsPage'
import BillDetailPage from './pages/BillDetailPage'
import PaymentPage from './pages/PaymentPage'
import NotificationsPage from './pages/NotificationsPage'
import UsagePage from './pages/UsagePage'
import ServicePage from './pages/ServicePage'
import AlertPage from './pages/AlertPage'

export default function App() {
  const { pathname } = useLocation()
  return (
    <div className="max-w-[430px] md:max-w-2xl mx-auto min-h-screen bg-sky-50 flex flex-col">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/link" element={<LinkPage />} />
        <Route path="/bills" element={<BillsPage />} />
        <Route path="/bills/detail" element={<BillDetailPage />} />
        <Route path="/pay" element={<PaymentPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/usage" element={<UsagePage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/alert" element={<AlertPage />} />
      </Routes>
      {pathname !== '/link' && <BottomNav />}
    </div>
  )
}
