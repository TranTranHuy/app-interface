import Header from '../components/Header'
import { Btn, Card, Tile } from '../components/ui'

const bars = [
  { m: '7/2026', v: 18 },
  { m: '8/2026', v: 20 },
  { m: '9/2026', v: 19 },
  { m: '10/2026', v: 28 },
]

export default function AlertPage() {
  return (
    <>
      <Header back="/usage" />
      <h1 className="font-bold text-lg px-4 mb-2">Cảnh báo tiêu thụ bất thường</h1>
      <div className="px-4 space-y-3">
        <Card bg="bg-red-50" className="flex items-center gap-3 p-4">
          <span className="text-4xl">⚠️</span>
          <div className="flex-1">
            <b className="text-red-600">Lượng nước tiêu thụ tháng 10/2026</b>
            <div className="text-red-600">tăng <b className="text-4xl">45%</b></div>
            <div className="text-xs">so với mức trung bình 3 tháng gần nhất.</div>
          </div>
        </Card>

        <Card>
          <b>Biểu đồ lượng tiêu thụ nước</b>
          <div className="flex items-end gap-4 h-36 mt-2 border-b border-slate-200 px-2">
            {bars.map((b, i) => (
              <div key={b.m} className={`flex-1 text-center text-xs font-bold ${i === 3 ? 'text-red-600' : ''}`}>
                {b.v} m³
                <div className={`rounded-t mt-1 ${i === 3 ? 'bg-red-400' : 'bg-sky-300'}`} style={{ height: b.v * 3 }} />
              </div>
            ))}
          </div>
          <div className="flex gap-4 text-[11px] text-slate-500 px-2">
            {bars.map((b) => <div key={b.m} className="flex-1 text-center">Tháng {b.m}</div>)}
          </div>
          <div className="text-xs text-right text-blue-600">TB 3 tháng: 19 m³</div>
        </Card>

        <Card>
          <b>💡 Một số nguyên nhân có thể xảy ra</b>
          <p className="text-sm text-slate-600">Lượng nước tăng cao có thể do rò rỉ nước tại đường ống, thiết bị vệ sinh bị hỏng hoặc quên khóa van sau khi sử dụng.</p>
        </Card>

        <Btn to="/service">🔧 Hướng dẫn kiểm tra rò rỉ ›</Btn>
        <Tile icon="🎧" title="Liên hệ CSKH" sub="Được hỗ trợ nhanh chóng" to="/service" color="bg-emerald-100" />
        <Tile icon="📄" title="Xem lịch sử sử dụng nước" sub="Kiểm tra chi tiết theo từng tháng" to="/usage" color="bg-blue-100" />
      </div>
    </>
  )
}
