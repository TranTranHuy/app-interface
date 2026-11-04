import { useNavigate } from 'react-router-dom'

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
    </svg>
  )
}

export default function Header({ back, title }: { back?: string; title?: string }) {
  const nav = useNavigate()
  return (
    <header className="flex items-center gap-3 bg-[#e1f3ff] px-4 pt-[calc(1rem+env(safe-area-inset-top,0px))] pb-3">
      {back && (
        <button type="button" aria-label="Quay lại" onClick={() => nav(back)} className="min-h-11 min-w-8 text-2xl text-slate-700 leading-none">
          ‹
        </button>
      )}
      <button type="button" aria-label="Về trang chủ" onClick={() => nav('/')} className="grid min-h-11 min-w-11 place-items-center rounded-full">
        <img src="/logo-cap-nuoc.png" alt="Logo Cấp nước Hậu Giang" className="h-12 w-12 object-contain" />
      </button>
      <div className="flex-1 leading-tight">
        <div className="text-xs text-slate-500">Cấp nước Hậu Giang</div>
        <div className="font-semibold text-[#124b84]">{title ?? 'Mini App'}</div>
      </div>
      <button type="button" aria-label="Mở thông báo" onClick={() => nav('/notifications')} className="relative grid min-h-11 min-w-11 place-items-center rounded-full text-[#087fc4]">
        <BellIcon />
        <span aria-hidden="true" className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-[#e1f3ff] bg-red-500" />
      </button>
    </header>
  )
}
