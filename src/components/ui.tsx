import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import BieuTuong, { type TenBieuTuong } from './BieuTuong'

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

export function Btn({ children, className = '', to, onClick, outline, disabled, type = 'button' }: BaseProps & { outline?: boolean; disabled?: boolean; type?: 'button' | 'submit' | 'reset' }) {
  const nav = useNavigate()
  const click = () => {
    if (disabled) return
    if (onClick) onClick()
    else if (to) nav(to)
  }
  const style = outline ? 'bg-white text-[#087fc4] border border-[#168fe0]' : 'bg-gradient-to-r from-[#087fc4] to-[#19a8f5] text-white shadow-sm shadow-sky-200'
  return (
    <button type={type} onClick={click} disabled={disabled} className={`flex items-center justify-center gap-2 w-full py-3 rounded-full text-base font-semibold ${style} ${disabled ? 'opacity-40' : ''} ${className}`}>
      {children}
    </button>
  )
}

export function Chip({ children, color }: { children: ReactNode; color: string }) {
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${color}`}>{children}</span>
}

export function Row({ a, b, className = '' }: { a: string; b: string; className?: string }) {
  return (
    <div className="flex justify-between gap-3 py-2 text-base">
      <span className="text-slate-600">{a}</span>
      <b className={`text-right ${className}`}>{b}</b>
    </div>
  )
}

export function Hero({ title, sub, to, icon = 'giotNuoc' }: { title: string; sub: string; to?: string; icon?: TenBieuTuong }) {
  const nav = useNavigate()
  return (
    <div onClick={to ? () => nav(to) : undefined} className="mx-4 mb-3 rounded-2xl bg-gradient-to-r from-[#c8eaff] to-[#eff9ff] p-4 flex items-center">
      <div className="flex-1">
        <div className="text-xl font-bold">{title}</div>
        <div className="text-sm text-slate-600">{sub}</div>
      </div>
      <BieuTuong ten={icon} className="h-10 w-10 shrink-0 text-sky-600" />
    </div>
  )
}

export function Tile({ icon, title, sub, to, color }: { icon: TenBieuTuong; title: string; sub: string; to: string; color: string }) {
  return (
    <Card to={to} className="flex items-center gap-3">
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${color}`}>
        <BieuTuong ten={icon} className="h-5 w-5 text-blue-700" />
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-base font-bold">{title}</div>
        <div className="text-sm text-slate-500">{sub}</div>
      </div>
      <BieuTuong ten="muiTenTrai" className="h-4 w-4 rotate-180 text-slate-400" />
    </Card>
  )
}
