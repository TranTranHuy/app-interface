import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { luuPhienDangNhap, taiKhoanDemo } from '../xacThuc'
import BieuTuong from '../components/BieuTuong'
import LogoHauGiang from '../components/LogoHauGiang'
import { Btn } from '../components/ui'

export default function DangNhap() {
  const chuyenTrang = useNavigate()
  const [tenDangNhap, datTenDangNhap] = useState('')
  const [matKhau, datMatKhau] = useState('')
  const [ghiNhoToi, datGhiNhoToi] = useState(false)
  const [loiDangNhap, datLoiDangNhap] = useState('')

  function xuLyDangNhap(suKien: FormEvent<HTMLFormElement>) {
    suKien.preventDefault()

    const tenDangNhapChuanHoa = tenDangNhap.trim().toLocaleLowerCase('vi')
    const soDienThoaiNhap = tenDangNhap.replace(/\D/g, '')
    const dungTenDangNhap = tenDangNhapChuanHoa === taiKhoanDemo.maKhachHang.toLocaleLowerCase('vi') ||
      soDienThoaiNhap === taiKhoanDemo.soDienThoai

    if (!dungTenDangNhap || matKhau !== taiKhoanDemo.matKhau) {
      datLoiDangNhap('Số điện thoại hoặc mật khẩu chưa chính xác.')
      return
    }

    luuPhienDangNhap(ghiNhoToi)
    chuyenTrang('/', { replace: true })
  }

  return (
    <main className="flex flex-1 flex-col justify-center px-5 py-8">
      <div className="mb-6 text-center">
        <LogoHauGiang className="mx-auto mb-3 h-20 w-20 rounded-full bg-white object-contain p-1 shadow-sm" />
        <p className="text-sm text-slate-500">Mini App</p>
        <h1 className="text-2xl font-bold text-blue-900">Cấp nước Hậu Giang</h1>
        <p className="mt-2 text-sm text-slate-600">Đăng nhập tài khoản Wasspro để sử dụng dịch vụ cấp nước</p>
      </div>

      <form onSubmit={xuLyDangNhap} className="space-y-4 rounded-2xl bg-white p-5 shadow-sm">
        <label className="block text-sm font-semibold">
          Tên đăng nhập
          <span className="mt-1 block text-xs font-normal text-slate-500">Mã khách hàng hoặc số điện thoại</span>
          <input
            type="text"
            autoComplete="username"
            inputMode="text"
            required
            value={tenDangNhap}
            onChange={(suKien) => {
              datTenDangNhap(suKien.target.value)
              datLoiDangNhap('')
            }}
            placeholder="Nhập mã KH hoặc số điện thoại"
            className="mt-1 w-full rounded-lg border border-slate-300 p-3 font-normal"
          />
        </label>
        <label className="block text-sm font-semibold">
          Mật khẩu
          <input
            type="password"
            autoComplete="current-password"
            required
            value={matKhau}
            onChange={(suKien) => {
              datMatKhau(suKien.target.value)
              datLoiDangNhap('')
            }}
            placeholder="Nhập mật khẩu"
            className="mt-1 w-full rounded-lg border border-slate-300 p-3 font-normal"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={ghiNhoToi}
            onChange={(suKien) => datGhiNhoToi(suKien.target.checked)}
            className="h-4 w-4 rounded border-slate-300 accent-blue-600"
          />
          Ghi nhớ tôi
        </label>
        {loiDangNhap && <p role="alert" className="text-sm text-red-600">{loiDangNhap}</p>}
        <Btn className="!mt-5" type="submit">Đăng nhập</Btn>
        <p className="text-center text-xs text-slate-500">
          Tài khoản demo: <b>{taiKhoanDemo.soDienThoai.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')}</b> hoặc <b>{taiKhoanDemo.maKhachHang}</b> · Mật khẩu: <b>{taiKhoanDemo.matKhau}</b>
        </p>
      </form>

      <Btn to="/guide" outline className="mt-4">
        <BieuTuong ten="huongDan" className="h-5 w-5" />
        Hướng dẫn sử dụng
      </Btn>
      <a
        href="tel:02933572019"
        className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-blue-800 shadow-sm"
      >
        <BieuTuong ten="dienThoai" className="h-5 w-5 text-blue-600" />
        Hotline CSKH: 02933 572 019
      </a>
      <p className="mt-4 text-center text-xs text-slate-500">
        Bản demo giao diện; đăng nhập chưa kết nối API Wasspro.
      </p>
    </main>
  )
}
