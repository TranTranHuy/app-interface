import { useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  { to: '/', icon: 'home', label: 'Trang chủ', match: ['/'] },
  { to: '/bills', icon: 'bill', label: 'Quản lý hóa đơn', match: ['/bills', '/bills/detail', '/pay'] },
  { to: '/notifications', icon: 'notice', label: 'Quản lý thông báo', match: ['/notifications'] },
  { to: '/incidents', icon: 'incident', label: 'Quản lý sự cố', match: ['/incidents'] },
  { to: '/profile', icon: 'account', label: 'Thông tin tài khoản', match: ['/profile', '/link'] },
]

function NavIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    home: 'M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z',
    bill: 'M6 3h12v18l-3-2-3 2-3-2-3 2z M9 8h6 M9 12h6',
    notice: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9 M10 21h4',
    incident: 'M12 3 2.8 20h18.4L12 3z M12 9v5 M12 17.5h.01',
    account: 'M20 21a8 8 0 0 0-16 0 M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10z',
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  )
}

export default function BottomNav() {
  const { pathname } = useLocation()
  const nav = useNavigate()
  return (
    <nav aria-label="Điều hướng chính" className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] md:max-w-2xl bg-white/95 border-t border-sky-100 shadow-[0_-4px_16px_rgba(16,87,143,0.06)] flex pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] z-10">
      {tabs.map((t) => {
        const on = t.match.includes(pathname)
        return (
          <button
            key={t.to}
            type="button"
            aria-current={on ? 'page' : undefined}
            onClick={() => nav(t.to)}
            className={`flex min-w-0 flex-1 flex-col items-center gap-1 px-0.5 text-center text-[9px] leading-tight sm:text-[10px] ${on ? 'font-semibold text-[#087fc4]' : 'text-slate-500'}`}
          >
            <NavIcon name={t.icon} />
            <span>{t.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
