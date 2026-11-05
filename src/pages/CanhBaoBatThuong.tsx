import Header from '../components/Header'
import BieuTuong from '../components/BieuTuong'
import { Btn, Card, Tile } from '../components/ui'

const cacCotBieuDo = [
  { thang: '7/2026', sanLuong: 18 },
  { thang: '8/2026', sanLuong: 20 },
  { thang: '9/2026', sanLuong: 19 },
  { thang: '10/2026', sanLuong: 28 },
]

export default function CanhBaoBatThuong() {
  return (
    <>
      <Header back="/usage" />
      <h1 className="font-bold text-lg px-4 mb-2">Cảnh báo tiêu thụ bất thường</h1>
      <div className="px-4 pb-24 space-y-3">
        <Card bg="bg-red-50" className="flex items-center gap-3 p-4">
          <BieuTuong ten="canhBao" className="h-10 w-10 shrink-0 text-red-500" />
          <div className="flex-1">
            <b className="text-red-600">Lượng nước tiêu thụ tháng 10/2026</b>
            <div className="text-red-600">tăng <b className="text-4xl">45%</b></div>
            <div className="text-xs">so với mức trung bình 3 tháng gần nhất.</div>
          </div>
        </Card>

        <Card>
          <b className="flex items-center gap-2"><BieuTuong ten="bieuDo" className="h-5 w-5 text-blue-600" />Biểu đồ lượng tiêu thụ nước</b>
          <div className="flex items-end gap-4 h-36 mt-2 border-b border-slate-200 px-2">
            {cacCotBieuDo.map((cotBieuDo, viTri) => (
              <div key={cotBieuDo.thang} className={`flex-1 text-center text-xs font-bold ${viTri === 3 ? 'text-red-600' : ''}`}>
                {cotBieuDo.sanLuong} m³
                <div className={`rounded-t mt-1 ${viTri === 3 ? 'bg-red-400' : 'bg-sky-300'}`} style={{ height: cotBieuDo.sanLuong * 3 }} />
              </div>
            ))}
          </div>
          <div className="flex gap-4 text-[11px] text-slate-500 px-2">
            {cacCotBieuDo.map((cotBieuDo) => <div key={cotBieuDo.thang} className="flex-1 text-center">Tháng {cotBieuDo.thang}</div>)}
          </div>
          <div className="text-xs text-right text-blue-600">TB 3 tháng: 19 m³</div>
        </Card>

        <Card>
          <b className="flex items-center gap-2"><BieuTuong ten="timKiem" className="h-5 w-5 text-blue-600" />Một số nguyên nhân có thể xảy ra</b>
          <p className="text-sm text-slate-600">Lượng nước tăng cao có thể do rò rỉ nước tại đường ống, thiết bị vệ sinh bị hỏng hoặc quên khóa van sau khi sử dụng.</p>
        </Card>

        <Btn to="/service"><BieuTuong ten="suaChua" className="h-5 w-5" />Hướng dẫn kiểm tra rò rỉ <span aria-hidden="true">›</span></Btn>
        <Tile icon="hoTro" title="Liên hệ CSKH" sub="Được hỗ trợ nhanh chóng" to="/service" color="bg-emerald-100" />
        <Tile icon="hoaDon" title="Xem lịch sử sử dụng nước" sub="Kiểm tra chi tiết theo từng tháng" to="/usage" color="bg-blue-100" />
      </div>
    </>
  )
}
