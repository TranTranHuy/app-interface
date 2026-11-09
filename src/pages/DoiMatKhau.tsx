import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import BieuTuong from '../components/BieuTuong'
import { Btn, Card } from '../components/ui'

type TruongMatKhau = 'currentPassword' | 'newPassword' | 'confirmPassword'

const nhanTruong: Record<TruongMatKhau, string> = {
  currentPassword: 'Mật khẩu hiện tại',
  newPassword: 'Mật khẩu mới',
  confirmPassword: 'Xác nhận mật khẩu',
}

function BieuTuongMatKhau({ hien }: { hien: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {hien ? (
        <>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
          <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a14.8 14.8 0 0 1-3.2 4.1M6.2 6.3C3.5 8.1 2 12 2 12s3.5 7 10 7c1 0 2-.2 2.9-.5" />
        </>
      )}
    </svg>
  )
}

export default function DoiMatKhau() {
  const navigate = useNavigate()
  const [hienMatKhau, datHienMatKhau] = useState<Record<TruongMatKhau, boolean>>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  })
  const [error, setError] = useState('')
  const [doiThanhCong, datDoiThanhCong] = useState(false)

  function toggleVisibility(field: TruongMatKhau) {
    datHienMatKhau((current) => ({ ...current, [field]: !current[field] }))
  }

  function submitPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const password = String(formData.get('newPassword') ?? '')
    const confirmation = String(formData.get('confirmPassword') ?? '')
    if (password !== confirmation) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp.')
      datDoiThanhCong(false)
      return
    }

    setError('')
    datDoiThanhCong(true)
  }

  return (
    <div className="flex flex-1 flex-col">
      <Header back="/profile" title="Đổi mật khẩu" />
      <main className="flex-1 space-y-3 px-4 pb-24">
        {doiThanhCong ? (
          <Card className="space-y-4 !p-5 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
              <BieuTuong ten="xacNhan" className="h-9 w-9" strokeWidth={2.2} />
            </span>
            <div>
              <h1 role="status" aria-live="polite" className="text-xl font-bold text-emerald-800">Đổi mật khẩu thành công</h1>
              <p className="mt-2 text-sm leading-5 text-slate-600">
                Mật khẩu mới đã được xác nhận trong bản demo.
              </p>
            </div>
            <Btn onClick={() => navigate('/profile')}>Quay lại tài khoản</Btn>
          </Card>
        ) : (
          <Card className="!p-4">
            <p className="mb-4 text-sm text-slate-600">Nhập mật khẩu hiện tại và tạo mật khẩu mới.</p>
            <form onSubmit={submitPassword} className="space-y-4">
              {(Object.keys(nhanTruong) as TruongMatKhau[]).map((field) => (
                <label key={field} className="block text-sm font-medium text-slate-700">
                  {nhanTruong[field]}
                  <span className="mt-1 flex min-h-11 items-center rounded-lg border border-slate-300 bg-white focus-within:border-[#168fe0] focus-within:ring-2 focus-within:ring-sky-100">
                    <input
                      name={field}
                      required
                      minLength={field === 'currentPassword' ? undefined : 8}
                      type={hienMatKhau[field] ? 'text' : 'password'}
                      autoComplete={field === 'currentPassword' ? 'current-password' : 'new-password'}
                      onChange={() => {
                        setError('')
                        datDoiThanhCong(false)
                      }}
                      className="min-w-0 flex-1 rounded-lg bg-transparent px-3 py-2.5 text-base text-slate-900 outline-none"
                    />
                    <button
                      type="button"
                      aria-label={`${hienMatKhau[field] ? 'Ẩn' : 'Hiện'} ${nhanTruong[field].toLocaleLowerCase('vi')}`}
                      aria-pressed={hienMatKhau[field]}
                      onClick={() => toggleVisibility(field)}
                      className="grid h-11 w-11 shrink-0 place-items-center text-slate-500"
                    >
                      <BieuTuongMatKhau hien={hienMatKhau[field]} />
                    </button>
                  </span>
                </label>
              ))}

              {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
              <Btn type="submit">Đổi mật khẩu</Btn>
              <p className="text-center text-xs text-slate-500">
                Bản demo: thao tác chưa kết nối hệ thống tài khoản.
              </p>
            </form>
          </Card>
        )}
      </main>
    </div>
  )
}
