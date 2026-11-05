import { useSyncExternalStore } from 'react'
import { useNavigate } from 'react-router-dom'
import BieuTuong from './BieuTuong'
import LogoHauGiang from './LogoHauGiang'
import { dangKyThayDoiThongBao, danhSachThongBaoDaDoc, layThongBaoDaDoc } from '../data/trangThaiThongBao'
import { notifications } from '../data/mock'

export default function Header({ back, title }: { back?: string; title?: string }) {
  const chuyenTrang = useNavigate()
  const thongBaoDaDoc = useSyncExternalStore(dangKyThayDoiThongBao, layThongBaoDaDoc, () => '')
  const soThongBaoChuaDoc = notifications.filter((thongBao) =>
    !thongBao.read && !danhSachThongBaoDaDoc(thongBaoDaDoc).has(thongBao.id),
  ).length

  return (
    <header className="flex items-center gap-2 bg-sky-50 px-4 pt-[calc(1rem+env(safe-area-inset-top,0px))] pb-3">
      {back && (
        <button type="button" aria-label="Quay lại" onClick={() => chuyenTrang(back)} className="grid h-10 w-8 place-items-center text-blue-700">
          <BieuTuong ten="muiTenTrai" className="h-6 w-6" />
        </button>
      )}
      <LogoHauGiang className="h-11 w-11 shrink-0 rounded-full bg-white object-contain p-0.5" />
      <div className="flex-1 leading-tight">
        <div className="text-xs text-slate-500">Mini App</div>
        <div className="font-bold text-[#124b84]">{title ?? 'Cấp nước Hậu Giang'}</div>
      </div>
      <button
        type="button"
        aria-label={soThongBaoChuaDoc ? `Mở thông báo, ${soThongBaoChuaDoc} chưa đọc` : 'Mở thông báo'}
        onClick={() => chuyenTrang('/notifications')}
        className="relative grid h-10 w-10 place-items-center rounded-full bg-white/70 text-blue-700"
      >
        <BieuTuong ten="chuong" className="h-5 w-5" />
        {soThongBaoChuaDoc > 0 && (
          <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full border-2 border-sky-50 bg-red-500 px-1 text-[10px] font-bold leading-none text-white">
            {soThongBaoChuaDoc > 9 ? '9+' : soThongBaoChuaDoc}
          </span>
        )}
      </button>
    </header>
  )
}
