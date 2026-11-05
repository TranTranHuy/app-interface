import { useEffect, useState, type FormEvent } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import PageBanner from '../components/PageBanner'
import { Card, Row } from '../components/ui'
import { mockAccount } from '../data/mock'

type ProfileDialog = 'reading' | 'password' | null

export default function ThongTinTaiKhoan() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [loggedIn, setLoggedIn] = useState(true)
  const [message, setMessage] = useState('')
  const [dialog, setDialog] = useState<ProfileDialog>(null)
  const [readingImage, setReadingImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [readingValue, setReadingValue] = useState(String(mockAccount.currentWaterReading + 5))
  const [readingDate, setReadingDate] = useState('')
  const readingConsumption = Math.max(0, Number(readingValue) - mockAccount.currentWaterReading)
  const openReadingDialog = searchParams.get('dialog') === 'reading'

  useEffect(() => {
    if (openReadingDialog) {
      setDialog('reading')
      setSearchParams({}, { replace: true })
    }
  }, [openReadingDialog, setSearchParams])

  useEffect(() => {
    if (!readingImage) {
      setImagePreview('')
      return
    }

    const previewUrl = URL.createObjectURL(readingImage)
    setImagePreview(previewUrl)
    return () => URL.revokeObjectURL(previewUrl)
  }, [readingImage])

  function submitForm(event: FormEvent<HTMLFormElement>, successMessage: string) {
    event.preventDefault()
    setMessage(successMessage)
    event.currentTarget.reset()
    setDialog(null)
    setReadingImage(null)
  }

  function submitReading(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(`Đã ghi nhận khai báo chỉ số ${Number(readingValue).toLocaleString('vi-VN')} m³ trên dữ liệu mẫu.`)
    event.currentTarget.reset()
    setDialog(null)
    setReadingImage(null)
    setReadingValue(String(mockAccount.currentWaterReading + 5))
    setReadingDate('')
  }

  function closeDialog() {
    setDialog(null)
    setReadingImage(null)
  }

  return (
    <>
      <Header title="Thông tin tài khoản" />
      <main className="space-y-3 px-4 pb-24">
        <PageBanner title="Thông tin tài khoản" description="Quản lý hồ sơ, hợp đồng và tiện ích tài khoản." />

        {!loggedIn ? (
          <Card className="space-y-3 !p-4">
            <p className="font-semibold text-slate-900">Bạn đã đăng xuất khỏi tài khoản.</p>
            <button type="button" onClick={() => setLoggedIn(true)} className="min-h-11 w-full rounded-full bg-[#087fc4] px-4 font-semibold text-white">Đăng nhập lại </button>
          </Card>
        ) : (
          <>
            <Card className="!p-4">
              <h2 className="mb-2 font-semibold text-slate-900">Hồ sơ cá nhân</h2>
              <Row a="Họ và tên" b={mockAccount.fullName} />
              <Row a="Số điện thoại" b={mockAccount.phone} />
              <Row a="Mã khách hàng" b={mockAccount.customerCode} />
              <Row a="Địa chỉ" b={mockAccount.address} />
            </Card>

            <Card className="!p-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold text-slate-900">Hợp đồng đang liên kết</h2>
              </div>
              <Row a="Mã khách hàng" b={mockAccount.customerCode} />
              <Row a="Tên hợp đồng" b={mockAccount.contractName} />
              <Row a="Trạng thái" b={mockAccount.contractStatus} className="text-slate-700" />
            </Card>

            <Card className="!p-4">
              <h2 className="mb-2 font-semibold text-slate-900">Tiện ích tài khoản</h2>
              <div className="space-y-2">
                <button type="button" onClick={() => setDialog('reading')} className="min-h-11 w-full rounded-lg border border-slate-200 px-3 text-left font-medium text-slate-800">
                  Khai báo chỉ số nước
                </button>
                <button type="button" onClick={() => setDialog('password')} className="min-h-11 w-full rounded-lg border border-slate-200 px-3 text-left font-medium text-slate-800">
                  Đổi mật khẩu
                </button>
              </div>
            </Card>

            {message && <p role="status" className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700">{message}</p>}

            <button type="button" onClick={() => { setLoggedIn(false); setMessage('') }} className="min-h-11 w-full rounded-full border border-slate-300 bg-white px-4 font-semibold text-slate-700">
              Đăng xuất
            </button>
          </>
        )}
      </main>

      {dialog && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4" role="presentation" onClick={closeDialog}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-dialog-title"
            className="max-h-[90dvh] w-full max-w-[430px] overflow-y-auto rounded-2xl bg-white p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 id="profile-dialog-title" className="font-semibold text-slate-900">
                {dialog === 'reading' ? 'Khai báo chỉ số nước' : 'Đổi mật khẩu'}
              </h2>
              <button type="button" aria-label="Đóng" onClick={closeDialog} className="min-h-11 min-w-11 text-xl text-slate-600">×</button>
            </div>

            {dialog === 'reading' ? (
              <form className="space-y-3" onSubmit={submitReading}>
                <p className="text-sm text-slate-600">Chỉ số cũ: <b>{mockAccount.currentWaterReading.toLocaleString('vi-VN')} m³</b></p>
                <label className="block text-sm font-medium text-slate-700">
                  Chỉ số mới
                  <input
                    name="reading"
                    required
                    min={mockAccount.currentWaterReading + 1}
                    step="1"
                    type="number"
                    inputMode="numeric"
                    value={readingValue}
                    onChange={(event) => setReadingValue(event.target.value)}
                    className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 px-3"
                    placeholder="Nhập chỉ số trên đồng hồ"
                  />
                </label>
                <p className="text-xs text-slate-500">Lượng tiêu thụ dự kiến: <b>{readingConsumption} m³</b>. Chỉ số mới phải lớn hơn chỉ số cũ.</p>
                <label className="block text-sm font-medium text-slate-700">
                  Ngày chụp/chốt chỉ số
                  <input name="readingDate" required type="date" value={readingDate} onChange={(event) => setReadingDate(event.target.value)} className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 px-3" />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Ảnh đồng hồ nước <span className="text-red-600">(bắt buộc)</span>
                  <input
                    name="readingImage"
                    required
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(event) => setReadingImage(event.target.files?.[0] ?? null)}
                    className="mt-1 block min-h-11 w-full rounded-lg border border-slate-300 p-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2"
                  />
                </label>
                {imagePreview && <img src={imagePreview} alt="Ảnh đồng hồ nước đã chọn" className="max-h-56 w-full rounded-lg border border-slate-200 object-contain" />}
                <p className="text-xs text-slate-500">Chọn hoặc chụp ảnh rõ mặt đồng hồ để xác minh chỉ số.</p>
                <button type="submit" className="min-h-11 w-full rounded-full bg-gradient-to-r from-[#087fc4] to-[#19a8f5] px-4 font-semibold text-white">Gửi khai báo</button>
              </form>
            ) : (
              <form className="space-y-3" onSubmit={(event) => submitForm(event, 'Đã kiểm tra biểu mẫu đổi mật khẩu.')}>
                <label className="block text-sm font-medium text-slate-700">
                  Mật khẩu hiện tại
                  <input name="currentPassword" required type="password" autoComplete="current-password" className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 px-3" />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Mật khẩu mới
                  <input name="newPassword" required minLength={8} type="password" autoComplete="new-password" className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 px-3" />
                </label>
                <button type="submit" className="min-h-11 w-full rounded-full bg-gradient-to-r from-[#087fc4] to-[#19a8f5] px-4 font-semibold text-white">Xác nhận đổi mật khẩu</button>
              </form>
            )}
          </section>
        </div>
      )}
    </>
  )
}
