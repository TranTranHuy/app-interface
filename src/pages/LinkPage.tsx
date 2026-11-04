import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { Btn, Card, Hero, Row } from '../components/ui'

export default function LinkPage() {
  const nav = useNavigate()
  const [found, setFound] = useState(false)
  const [ok, setOk] = useState(false)

  return (
    <>
      <Header back="/" />
      <Hero title="Liên kết mã khách hàng" sub="Liên kết để tra cứu, thanh toán hóa đơn nhanh chóng, chính xác." />
      <div className="px-4 space-y-3">
        <Card className="p-4 space-y-3">
          <label className="block text-sm font-semibold">
            Mã khách hàng
            <input className="mt-1 w-full border border-slate-300 rounded-lg p-2.5 font-normal" defaultValue="HG0123456" />
          </label>
          <label className="block text-sm font-semibold">
            Số điện thoại
            <input className="mt-1 w-full border border-slate-300 rounded-lg p-2.5 font-normal" defaultValue="0912 345 678" />
          </label>
          <Btn onClick={() => setFound(true)}>🔍 Tra cứu thông tin ›</Btn>
        </Card>

        {found && (
          <Card className="p-4">
            <b className="text-emerald-600">✔ Thông tin khách hàng</b>
            <div className="bg-blue-50 rounded-lg px-3 mt-2">
              <Row a="Họ tên" b="Nguyễn Văn An" />
              <Row a="Địa chỉ" b="Số 123, đường Nguyễn Trãi, P. Vị Thanh, TP. Vị Thanh, Hậu Giang" />
              <Row a="Loại khách hàng" b="Hộ gia đình" />
              <Row a="Trạng thái" b="Đang hoạt động" className="text-emerald-600" />
            </div>
            <label className="flex gap-2 text-sm mt-3">
              <input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} />
              Tôi xác nhận các thông tin trên là đúng và đồng ý liên kết mã khách hàng này với tài khoản Zalo.
            </label>
            <Btn className="mt-3" disabled={!ok} onClick={() => nav('/')}>🔗 Liên kết ngay ›</Btn>
          </Card>
        )}
        <p className="text-xs text-slate-500">🔒 Thông tin của bạn được bảo mật và chỉ dùng cho mục đích tra cứu, thanh toán hóa đơn.</p>
      </div>
    </>
  )
}
