import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import BieuTuong from '../components/BieuTuong'
import { Btn, Card, Row } from '../components/ui'
import { notifications } from '../data/mock'
import { danhDauThongBaoDaDoc } from '../data/trangThaiThongBao'

export default function ThongBaoChiTiet() {
  const navigate = useNavigate()
  const { notificationId } = useParams()
  const notification = notifications.find((item) => item.id === notificationId)
  const relatedPath = notification?.relatedPath

  useEffect(() => {
    if (notification) danhDauThongBaoDaDoc(notification.id)
  }, [notification])

  return (
    <>
      <Header back="/notifications" title="Chi tiết thông báo" />
      <main className="space-y-3 px-4 pb-24">
        {!notification ? (
          <Card className="space-y-3">
            <p className="font-semibold text-slate-900">Không tìm thấy thông báo.</p>
            <Btn to="/notifications">Quay lại danh sách thông báo</Btn>
          </Card>
        ) : (
          <>
            <Card className="!p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sky-100 text-[#087fc4]">
                  <BieuTuong ten={notification.category === 'invoice' ? 'hoaDon' : notification.category === 'water_schedule' ? 'giotNuoc' : 'loa'} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h1 className="font-semibold text-slate-900">{notification.title}</h1>
                  <time className="mt-1 block text-xs text-slate-500" dateTime={notification.createdAt}>{notification.timeLabel}</time>
                </div>
              </div>
              {notification.invoice ? (
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <h2 className="text-center text-lg font-bold tracking-wide text-[#1676db]">THÔNG BÁO TIỀN NƯỚC</h2>
                  <div className="mt-2 divide-y divide-slate-100">
                    <Row a="Kỳ hóa đơn" b={notification.invoice.period} />
                    <Row a="Mã khách hàng" b={notification.invoice.customerCode} />
                    <Row a="Chỉ số cũ" b={`${notification.invoice.previousReading} m³`} />
                    <Row a="Chỉ số mới" b={`${notification.invoice.currentReading} m³`} />
                    <Row a="Lượng tiêu thụ" b={`${notification.invoice.consumption} m³`} />
                    <Row a="Số tiền" b={`${notification.invoice.amount}đ`} />
                    <Row a="Hạn thanh toán" b={notification.invoice.dueDate} />
                    <Row a="Hotline" b={notification.invoice.contactPhone} />
                  </div>
                  <a href={notification.invoice.website} target="_blank" rel="noreferrer" className="mt-3 block break-all text-sm text-[#087fc4] underline">
                    {notification.invoice.website}
                  </a>
                </div>
              ) : (
                <p className="mt-4 border-t border-slate-100 pt-3 text-sm leading-6 text-slate-700">
                  {notification.detail ?? notification.message}
                </p>
              )}
            </Card>
            {relatedPath && (
              <button
                type="button"
                onClick={() => navigate(relatedPath)}
                className="min-h-11 w-full rounded-full bg-[#087fc4] px-4 text-sm font-semibold text-white"
              >
                Xem hóa đơn liên quan
              </button>
            )}
          </>
        )}
      </main>
    </>
  )
}
