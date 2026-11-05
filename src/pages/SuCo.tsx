import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import Header from '../components/Header'
import PageBanner from '../components/PageBanner'
import SuccessToast from '../components/SuccessToast'
import { Card, Chip } from '../components/ui'
import {
  incidentCauses as incidentCauseOptions,
  incidentReasonsByType,
  incidentTypeLabels,
  incidents as sampleIncidents,
  mockAccount,
  type Incident,
  type IncidentType,
} from '../data/mock'

export default function SuCo() {
  const [items, setItems] = useState(sampleIncidents)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [appliedDates, setAppliedDates] = useState({ start: '', end: '' })
  const [type, setType] = useState<IncidentType | 'all'>('all')
  const [causeFilter, setCauseFilter] = useState('all')
  const [selected, setSelected] = useState<Incident | null>(null)
  const [creating, setCreating] = useState(false)
  const [draftType, setDraftType] = useState<IncidentType>('water')
  const [draftReason, setDraftReason] = useState(incidentReasonsByType.water[0])
  const [draftCause, setDraftCause] = useState(incidentCauseOptions[0])
  const [attachments, setAttachments] = useState<Incident['attachments']>([])
  const attachmentUrls = useRef(new Set<string>())
  const [notice, setNotice] = useState('')
  const [invalidDateRange, setInvalidDateRange] = useState(false)

  useEffect(() => () => {
    attachmentUrls.current.forEach((url) => URL.revokeObjectURL(url))
  }, [])

  const incidentCauses = Array.from(new Set(items.map((item) => item.cause)))
  const filtered = useMemo(() => items.filter((item) => {
    const dateMatches = (!appliedDates.start || item.date >= appliedDates.start)
      && (!appliedDates.end || item.date <= appliedDates.end)
    return dateMatches
      && (type === 'all' || item.type === type)
      && (causeFilter === 'all' || item.cause === causeFilter)
  }), [items, appliedDates, type, causeFilter])

  function discardDraftAttachments() {
    attachments.forEach((attachment) => {
      URL.revokeObjectURL(attachment.url)
      attachmentUrls.current.delete(attachment.url)
    })
    setAttachments([])
  }

  function openCreateForm(incidentType: IncidentType) {
    setDraftType(incidentType)
    setDraftReason(incidentReasonsByType[incidentType][0])
    setDraftCause(incidentCauseOptions[0])
    discardDraftAttachments()
    setNotice('')
    setCreating(true)
  }

  function closeDialogs() {
    if (creating) discardDraftAttachments()
    setSelected(null)
    setCreating(false)
  }

  function searchByDate() {
    if (startDate && endDate && startDate > endDate) {
      setInvalidDateRange(true)
      return
    }
    setInvalidDateRange(false)
    setAppliedDates({ start: startDate, end: endDate })
  }

  function selectAttachments(files: FileList | null) {
    const imageFiles = Array.from(files ?? []).filter((file) => file.type.startsWith('image/'))
    const nextAttachments = imageFiles.map((file) => ({ name: file.name, url: URL.createObjectURL(file) }))
    nextAttachments.forEach((attachment) => attachmentUrls.current.add(attachment.url))
    setAttachments((current) => {
      current.forEach((attachment) => {
        URL.revokeObjectURL(attachment.url)
        attachmentUrls.current.delete(attachment.url)
      })
      return nextAttachments
    })
  }

  function createIncident(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: Replace this mock-only save with the incident API when its contract is available.
    const formData = new FormData(event.currentTarget)
    const description = String(formData.get('description') ?? '').trim()
    const now = new Date()
    const newIncident: Incident = {
      id: `SC-DEMO-${Date.now()}`,
      type: draftType,
      reason: draftReason,
      cause: draftCause,
      description,
      address: mockAccount.address,
      date: [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-'),
      status: 'Mới tiếp nhận',
      attachments,
      technicianNotes: [],
    }
    setItems((current) => [newIncident, ...current])
    setAttachments([])
    setCreating(false)
    setNotice('Gửi báo sự cố thành công.')
    event.currentTarget.reset()
  }

  return (
    <>
      <Header title="Mini App" />
      <SuccessToast message={notice} onClose={() => setNotice('')} />
      <main className="space-y-4 px-4">
        <PageBanner title="Quản lý sự cố" description="Gửi báo sự cố và theo dõi tiến độ xử lý." />

        <Card className="!p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-[#124b84]">Báo sự cố mới</h2>
              <p className="mt-0.5 text-xs text-slate-500">Mô tả vấn đề để chúng tôi hỗ trợ xử lý.</p>
            </div>
            <button type="button" onClick={() => openCreateForm(type === 'all' ? 'water' : type)} className="min-h-11 shrink-0 rounded-full bg-gradient-to-r from-[#087fc4] to-[#19a8f5] px-4 text-sm font-semibold text-white">
              Tạo sự cố
            </button>
          </div>
        </Card>

        <Card className="space-y-3 !p-3">
          <div>
            <p className="mb-1 text-xs font-medium text-slate-600">Lọc theo ngày gửi</p>
            <div className="grid grid-cols-2 gap-2">
              <label className="text-xs text-slate-500">
                Từ ngày
                <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} className="mt-1 min-h-11 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-2 text-sm text-slate-900" />
              </label>
              <label className="text-xs text-slate-500">
                Đến ngày
                <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} className="mt-1 min-h-11 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-2 text-sm text-slate-900" />
              </label>
            </div>
            <button type="button" onClick={searchByDate} className="mt-2 min-h-11 w-full rounded-lg bg-[#087fc4] px-4 text-sm font-semibold text-white">Tìm kiếm</button>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label className="text-xs font-medium text-slate-600">
              Loại sự cố
              <select value={type} onChange={(event) => setType(event.target.value as IncidentType | 'all')} className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-2 text-sm text-slate-900">
                <option value="all">Tất cả loại</option>
                {Object.entries(incidentTypeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <label className="text-xs font-medium text-slate-600">
              Nguyên nhân
              <select value={causeFilter} onChange={(event) => setCauseFilter(event.target.value)} className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-2 text-sm text-slate-900">
                <option value="all">Tất cả nguyên nhân</option>
                {incidentCauses.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
          </div>
        </Card>

        {invalidDateRange && <p role="alert" className="text-sm text-red-600">Ngày bắt đầu phải trước hoặc bằng ngày kết thúc.</p>}
        <section className="space-y-3" aria-label="Kết quả sự cố">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#124b84]">Sự cố gần đây</h2>
            <span className="text-xs text-slate-500">{filtered.length} yêu cầu</span>
          </div>
          {filtered.length === 0 && <Card className="text-sm text-slate-600">Không tìm thấy sự cố phù hợp.</Card>}
          {filtered.map((item) => (
            <button key={item.id} type="button" onClick={() => setSelected(item)} className="block w-full text-left">
              <Card className="border border-slate-100 !p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sky-100 text-[#087fc4]" aria-hidden="true">
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3 2.8 20h18.4L12 3zM12 9v5M12 17.5h.01" />
                        </svg>
                      </span>
                      <p className="font-semibold text-slate-900">{incidentTypeLabels[item.type]}</p>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{item.description || item.reason}</p>
                    <p className="mt-2 text-xs text-slate-500">{item.address}</p>
                  </div>
                  <span className="shrink-0 text-slate-400" aria-hidden="true">›</span>
                </div>
                <div className="mt-3 flex justify-between text-xs text-slate-500">
                  <Chip color={item.status === 'Đang xử lý' ? 'bg-orange-100 text-orange-700' : item.status === 'Đã hoàn tất' ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-[#087fc4]'}>{item.status}</Chip>
                  <time className="self-center" dateTime={item.date}>{new Date(`${item.date}T00:00:00`).toLocaleDateString('vi-VN')}</time>
                </div>
                <p className="mt-2 text-[11px] text-slate-400">{item.id} · {item.reason} · {item.cause}</p>
              </Card>
            </button>
          ))}
        </section>
      </main>

      {(selected || creating) && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4" role="presentation" onClick={closeDialogs}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="incident-dialog-title"
            className="max-h-[90dvh] w-full max-w-[430px] overflow-y-auto rounded-2xl bg-white p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 id="incident-dialog-title" className="font-semibold text-slate-900">{creating ? 'Tạo sự cố' : 'Chi tiết sự cố'}</h2>
              <button type="button" aria-label="Đóng" onClick={closeDialogs} className="min-h-11 min-w-11 text-xl text-slate-600">×</button>
            </div>
            {selected ? (
              <div className="space-y-3 text-sm">
                <p><b>Mã yêu cầu:</b> {selected.id}</p>
                <p><b>Loại yêu cầu:</b> {incidentTypeLabels[selected.type]}</p>
                <p><b>Lý do:</b> {selected.reason}</p>
                <p><b>Nguyên nhân:</b> {selected.cause}</p>
                <p><b>Ghi chú:</b> {selected.description || 'Không có ghi chú'}</p>
                <p><b>Địa chỉ:</b> {selected.address}</p>
                <p><b>Ngày gửi:</b> {new Date(`${selected.date}T00:00:00`).toLocaleDateString('vi-VN')}</p>
                <p><b>Trạng thái:</b> {selected.status}</p>
                <div>
                  <b>Hình ảnh đính kèm:</b>
                  {selected.attachments.length === 0
                    ? <p className="mt-1 text-slate-500">Không có hình ảnh.</p>
                    : <div className="mt-2 grid grid-cols-2 gap-2">{selected.attachments.map((image) => <img key={image.url} src={image.url} alt={image.name} className="max-h-40 w-full rounded-lg border border-slate-200 object-cover" />)}</div>}
                </div>
                <div>
                  <b>Ghi chú của nhân viên:</b>
                  {selected.technicianNotes.length === 0
                    ? <p className="mt-1 text-slate-500">Chưa có cập nhật từ nhân viên.</p>
                    : <ul className="mt-1 list-inside list-disc space-y-1 text-slate-700">{selected.technicianNotes.map((note) => <li key={note}>{note}</li>)}</ul>}
                </div>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={createIncident}>
                <label className="block text-sm font-medium text-slate-700">
                  Loại yêu cầu
                  <select name="type" required value={draftType} onChange={(event) => {
                    const nextType = event.target.value as IncidentType
                    setDraftType(nextType)
                    setDraftReason(incidentReasonsByType[nextType][0])
                  }} className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3">
                    {Object.entries(incidentTypeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Lý do
                  <select name="reason" required value={draftReason} onChange={(event) => setDraftReason(event.target.value)} className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3">
                    {incidentReasonsByType[draftType].map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Nguyên nhân
                  <select name="cause" required value={draftCause} onChange={(event) => setDraftCause(event.target.value)} className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3">
                    {incidentCauseOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Ghi chú <span className="font-normal text-slate-500">(không bắt buộc)</span>
                  <textarea name="description" maxLength={500} rows={3} className="mt-1 w-full rounded-lg border border-slate-300 p-3" placeholder="Nhập thêm thông tin để nhân viên hỗ trợ" />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Hình ảnh hiện trường <span className="font-normal text-slate-500">(không bắt buộc)</span>
                  <input name="attachments" type="file" accept="image/*" capture="environment" multiple onChange={(event) => selectAttachments(event.target.files)} className="mt-1 block min-h-11 w-full rounded-lg border border-slate-300 p-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2" />
                </label>
                {attachments.length > 0 && <div className="grid grid-cols-3 gap-2">{attachments.map((image) => <img key={image.url} src={image.url} alt={`Ảnh đã chọn: ${image.name}`} className="h-20 w-full rounded-lg border border-slate-200 object-cover" />)}</div>}
                <p className="text-xs text-slate-500">Địa chỉ hợp đồng: {mockAccount.address}</p>
                <button type="submit" className="min-h-11 w-full rounded-full bg-gradient-to-r from-[#087fc4] to-[#19a8f5] px-4 font-semibold text-white">Gửi báo sự cố</button>
              </form>
            )}
          </section>
        </div>
      )}
    </>
  )
}
