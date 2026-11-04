import { useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  { to: '/', icon: '🏠', label: 'Trang chủ', match: ['/', '/notifications'] },
  { to: '/bills', icon: '🧾', label: 'Hóa đơn', match: ['/bills', '/bills/detail', '/pay'] },
  { to: '/usage', icon: '📊', label: 'Sử dụng nước', match: ['/usage', '/alert'] },
  { to: '/service', icon: '📦', label: 'Dịch vụ', match: ['/service'] },
  { to: '/link', icon: '👤', label: 'Tài khoản', match: ['/link'] },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  const nav = useNavigate()
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] md:max-w-2xl bg-white border-t border-slate-200 flex pt-1.5 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] z-10">
      {tabs.map((t) => {
        const on = t.match.includes(pathname)
        return (
          <button key={t.to} onClick={() => nav(t.to)} className={`flex-1 text-[11px] ${on ? 'text-blue-600 font-bold' : 'text-slate-500'}`}>
            <div className="text-xl">{t.icon}</div>
            {t.label}
          </button>
        )
      })}
    </nav>
  )
}
