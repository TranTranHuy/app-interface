export type KetQuaThanhToanDemo = 'waiting' | 'success' | 'failed' | 'expired' | 'connection_error'

export type ThanhToanDemo = {
  trangThai: KetQuaThanhToanDemo
  maGiaoDich?: string
  thoiGianThanhToan?: string
}

type DanhSachThanhToanDemo = Record<string, ThanhToanDemo>

const listeners = new Set<() => void>()
let danhSachThanhToanDemo: DanhSachThanhToanDemo = {}

export function dangKyThayDoiThanhToanDemo(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function layDanhSachThanhToanDemo(): DanhSachThanhToanDemo {
  return danhSachThanhToanDemo
}

export function capNhatThanhToanDemo(
  soHoaDon: string,
  trangThai: KetQuaThanhToanDemo,
): ThanhToanDemo {
  const ketQua: ThanhToanDemo = {
    trangThai,
    ...(trangThai === 'success'
      ? {
          maGiaoDich: `DEMO-${soHoaDon}-${Date.now()}`,
          thoiGianThanhToan: new Date().toISOString(),
        }
      : {}),
  }

  danhSachThanhToanDemo = {
    ...danhSachThanhToanDemo,
    [soHoaDon]: ketQua,
  }
  listeners.forEach((listener) => listener())
  return ketQua
}

export function xoaThanhToanDemo(): void {
  if (Object.keys(danhSachThanhToanDemo).length === 0) return
  danhSachThanhToanDemo = {}
  listeners.forEach((listener) => listener())
}
