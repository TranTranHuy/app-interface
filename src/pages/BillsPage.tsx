import { useState } from 'react'
import Header from '../components/Header'
import { Btn, Card, Chip, Hero } from '../components/ui'
import { paidBills } from '../data/mock'

type BillProps = { month: string; amount: string; m3: number; date: string; paid: boolean }

function BillCard({ month, amount, m3, date, paid }: BillProps) {
  return (
    <Card bg={paid ? 'bg-white' : 'bg-orange-50'}>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xs text-slate-500">Kỳ hóa đơn</div>
          <b>Tháng {month}</b>
        </div>
        <Chip color={paid ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-600'}>
          {paid ? '✔ Đã thanh toán' : 'Chưa thanh toán'}
        </Chip>
      </div>
      <div className="flex justify-between items-end mt-2 mb-2">
        <div>
          <div className="text-xs text-slate-500">Số tiền {paid ? '' : 'cần '}thanh toán</div>
          <div className="text-2xl font-extrabold">{amount}<sup>đ</sup></div>
        </div>
        <div className="text-xs text-right">
          Sản lượng: <b>{m3} m³</b>
          <br />
          {paid ? 'Ngày thanh toán' : 'Hạn thanh toán'}: <b className={paid ? 'text-emerald-700' : 'text-red-600'}>{date}</b>
        </div>
      </div>
      {paid ? <Btn outline to="/bills/detail" className="!py-1.5">Xem chi tiết ›</Btn> : <Btn to="/bills/detail">💳 Thanh toán ngay ›</Btn>}
    </Card>
  )
}

export default function BillsPage() {
  const [tab, setTab] = useState<'due' | 'paid'>('due')
  const tabCls = (t: string) => `flex-1 text-center py-2 rounded-full text-sm ${tab === t ? 'bg-blue-600 text-white' : ''}`

  return (
    <>
      <Header back="/" />
      <Hero title="Hóa đơn" sub="Theo dõi các kỳ hóa đơn và trạng thái thanh toán" />
      <div className="px-4 space-y-3">
        <div className="flex bg-white rounded-full p-1">
          <button className={tabCls('due')} onClick={() => setTab('due')}>Cần thanh toán (1)</button>
          <button className={tabCls('paid')} onClick={() => setTab('paid')}>Đã thanh toán (6)</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <Card>🗓 6 tháng gần nhất ⌄</Card>
          <Card>⏷ Tất cả trạng thái ⌄</Card>
        </div>
        {tab === 'due' ? (
          <BillCard month="10/2026" amount="186.500" m3={15} date="25/10/2026" paid={false} />
        ) : (
          paidBills.map((b) => <BillCard key={b.month} {...b} paid />)
        )}
      </div>
    </>
  )
}
