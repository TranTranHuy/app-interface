export type TenBieuTuong =
  | 'giotNuoc'
  | 'trangChu'
  | 'hoaDon'
  | 'bieuDo'
  | 'hop'
  | 'nguoiDung'
  | 'thanhToan'
  | 'hoTro'
  | 'chuong'
  | 'baCham'
  | 'muiTenTrai'
  | 'lich'
  | 'loa'
  | 'timKiem'
  | 'lienKet'
  | 'suaChua'
  | 'them'
  | 'xacNhan'
  | 'dongHo'
  | 'loc'
  | 'viTri'
  | 'theNganHang'
  | 'viDienTu'
  | 'nganHang'
  | 'tien'
  | 'canhBao'
  | 'khoa'
  | 'dienThoai'
  | 'huongDan'
  | 'chiSoNuoc'
  | 'mayAnh'
  | 'luu'
  | 'khongCoAnh'
  | 'lamMoi'

type Props = {
  ten: TenBieuTuong
  className?: string
  strokeWidth?: number
}

export default function BieuTuong({ ten, className = '', strokeWidth = 1.8 }: Props) {
  if (ten === 'giotNuoc') {
    return (
      <svg viewBox="0 0 32 40" className={className} aria-hidden="true" focusable="false">
        <path d="M16 1.8C12.2 9.2 3.2 17.4 3.2 25.2a12.8 12.8 0 0 0 25.6 0C28.8 17.4 19.8 9.2 16 1.8Z" fill="currentColor" />
        <path d="M9.1 24.7c.5-3.7 3.4-7.5 6.9-12.4 3.5 4.9 6.4 8.7 6.9 12.4.4 4.2-2.7 7.5-6.9 7.5s-7.3-3.3-6.9-7.5Z" fill="none" stroke="white" strokeWidth="1.7" />
        <path d="M8.2 27.1c1.7 3.1 4.5 4.8 7.8 4.8" fill="none" stroke="white" strokeLinecap="round" strokeWidth="1.4" />
      </svg>
    )
  }

  const noiDung = (() => {
    switch (ten) {
      case 'trangChu':
        return <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z" /><path d="M2 10 12 2l10 8" /></>
      case 'hoaDon':
        return <><path d="M6 3h9l5 5v13H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M14 3v6h6M8 13h8M8 17h8" /></>
      case 'bieuDo':
        return <><path d="M4 20V11h4v9M10 20V4h4v16M16 20v-7h4v7" /><path d="M3 21h18" /></>
      case 'hop':
        return <><path d="m3 7 9-4 9 4v11l-9 4-9-4V7Z" /><path d="m3 7 9 4 9-4M12 11v11M8 5l9 4" /></>
      case 'nguoiDung':
        return <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>
      case 'thanhToan':
        return <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 9h18M7 15h4" /><path d="M17 13v4M15 15h4" /></>
      case 'hoTro':
        return <><path d="M4 13v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="12" width="4" height="7" rx="2" /><rect x="17" y="12" width="4" height="7" rx="2" /><path d="M17 19a5 5 0 0 1-5 3h-2" /></>
      case 'chuong':
        return <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 22h4" /></>
      case 'baCham':
        return <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="12" cy="12" r="10" /></>
      case 'muiTenTrai':
        return <><path d="m15 18-6-6 6-6" /><path d="M9 12h12" /></>
      case 'lich':
        return <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" /></>
      case 'loa':
        return <><path d="M3 10v4h4l10 5V5L7 10H3Z" /><path d="M7 14l2 6h4l-2-7M20 9l2-2M20 15l2 2" /></>
      case 'timKiem':
        return <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>
      case 'lienKet':
        return <><path d="M10 13a5 5 0 0 0 7.1 0l3-3A5 5 0 0 0 13 2.9l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21.1l1.7-1.7" /></>
      case 'suaChua':
        return <><path d="M14 6a5 5 0 0 0-6.5 6.5L3 17l4 4 4.5-4.5A5 5 0 0 0 18 10l-3 3-4-4 3-3Z" /></>
      case 'them':
        return <><path d="M12 5v14M5 12h14" /><circle cx="12" cy="12" r="9" /></>
      case 'xacNhan':
        return <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>
      case 'dongHo':
        return <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>
      case 'loc':
        return <><path d="M3 5h18l-7 8v5l-4 2v-7L3 5Z" /></>
      case 'viTri':
        return <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>
      case 'theNganHang':
        return <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 9h18M7 15h5" /></>
      case 'viDienTu':
        return <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M7 5V3h10v2M8 10h8M8 14h5" /></>
      case 'nganHang':
        return <><path d="m3 9 9-6 9 6H3ZM5 10v8M10 10v8M14 10v8M19 10v8M3 21h18M3 18h18" /></>
      case 'tien':
        return <><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v5c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 11v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5" /></>
      case 'canhBao':
        return <><path d="m10.3 4.5-8 14A1.7 1.7 0 0 0 3.8 21h16.4a1.7 1.7 0 0 0 1.5-2.5l-8-14a1.9 1.9 0 0 0-3.4 0Z" /><path d="M12 9v5M12 17h.01" /></>
      case 'khoa':
        return <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>
      case 'dienThoai':
        return <><path d="M7 3H5a2 2 0 0 0-2 2 16 16 0 0 0 16 16 2 2 0 0 0 2-2v-2l-5-2-2 3a13 13 0 0 1-6-6l3-2-2-5H7Z" /></>
      case 'huongDan':
        return <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5ZM4 18.5A2.5 2.5 0 0 1 6.5 16H20M8 7h8M8 10h8" /></>
      case 'chiSoNuoc':
        return <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2M5.6 5.6l2 2M18.4 5.6l-2 2" /></>
      case 'mayAnh':
        return <><path d="M4 7h3l2-3h6l2 3h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" /><circle cx="12" cy="13" r="4" /></>
      case 'luu':
        return <><path d="M5 3h12l4 4v14H3V3h2Z" /><path d="M7 3v6h10V3M7 21v-8h10v8" /></>
      case 'khongCoAnh':
        return <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9" r="1.5" /><path d="m4 18 5-5 3 3 2-2 6 5M3 3l18 18" /></>
      case 'lamMoi':
        return <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M5.6 9a7 7 0 0 1 11.6-2L20 12M4 12l2.8 5a7 7 0 0 0 11.6-2" /></>
    }
  })()

  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {noiDung}
    </svg>
  )
}
