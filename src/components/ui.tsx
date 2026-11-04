import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

type BaseProps = { children?: ReactNode; className?: string; to?: string; onClick?: () => void }

export function Card({ children, className = '', to, onClick, bg = 'bg-white' }: BaseProps & { bg?: string }) {
  const nav = useNavigate()
  const click = onClick ?? (to ? () => nav(to) : undefined)
  return (
    <div onClick={click} className={`${bg} rounded-2xl shadow-sm p-3 ${click ? 'cursor-pointer' : ''} ${className}`}>
      {children}
    </div>
  )
}

export function Btn({ children, className = '', to, onClick, outline, disabled }: BaseProps & { outline?: boolean; disabled?: boolean }) {
  const nav = useNavigate()
  const click = () => {
    if (disabled) return
    if (onClick) onClick()
    else if (to) nav(to)
  }
  const style = outline ? 'bg-white text-blue-600 border border-blue-600' : 'bg-gradient-to-r from-blue-600 to-sky-500 text-white'
  return (
    <button onClick={click} className={`flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold ${style} ${disabled ? 'opacity-40' : ''} ${className}`}>
      {children}
    </button>
  )
}

export function Chip({ children, color }: { children: ReactNode; color: string }) {
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${color}`}>{children}</span>
}

export function Row({ a, b, className = '' }: { a: string; b: string; className?: string }) {
  return (
    <div className="flex justify-between gap-3 py-1.5 text-sm">
      <span className="text-slate-600">{a}</span>
      <b className={`text-right ${className}`}>{b}</b>
    </div>
  )
}

export function Hero({ title, sub, to }: { title: string; sub: string; to?: string }) {
  const nav = useNavigate()
  return (
    <div onClick={to ? () => nav(to) : undefined} className="mx-4 mb-3 p-4 rounded-2xl bg-gradient-to-r from-sky-200 to-sky-50 flex items-center">
      <div className="flex-1">
        <div className="text-xl font-bold">{title}</div>
        <div className="text-sm text-slate-600">{sub}</div>
      </div>
      <span className="text-5xl">💧</span>
    </div>
  )
}

export function Tile({ icon, title, sub, to, color }: { icon: string; title: string; sub: string; to: string; color: string }) {
  return (
    <Card to={to} className="flex items-center gap-3">
      <span className={`w-11 h-11 shrink-0 rounded-full grid place-items-center text-xl ${color}`}>{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs text-slate-500">{sub}</div>
      </div>
      <span className="text-slate-400">›</span>
    </Card>
  )
}
