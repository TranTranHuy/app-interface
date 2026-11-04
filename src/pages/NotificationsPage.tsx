import { useState } from 'react'
import Header from '../components/Header'
import { Card, Hero } from '../components/ui'

type Kind = 'all' | 'inv' | 'sv'
const items = [
  { kind: 'inv', icon: '📄', title: 'Hóa đơn tháng 10/2026 đã phát hành', body: 'Tổng tiền: 186.500đ', time: '20/10 08:30', to: '/bills/detail', bg: 'bg-white' },
  { kind: 'inv', icon: '🔔', title: 'Nhắc thanh toán hóa đơn', body: 'Hóa đơn tháng 10/2026 sẽ đến hạn trong 3 ngày (25/10/2026).', time: '22/10 09:12', to: '/bills/detail', bg: 'bg-orange-50' },
  { kind: 'inv', icon: '✅', title: 'Thanh toán thành công', body: 'Bạn đã thanh toán hóa đơn tháng 09/2026. Số tiền: 172.400đ', time: '18/09 14:25', to: '/bills', bg: 'bg-white' },
  { kind: 'sv', icon: '📢', title: 'Thông báo tạm ngưng cấp nước', body: 'Từ 22:00 20/10/2026 đến 05:00 21/10/2026 – một phần phường Vị Thanh.', time: '19/10 16:40', to: '/service', bg: 'bg-red-50' },
]

export default function NotificationsPage() {
  const [f, setF] = useState<Kind>('all')
  const tabs: [Kind, string][] = [['all', '🔔 Tất cả (8)'], ['inv', 'Hóa đơn (3)'], ['sv', 'Dịch vụ (5)']]
  return (
    <>
      <Header back="/" />
      <Hero title="Thông báo" sub="Cập nhật nhanh thông tin về hóa đơn, cấp nước và các dịch vụ" />
      <div className="px-4 space-y-3">
        <div className="flex gap-2 text-sm">
          {tabs.map(([k, t]) => (
            <button key={k} onClick={() => setF(k)} className={`flex-1 py-2 rounded-full ${f === k ? 'bg-blue-600 text-white' : 'bg-white'}`}>{t}</button>
          ))}
        </div>
        {items.filter((i) => f === 'all' || i.kind === f).map((i) => (
          <Card key={i.title} to={i.to} bg={i.bg} className="flex gap-3">
            <span className="text-3xl">{i.icon}</span>
            <div className="flex-1">
              <div className="flex justify-between gap-2">
                <b className="text-sm">{i.title}</b>
                <span className="text-[11px] text-slate-500 whitespace-nowrap">{i.time}</span>
              </div>
              <div className="text-sm text-slate-600">{i.body}</div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
