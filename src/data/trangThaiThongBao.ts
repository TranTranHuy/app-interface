const khoaThongBaoDaDoc = 'hau-giang-read-notifications'
const suKienThongBaoThayDoi = 'hau-giang-notifications-changed'

export function layThongBaoDaDoc(): string {
  return localStorage.getItem(khoaThongBaoDaDoc) ?? ''
}

export function dangKyThayDoiThongBao(capNhat: () => void): () => void {
  const xuLyThayDoi = (suKien: Event) => {
    if (suKien instanceof StorageEvent && suKien.key !== khoaThongBaoDaDoc) return
    capNhat()
  }

  window.addEventListener('storage', xuLyThayDoi)
  window.addEventListener(suKienThongBaoThayDoi, xuLyThayDoi)
  return () => {
    window.removeEventListener('storage', xuLyThayDoi)
    window.removeEventListener(suKienThongBaoThayDoi, xuLyThayDoi)
  }
}

export function danhSachThongBaoDaDoc(giaTri: string): Set<string> {
  return new Set(giaTri.split(',').filter(Boolean))
}

export function danhDauThongBaoDaDoc(maThongBao: string): void {
  const danhSachDaDoc = danhSachThongBaoDaDoc(layThongBaoDaDoc())
  danhSachDaDoc.add(maThongBao)
  localStorage.setItem(khoaThongBaoDaDoc, [...danhSachDaDoc].join(','))
  window.dispatchEvent(new Event(suKienThongBaoThayDoi))
}
