export const thongTinKhachHang = {
  hoTen: 'Nguyễn Văn An',
  maKhachHang: 'HG0123456',
  soDienThoai: '0912345678',
  soDienThoaiHienThi: '0912 345 678',
  diaChi: 'Số 123, đường Nguyễn Trãi, P. Vị Thanh, TP. Vị Thanh, Hậu Giang',
  loaiKhachHang: 'Hộ gia đình',
  trangThai: 'Đang hoạt động',
}

export const thongKeTruyCap = {
  tongLuotTruyCap: 290185,
  soNguoiDangTrucTuyen: 32509,
}

export const cacThangSuDung = ['11/2024', '12/2024', '01/2025', '02/2025', '03/2025', '04/2025', '05/2025', '06/2025', '07/2025', '08/2025', '09/2025', '10/2025']
export const sanLuongSuDung = [24, 28, 31, 28, 22, 25, 29, 33, 37, 31, 27, 24]

export const bangSuDungNuoc = [
  { thang: '10/2025', sanLuong: 24, soTien: '186.500' },
  { thang: '09/2025', sanLuong: 26, soTien: '202.000' },
  { thang: '08/2025', sanLuong: 29, soTien: '225.500' },
  { thang: '07/2025', sanLuong: 34, soTien: '264.500' },
  { thang: '06/2025', sanLuong: 31, soTien: '240.500' },
]

export const hoaDonDaThanhToan = [
  { thang: '09/2026', soTien: '142.300', sanLuong: 12, ngay: '22/09/2026', ngayPhatHanh: '2026-09-20', chiSoCu: 1243, chiSoMoi: 1255, ngayGhi: '18/09/2026', daThanhToan: true },
  { thang: '08/2026', soTien: '165.800', sanLuong: 14, ngay: '20/08/2026', ngayPhatHanh: '2026-08-20', chiSoCu: 1229, chiSoMoi: 1243, ngayGhi: '18/08/2026', daThanhToan: true },
  { thang: '07/2026', soTien: '158.000', sanLuong: 14, ngay: '21/07/2026', ngayPhatHanh: '2026-07-20', chiSoCu: 1215, chiSoMoi: 1229, ngayGhi: '18/07/2026', daThanhToan: true },
]

export const mockAccount = {
  fullName: 'Nguyễn Văn An',
  phone: '0912 345 678',
  customerCode: 'HG0123456',
  address: thongTinKhachHang.diaChi,
  contractName: 'Hộ gia đình',
  contractStatus: 'Đang hoạt động',
  currentWaterReading: 1270,
}

export type NotificationItem = {
  id: string
  category: 'billing' | 'service'
  title: string
  message: string
  createdAt: string
  timeLabel: string
  read: boolean
  invoice?: {
    period: string
    customerCode: string
    previousReading: number
    currentReading: number
    consumption: number
    amount: string
    dueDate: string
    contactPhone: string
    website: string
  }
}

export const notifications: NotificationItem[] = [
  {
    id: 'TB-001',
    category: 'billing',
    title: 'Thông báo tiền nước kỳ 10/2026',
    message: 'Hóa đơn tiền nước kỳ 10/2026 đã được phát hành.',
    createdAt: '2026-10-28T08:30:00+07:00',
    timeLabel: '28/10/2026 08:30',
    read: false,
    invoice: {
      period: '10/2026',
      customerCode: '208804',
      previousReading: 845,
      currentReading: 858,
      consumption: 13,
      amount: '95.970',
      dueDate: '07/11/2026',
      contactPhone: '02933.572.019',
      website: 'https://nuocsachhaugiang.com.vn/',
    },
  },
  {
    id: 'TB-002',
    category: 'billing',
    title: 'Nhắc thanh toán hóa đơn',
    message: 'Hóa đơn tháng 10/2026 sắp đến hạn thanh toán.',
    createdAt: '2026-10-22T09:12:00+07:00',
    timeLabel: '22/10/2026 09:12',
    read: true,
  },
  {
    id: 'TB-003',
    category: 'service',
    title: 'Thông báo tạm ngưng cấp nước',
    message: 'Từ 22:00 ngày 20/10/2026 đến 05:00 ngày 21/10/2026 tại một phần phường Vị Thanh.',
    createdAt: '2026-10-19T16:40:00+07:00',
    timeLabel: '19/10/2026 16:40',
    read: true,
  },
]

export type IncidentType = 'water' | 'leak' | 'quality' | 'other'

export const incidentTypeLabels: Record<IncidentType, string> = {
  water: 'Mất nước / nước yếu',
  leak: 'Rò rỉ đường ống',
  quality: 'Chất lượng nước',
  other: 'Khác',
}

export const incidentReasonsByType: Record<IncidentType, string[]> = {
  water: ['Mất nước', 'Nước yếu', 'Nước chảy không liên tục'],
  leak: ['Rò rỉ tại đồng hồ', 'Rò rỉ đường ống', 'Rò rỉ tại điểm đấu nối'],
  quality: ['Nước đục', 'Nước có màu lạ', 'Nước có mùi lạ'],
  other: ['Yêu cầu khác'],
}

export const incidentCauses = [
  'Chưa xác định',
  'Đường ống gặp sự cố',
  'Áp lực cấp nước thấp',
  'Thiết bị trong nhà bị hỏng',
  'Bảo trì hệ thống',
  'Nguyên nhân khác',
]

export type Incident = {
  id: string
  type: IncidentType
  reason: string
  cause: string
  description: string
  address: string
  date: string
  status: string
}

export const incidents: Incident[] = [
  {
    id: 'SC-20261020-001',
    type: 'water',
    reason: 'Nước yếu',
    cause: 'Áp lực cấp nước thấp',
    description: 'Nước yếu từ sáng, không đủ áp lực lên bồn chứa.',
    address: 'Đường Nguyễn Văn Cừ, phường Vị Thanh',
    date: '2026-10-20',
    status: 'Đang xử lý',
  },
  {
    id: 'SC-20261012-002',
    type: 'leak',
    reason: 'Rò rỉ tại đồng hồ',
    cause: 'Đường ống gặp sự cố',
    description: 'Nước rò rỉ tại vị trí đồng hồ nước.',
    address: 'Đường Trần Hưng Đạo, phường Vị Thanh',
    date: '2026-10-12',
    status: 'Đã tiếp nhận',
  },
  {
    id: 'SC-20260928-003',
    type: 'quality',
    reason: 'Nước có màu lạ',
    cause: 'Chưa xác định',
    description: 'Nước có màu đục trong thời gian ngắn.',
    address: 'Khu vực phường III, Vị Thanh',
    date: '2026-09-28',
    status: 'Đã hoàn tất',
  },
]

export const hoaDonChuaThanhToan = {
  thang: '10/2026',
  soTien: '186.500',
  sanLuong: 15,
  ngay: '25/10/2026',
  ngayPhatHanh: '2026-10-20',
  chiSoCu: 1255,
  chiSoMoi: 1270,
  ngayGhi: '18/10/2026',
  daThanhToan: false,
}

export const danhSachHoaDon = [hoaDonChuaThanhToan, ...hoaDonDaThanhToan]
