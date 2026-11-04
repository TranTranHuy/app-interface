import { useNavigate } from 'react-router-dom'

export default function Header({ back }: { back?: string }) {
  const nav = useNavigate()
  return (
    <div className="flex items-center gap-2 px-4 pt-4 pb-3">
      {back && (
        <button onClick={() => nav(back)} className="text-3xl text-blue-600 pr-1 leading-none">
          ‹
        </button>
      )}
      <span className="text-3xl">💧</span>
      <div className="flex-1 leading-tight">
        <div className="text-xs text-slate-500">Mini App</div>
        <div className="font-bold">Cấp nước Hậu Giang</div>
      </div>
      <button onClick={() => nav('/notifications')} className="text-xl relative">
        🔔
        <i className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
      </button>
    </div>
  )
}
