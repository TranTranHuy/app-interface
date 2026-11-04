import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { Card, Hero } from '../components/ui'
import { usageMonths, usageTable, usageVolumes } from '../data/mock'

export default function UsagePage() {
  const nav = useNavigate()
  const [range, setRange] = useState(12)
  const n = Math.min(range, 12)
  const vols = usageVolumes.slice(-n)
  const labels = usageMonths.slice(-n)

  return (
    <>
      <Header back="/" />
      <Hero title="Lịch sử sử dụng nước" sub="Theo dõi sản lượng và chi phí theo tháng" />
      <div className="px-4 space-y-3">
        <div className="flex bg-white rounded-full p-1 text-sm">
          {[6, 12, 24].map((r) => (
            <button key={r} onClick={() => setRange(r)} className={`flex-1 py-2 rounded-full ${range === r ? 'bg-blue-600 text-white' : ''}`}>{r} tháng</button>
          ))}
        </div>

        <Card>
          <b>📊 Biểu đồ sản lượng và số tiền</b>
          <div className="flex items-end gap-1 h-40 mt-3 border-b border-slate-200">
            {vols.map((v, i) => (
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-sky-300 to-sky-500" style={{ height: `${(v * 100) / 40}%` }} />
            ))}
          </div>
          <div className="flex gap-1 text-[10px] text-slate-500">
            {labels.map((l) => <div key={l} className="flex-1 text-center">{l.slice(0, 2)}</div>)}
          </div>
        </Card>

        <Card bg="bg-emerald-50" className="flex items-center gap-3">
          <span className="text-3xl">📉</span>
          <div className="flex-1">
            <b className="text-emerald-700">Tháng này giảm 8%</b>
            <div className="text-xs">so với tháng trước</div>
          </div>
          <div className="text-sm text-right">24 m³ ▼8%<br /><b>186.500đ</b></div>
        </Card>

        <Card to="/alert" bg="bg-red-50"><b className="text-red-600">⚠ Xem ví dụ cảnh báo tiêu thụ bất thường ›</b></Card>

        <Card>
          <b>Chi tiết các tháng gần đây</b>
          {usageTable.map((r) => (
            <div key={r.month} onClick={() => nav('/bills/detail')} className="flex justify-between text-sm py-2 border-b border-slate-100 cursor-pointer">
              <span className="w-20">{r.month}</span>
              <span>{r.m3} m³</span>
              <span>{r.amount}</span>
              <span>›</span>
            </div>
          ))}
        </Card>
      </div>
    </>
  )
}
