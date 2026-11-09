import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import PageBanner from '../components/PageBanner'
import SuccessToast from '../components/SuccessToast'
import { Card, Row } from '../components/ui'
import { mockAccount } from '../data/mock'
import { khoaLuuPhienDangNhap } from '../xacThuc'

type ProfileDialog = 'reading' | 'contract' | 'referral' | 'logout' | null
type WatermarkedImage = { file: File; capturedAt: string; coordinates: string }
const referralCodeStorageKey = 'employee-referral-code'

function getPosition(): Promise<GeolocationPosition> {
  if (!navigator.geolocation) return Promise.reject(new Error('Thiết bị hoặc trình duyệt không hỗ trợ lấy vị trí GPS.'))
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      () => reject(new Error('Không lấy được vị trí GPS. Vui lòng cấp quyền vị trí rồi thử lại.')),
      { enableHighAccuracy: true, timeout: 15000 },
    )
  })
}

async function addWatermark(image: File): Promise<WatermarkedImage> {
  const position = await getPosition()
  const bitmap = await createImageBitmap(image)
  const canvas = document.createElement('canvas')
  canvas.width = bitmap.width
  canvas.height = bitmap.height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Không thể xử lý ảnh trên thiết bị này.')

  context.drawImage(bitmap, 0, 0)
  bitmap.close()
  const capturedAt = new Date().toLocaleString('vi-VN')
  const coordinates = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
  const fontSize = Math.max(14, Math.round(canvas.width * 0.025))
  const padding = Math.round(fontSize * 0.7)
  const watermarkHeight = fontSize * 2 + padding * 1.5
  context.fillStyle = 'rgba(0, 0, 0, 0.65)'
  context.fillRect(0, canvas.height - watermarkHeight, canvas.width, watermarkHeight)
  context.fillStyle = '#ffffff'
  context.font = `${fontSize}px sans-serif`
  context.textBaseline = 'top'
  context.fillText(`${capturedAt} | GPS: ${coordinates}`, padding, canvas.height - watermarkHeight + padding / 2)

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => result ? resolve(result) : reject(new Error('Không thể tạo ảnh có dấu thời gian và vị trí.')), 'image/jpeg', 0.9)
  })
  const filename = `${image.name.replace(/\.[^.]+$/, '')}-gps.jpg`
  return { file: new File([blob], filename, { type: 'image/jpeg' }), capturedAt, coordinates }
}

