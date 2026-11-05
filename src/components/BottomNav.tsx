import { useLocation, useNavigate } from 'react-router-dom'
import BieuTuong, { type TenBieuTuong } from './BieuTuong'

const tabs: { to: string; icon: TenBieuTuong; label: string; match: string[] }[] = [
  { to: '/', icon: 'trangChu', label: 'Trang chủ', match: ['/'] },
  { to: '/bills', icon: 'hoaDon', label: 'Hóa đơn', match: ['/bills', '/bills/detail', '/pay', '/payment/receipt'] },
  { to: '/notifications', icon: 'chuong', label: 'Thông báo', match: ['/notifications'] },
  { to: '/incidents', icon: 'suaChua', label: 'Sự cố', match: ['/incidents'] },
  { to: '/profile', icon: 'nguoiDung', label: 'Tài khoản', match: ['/profile'] },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  const chuyenTrang = useNavigate()
  return (
    <nav aria-label="Điều hướng chính" className="fixed bottom-0 left-1/2 z-10 flex w-full max-w-[430px] -translate-x-1/2 border-t border-sky-100 bg-white/95 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-[0_-4px_16px_rgba(16,87,143,0.06)] md:max-w-2xl">
      {tabs.map((t) => {
        const dangChon = t.match.includes(pathname)
        return (
          <button
            key={t.to}
            type="button"
            aria-current={dangChon ? 'page' : undefined}
            onClick={() => chuyenTrang(t.to)}
            className={`flex min-w-0 flex-1 flex-col items-center gap-1 px-0.5 text-center text-[10px] leading-tight ${dangChon ? 'font-semibold text-[#087fc4]' : 'text-slate-500'}`}
          >
            <BieuTuong ten={t.icon} className="h-5 w-5" />
            <span>{t.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
