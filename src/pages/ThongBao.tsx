import { useEffect, useState, useSyncExternalStore } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import PageBanner from '../components/PageBanner'
import { Card } from '../components/ui'
import { notifications, type NotificationCategory, type NotificationItem } from '../data/mock'
import { dangKyThayDoiThongBao, danhDauThongBaoDaDoc, danhSachThongBaoDaDoc, layThongBaoDaDoc } from '../data/trangThaiThongBao'

type Filter = 'all' | NotificationCategory

const categoryLabels: Record<NotificationCategory, string> = {
  invoice: 'Tiền nước',
  water_schedule: 'Lịch cấp nước',
  operations: 'Tin tức vận hành',
}

function NoticeIcon({ category }: { category: NotificationCategory }) {
  const icon = category === 'invoice' ? 'invoice' : category === 'water_schedule' ? 'water' : 'news'
  return (
    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${icon === 'invoice' ? 'bg-sky-100 text-[#087fc4]' : icon === 'water' ? 'bg-cyan-100 text-cyan-700' : 'bg-indigo-100 text-indigo-700'}`}>
      {icon === 'invoice' ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 3.75h8l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.75a1 1 0 0 1 1-1zM14 4v4h4M8 13h8M8 17h8" />
        </svg>
      ) : icon === 'water' ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11zM9 15a3 3 0 0 0 3 3" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 5h16v12H8l-4 3zM8 9h8M8 13h5" />
        </svg>
      )}
    </span>
  )
}

export default function ThongBao() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<NotificationItem | null>(null)
  const readState = useSyncExternalStore(dangKyThayDoiThongBao, layThongBaoDaDoc, () => '')
  const readIds = danhSachThongBaoDaDoc(readState)
  const notificationId = searchParams.get('notification')
  const items = notifications
  const filters: [Filter, string][] = [
    ['all', 'Tất cả'],
    ['invoice', 'Tiền nước'],
    ['water_schedule', 'Lịch cấp nước'],
    ['operations', 'Tin tức vận hành'],
  ]
  const visibleItems = items.filter((item) => filter === 'all' || item.category === filter)

  useEffect(() => {
    if (!notificationId) return

    const notification = notifications.find((item) => item.id === notificationId)
    if (notification) {
      danhDauThongBaoDaDoc(notification.id)
      setSelected(notification)
    }
    setSearchParams({}, { replace: true })
  }, [notificationId, setSearchParams])

  function openNotification(item: NotificationItem) {
    // TODO: Replace this mock read-state update with the notification API when its contract is available.
    danhDauThongBaoDaDoc(item.id)

    if (item.relatedPath) {
      navigate(item.relatedPath)
      return
    }

    setSelected({ ...item, read: true })
  }

  return (
    <>
      <Header title="Mini App" />
      <main className="space-y-4 px-4 pb-24">
        <PageBanner title="Thông báo" description="Thông báo tiền nước, lịch cấp nước và tin tức vận hành." image="/banner-thong-bao.png" />

        <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Lọc thông báo">
          {filters.map(([value, label]) => {
            const count = value === 'all' ? items.length : items.filter((item) => item.category === value).length
            return (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                aria-pressed={filter === value}
                className={`min-h-11 shrink-0 rounded-full border px-4 text-sm ${filter === value ? 'border-[#087fc4] bg-[#087fc4] text-white' : 'border-slate-200 bg-white text-slate-700'}`}
              >
                {label} ({count})
              </button>
            )
          })}
        </div>

        <section className="space-y-3" aria-label="Danh sách thông báo">
          <h2 className="text-sm font-semibold text-[#124b84]">Danh sách thông báo</h2>
          {visibleItems.length === 0 && <Card className="border border-slate-100 text-sm text-slate-600">Chưa có thông báo trong mục này.</Card>}
          {visibleItems.map((item) => (
            <button key={item.id} type="button" onClick={() => openNotification(item)} className="block w-full text-left">
              <Card className="border border-slate-100 !p-4">
                <div className="flex items-start gap-3">
                  <NoticeIcon category={item.category} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      {!item.read && !readIds.has(item.id) && <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-red-500" aria-label="Chưa đọc" />}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-600">{item.message}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-[#087fc4]">{categoryLabels[item.category]}</span>
                      <time className="text-[11px] text-slate-500" dateTime={item.createdAt}>{item.timeLabel}</time>
                    </div>
                  </div>
                </div>
              </Card>
            </button>
          ))}
        </section>
      </main>

      {selected && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4" role="presentation" onClick={() => setSelected(null)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="notification-detail-title"
            className="w-full max-w-[430px] rounded-2xl bg-white p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 id="notification-detail-title" className="font-semibold text-slate-900">Chi tiết thông báo</h2>
              <button type="button" aria-label="Đóng" onClick={() => setSelected(null)} className="min-h-11 min-w-11 text-xl text-slate-600">×</button>
            </div>
            {selected.invoice ? (
              <article>
                <h3 className="text-center text-xl font-bold tracking-wide text-[#1676db]">THÔNG BÁO TIỀN NƯỚC</h3>
                <p className="mt-3 text-right text-sm italic text-slate-500">
                  Ngày gửi: <time dateTime={selected.createdAt}>{selected.timeLabel.split(' ')[0]}</time>
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-800">
                  Thông báo tiền nước kỳ {selected.invoice.period}. Mã KH: {selected.invoice.customerCode}. CSC: {selected.invoice.previousReading}. CSM: {selected.invoice.currentReading}. TT: {selected.invoice.consumption}. ST: {selected.invoice.amount} đ. Hạn TT đến ngày {selected.invoice.dueDate}. LH: {selected.invoice.contactPhone}. Chi tiết:{' '}
                  <a href={selected.invoice.website} target="_blank" rel="noreferrer" className="break-all text-[#087fc4] underline">
                    {selected.invoice.website}
                  </a>
                </p>
              </article>
            ) : (
              <>
                <p className="font-semibold text-slate-900">{selected.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{selected.detail ?? selected.message}</p>
                <time className="mt-4 block text-xs text-slate-500" dateTime={selected.createdAt}>{selected.timeLabel}</time>
              </>
            )}
          </section>
        </div>
      )}
    </>
  )
}
