import { thongTinKhachHang } from './data/mock'

export const khoaLuuPhienDangNhap = 'hau-giang-demo-authenticated'

export const taiKhoanDemo = {
  maKhachHang: thongTinKhachHang.maKhachHang,
  soDienThoai: thongTinKhachHang.soDienThoai,
  matKhau: '123456',
}

export function daDangNhap(): boolean {
  return sessionStorage.getItem(khoaLuuPhienDangNhap) === 'true' ||
    localStorage.getItem(khoaLuuPhienDangNhap) === 'true'
}

export function luuPhienDangNhap(ghiNho: boolean): void {
  if (ghiNho) {
    localStorage.setItem(khoaLuuPhienDangNhap, 'true')
    sessionStorage.removeItem(khoaLuuPhienDangNhap)
    return
  }

  localStorage.removeItem(khoaLuuPhienDangNhap)
  sessionStorage.setItem(khoaLuuPhienDangNhap, 'true')
}