export default function ThongTinTaiKhoan() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [dialog, setDialog] = useState<ProfileDialog>(null)
  const [message, setMessage] = useState('')
  const [formError, setFormError] = useState('')
  const [readingImage, setReadingImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [processingImage, setProcessingImage] = useState(false)
  const [capturedAt, setCapturedAt] = useState('')
  const [coordinates, setCoordinates] = useState('')
  const [previousReading, setPreviousReading] = useState(mockAccount.previousWaterReading)
  const [newReading, setNewReading] = useState('')
  const [referralCode, setReferralCode] = useState('')

  useEffect(() => {
    if (searchParams.get('dialog') !== 'reading') return
    setDialog('reading')
    setSearchParams({}, { replace: true })
  }, [searchParams, setSearchParams])

  useEffect(() => {
    if (!readingImage) {
      setImagePreview('')
      return
    }
    const previewUrl = URL.createObjectURL(readingImage)
    setImagePreview(previewUrl)
    return () => URL.revokeObjectURL(previewUrl)
  }, [readingImage])

  function closeDialog() {
    setDialog(null)
    setFormError('')
    setReadingImage(null)
    setCapturedAt('')
    setCoordinates('')
    setNewReading('')
  }

  function openDialog(nextDialog: Exclude<ProfileDialog, null>) {
    setMessage('')
    setFormError('')
    if (nextDialog === 'referral') {
      try {
        setReferralCode(localStorage.getItem(referralCodeStorageKey) ?? '')
      } catch {
        setReferralCode('')
        setFormError('Không thể đọc mã giới thiệu đã lưu trên thiết bị này.')
      }
    }
    setDialog(nextDialog)
  }

  function submitReferralCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const code = referralCode.trim()
    if (!code) {
      setFormError('Vui lòng nhập mã giới thiệu nhân viên.')
      return
    }
    try {
      // TODO: Submit the user-entered referral code to the referral API when its contract is available.
      localStorage.setItem(referralCodeStorageKey, code)
    } catch {
      setFormError('Không thể lưu mã giới thiệu trên thiết bị này. Vui lòng thử lại.')
      return
    }
    setMessage('Lưu mã giới thiệu thành công.')
    closeDialog()
  }

  async function handleReadingImage(file: File | undefined) {
    setReadingImage(null)
    setCapturedAt('')
    setCoordinates('')
    setFormError('')
    if (!file) return
    setProcessingImage(true)
    try {
      const watermarked = await addWatermark(file)
      setReadingImage(watermarked.file)
      setCapturedAt(watermarked.capturedAt)
      setCoordinates(watermarked.coordinates)
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Không thể xử lý ảnh. Vui lòng thử lại.')
    } finally {
      setProcessingImage(false)
    }
  }

  function submitReading(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: Send the reading, watermarked image, capture time, and GPS to the API once available.
    const reading = Number(newReading)
    if (!Number.isFinite(reading) || reading < previousReading) {
      setFormError(`Chỉ số mới phải lớn hơn hoặc bằng ${previousReading.toLocaleString('vi-VN')} m³.`)
      return
    }
    if (!readingImage) {
      setFormError('Vui lòng chọn ảnh đồng hồ nước và chờ xử lý ảnh hoàn tất.')
      return
    }
    setPreviousReading(reading)
    setMessage(`Khai báo chỉ số thành công. Mức tiêu thụ kỳ này: ${(reading - previousReading).toLocaleString('vi-VN')} m³.`)
    closeDialog()
  }

  function logout() {
    localStorage.removeItem(khoaLuuPhienDangNhap)
    sessionStorage.removeItem(khoaLuuPhienDangNhap)
    closeDialog()
    navigate('/login')
  }

  return (
    <>
      <Header title="Thông tin tài khoản" />
      <SuccessToast message={message} onClose={() => setMessage('')} />
      <main className="space-y-3 px-4 pb-24">
        <PageBanner title="Thông tin tài khoản" description="Quản lý hồ sơ, hợp đồng và tiện ích tài khoản." />

        <Card className="!p-4">
          <h2 className="mb-2 font-semibold text-slate-900">Hồ sơ cá nhân</h2>
          <Row a="Họ và tên" b={mockAccount.fullName} />
          <Row a="Mã khách hàng (IDKH)" b={mockAccount.customerCode} />
          <Row a="Tên đăng nhập" b={mockAccount.username} />
          <Row a="Lộ trình" b={mockAccount.routeCode} />
          <Row a="Địa chỉ" b={mockAccount.address} />
          <Row a="Số điện thoại" b={mockAccount.phone} />
          <Row a="Mã số thuế" b={mockAccount.taxCode} />
          <Row a="Số serial đồng hồ" b={mockAccount.meterSerial} />
          <Row a="Email" b={mockAccount.email} />
        </Card>

        <Card className="space-y-3 !p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold text-slate-900">Hợp đồng đang liên kết</h2>
            <span className="text-xs font-medium text-emerald-700">{mockAccount.contractStatus}</span>
          </div>
          <Row a="Mã khách hàng" b={mockAccount.customerCode} />
          <Row a="Tên hợp đồng" b={mockAccount.contractName} />
          <button type="button" onClick={() => openDialog('contract')} className="min-h-11 w-full rounded-lg border border-slate-200 px-3 text-left font-medium text-[#087fc4]">
            Xem chi tiết hợp đồng và pháp lý
          </button>
        </Card>

        <Card className="!p-4">
          <h2 className="mb-1 font-semibold text-slate-900">Khai báo chỉ số nước</h2>
          <p className="text-sm text-slate-600">Kỳ hiện tại: {mockAccount.currentPeriod} · Chỉ số kỳ trước: {previousReading.toLocaleString('vi-VN')} m³</p>
          <button type="button" onClick={() => openDialog('reading')} className="mt-3 min-h-11 w-full rounded-lg bg-[#087fc4] px-3 font-semibold text-white">
            Khai báo chỉ số
          </button>
        </Card>

        <Card className="!p-4">
          <h2 className="mb-2 font-semibold text-slate-900">Tiện ích tài khoản</h2>
          <div className="space-y-2">
            <button type="button" onClick={() => navigate('/profile/change-password')} className="min-h-11 w-full rounded-lg border border-slate-200 px-3 text-left font-medium text-slate-800">Đổi mật khẩu</button>
            <button type="button" onClick={() => openDialog('referral')} className="min-h-11 w-full rounded-lg border border-slate-200 px-3 text-left font-medium text-slate-800">Mã giới thiệu nhân viên</button>
          </div>
        </Card>

        <button type="button" onClick={() => openDialog('logout')} className="min-h-11 w-full rounded-full border border-slate-300 bg-white px-4 font-semibold text-slate-700">
          Đăng xuất
        </button>
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
                {dialog === 'reading' ? 'Khai báo chỉ số nước'
                  : dialog === 'contract' ? 'Chi tiết hợp đồng'
                    : dialog === 'referral' ? 'Mã giới thiệu nhân viên'
                      : 'Xác nhận đăng xuất'}
              </h2>
              <button type="button" aria-label="Đóng" onClick={closeDialog} className="min-h-11 min-w-11 text-xl text-slate-600">×</button>
            </div>

            {dialog === 'reading' ? (
              <form className="space-y-3" onSubmit={submitReading}>
                <p className="text-sm text-slate-600">Kỳ hiện tại: <b>{mockAccount.currentPeriod}</b></p>
                <p className="text-sm text-slate-600">Chỉ số kỳ trước: <b>{previousReading.toLocaleString('vi-VN')} m³</b></p>
                <label className="block text-sm font-medium text-slate-700">
                  Chỉ số mới (m³)
                  <input name="reading" required min={previousReading} step="any" type="number" inputMode="decimal" value={newReading} onChange={(event) => setNewReading(event.target.value)} className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 px-3" placeholder="Nhập chỉ số trên đồng hồ" />
                </label>
                {newReading !== '' && Number(newReading) >= previousReading && <p className="text-sm text-slate-700">Lượng tiêu thụ dự kiến: <b>{(Number(newReading) - previousReading).toLocaleString('vi-VN')} m³</b></p>}
                <label className="block text-sm font-medium text-slate-700">
                  Ảnh đồng hồ nước <span className="text-red-600">(bắt buộc)</span>
                  <input name="readingImage" required type="file" accept="image/*" capture="environment" disabled={processingImage} onChange={(event) => void handleReadingImage(event.target.files?.[0])} className="mt-1 block min-h-11 w-full rounded-lg border border-slate-300 p-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2" />
                </label>
                {processingImage && <p role="status" className="text-sm text-slate-600">Đang thêm thời gian và vị trí GPS lên ảnh…</p>}
                {imagePreview && <img src={imagePreview} alt="Ảnh đồng hồ nước đã gắn dấu thời gian và GPS" className="max-h-56 w-full rounded-lg border border-slate-200 object-contain" />}
                {capturedAt && <p className="text-xs text-slate-500">Thời gian: {capturedAt} · GPS: {coordinates}</p>}
                <p className="text-xs text-slate-500">Cho phép truy cập vị trí để thêm dấu GPS vào ảnh xác minh.</p>
                {formError && <p role="alert" className="text-sm text-red-600">{formError}</p>}
                <button type="submit" disabled={processingImage} className="min-h-11 w-full rounded-full bg-gradient-to-r from-[#087fc4] to-[#19a8f5] px-4 font-semibold text-white disabled:opacity-50">Lưu khai báo</button>
              </form>
            ) : dialog === 'contract' ? (
              <div className="space-y-1">
                <Row a="Số hợp đồng" b={mockAccount.contractDetails.number} />
                <Row a="Khách hàng" b={mockAccount.fullName} />
                <Row a="Mã khách hàng" b={mockAccount.contractDetails.customerCode} />
                <Row a="Ngày ký" b={mockAccount.contractDetails.signedDate} />
                <Row a="Địa chỉ dịch vụ" b={mockAccount.contractDetails.serviceAddress} />
                <Row a="Đơn vị cấp nước" b={mockAccount.contractDetails.provider} />
                <Row a="Trạng thái" b={mockAccount.contractStatus} />
              </div>
            ) : dialog === 'referral' ? (
              <form className="space-y-3" onSubmit={submitReferralCode}>
                <label className="block text-sm font-medium text-slate-700">
                  Nhập mã giới thiệu nhân viên
                  <input
                    name="referralCode"
                    required
                    maxLength={50}
                    autoComplete="off"
                    value={referralCode}
                    onChange={(event) => setReferralCode(event.target.value)}
                    className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 px-3"
                    placeholder="Nhập mã nhân viên cung cấp"
                  />
                </label>
                {formError && <p role="alert" className="text-sm text-red-600">{formError}</p>}
                <button type="submit" className="min-h-11 w-full rounded-full bg-gradient-to-r from-[#087fc4] to-[#19a8f5] px-4 font-semibold text-white">Gửi mã giới thiệu</button>
              </form>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này không?</p>
                <div className="flex gap-2">
                  <button type="button" onClick={closeDialog} className="min-h-11 flex-1 rounded-full border border-slate-300 px-4 font-semibold text-slate-700">Hủy</button>
                  <button type="button" onClick={logout} className="min-h-11 flex-1 rounded-full bg-[#087fc4] px-4 font-semibold text-white">Đăng xuất</button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  )
}
