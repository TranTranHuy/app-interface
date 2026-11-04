import { useState } from 'react'
import Header from '../components/Header'
import { Btn, Card, Chip, Row } from '../components/ui'

const methods = [
  { icon: '▦', name: 'QR/VietQR' },
  { icon: '💳', name: 'Thẻ ngân hàng' },
  { icon: '🪙', name: 'Ví điện tử' },
  { icon: '🏦', name: 'Internet Banking' },
]

export default function BillDetailPage() {
  const [pm, setPm] = useState(0)
  return (
    <>
      <Header back="/bills" />
      <h1 className="text-center font-bold text-lg -mt-1 mb-2">Chi tiết hóa đơn</h1>
      <div className="px-4 space-y-3">
        <Card className="flex justify-between">
          <div>
            <b>Hóa đơn tiền nước</b>
            <div className="text-sm">Kỳ hóa đơn: <b>10/2026</b></div>
            <div className="text-xs">Ngày phát hành: 20/10/2026</div>
            <div className="text-xs">Hạn thanh toán: <b className="text-red-600">25/10/2026</b></div>
          </div>
          <div><Chip color="bg-orange-100 text-orange-600">Chưa thanh toán</Chip></div>
        </Card>

        <Card bg="bg-sky-100">
          <b>Nguyễn Văn An</b>
          <div className="text-sm">Mã KH: HG0123456</div>
          <div className="text-xs text-slate-600">📍 Số 123, đường Trần Hưng Đạo, P. Vị Thanh, TP. Vị Thanh, Hậu Giang</div>
        </Card>

        <Card>
          <b>📊 Chỉ số và sản lượng</b>
          <div className="grid grid-cols-4 text-center text-xs mt-2 gap-1">
            <div>Chỉ số cũ<b className="block text-base">1.245</b>m³</div>
            <div>Chỉ số mới<b className="block text-base">1.270</b>m³</div>
            <div>Ngày ghi<b className="block text-sm mt-1">18/10/2026</b></div>
            <div>Tiêu thụ<b className="block text-base">25</b>m³</div>
          </div>
        </Card>

        <Card>
          <b>🧾 Chi tiết thanh toán</b>
          <Row a="Tiền nước (25 m³ x 6.000đ)" b="150.000đ" />
          <Row a="Phí bảo vệ môi trường (5%)" b="7.500đ" />
          <Row a="Phí dịch vụ (2%)" b="3.000đ" />
          <Row a="Thuế GTGT (10%)" b="16.000đ" />
          <div className="flex justify-between items-center bg-blue-50 rounded-lg p-2 mt-1">
            <b>Tổng cộng</b>
            <b className="text-xl">186.500đ</b>
          </div>
        </Card>

        <Card>
          <b>💳 Chọn phương thức thanh toán</b>
          <div className="grid grid-cols-4 gap-2 mt-2 text-center text-[11px]">
            {methods.map((m, i) => (
              <button key={m.name} onClick={() => setPm(i)} className={`rounded-xl p-2 border ${pm === i ? 'border-blue-600 bg-blue-50' : 'border-slate-200'}`}>
                <div className="text-xl">{m.icon}</div>
                {m.name}
              </button>
            ))}
          </div>
        </Card>
        <Btn to="/pay">💳 Thanh toán ngay ›</Btn>
      </div>
    </>
  )
}
