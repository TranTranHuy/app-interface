export const usageMonths = ['11/2024', '12/2024', '01/2025', '02/2025', '03/2025', '04/2025', '05/2025', '06/2025', '07/2025', '08/2025', '09/2025', '10/2025']
export const usageVolumes = [24, 28, 31, 28, 22, 25, 29, 33, 37, 31, 27, 24]

export const usageTable = [
  { month: '10/2025', m3: 24, amount: '186.500' },
  { month: '09/2025', m3: 26, amount: '202.000' },
  { month: '08/2025', m3: 29, amount: '225.500' },
  { month: '07/2025', m3: 34, amount: '264.500' },
  { month: '06/2025', m3: 31, amount: '240.500' },
]

export const paidBills = [
  { month: '09/2026', amount: '142.300', m3: 12, date: '22/09/2026' },
  { month: '08/2026', amount: '165.800', m3: 14, date: '20/08/2026' },
  { month: '07/2026', amount: '158.000', m3: 14, date: '21/07/2026' },
]

export const mockAccount = {
  fullName: 'Lương Cầu Chảy',
  customerCode: '119310',
  username: 'luongcauchay',
  routeCode: 'HTT027G - HTT027G',
  address: 'Chủ dùng nước, Hậu Giang',
  phone: '0706534434',
  taxCode: 'Chưa cập nhật',
  meterSerial: 'Chưa cập nhật',
  email: 'Chưa cập nhật',
  contractName: 'Hợp đồng dịch vụ cấp nước',
  contractStatus: 'Đang hoạt động',
  contractDetails: {
    number: 'HD-119310',
    signedDate: '01/01/2024',
    serviceAddress: 'Chủ dùng nước, Hậu Giang',
    customerCode: '119310',
    provider: 'Công ty Cổ phần Cấp thoát nước Hậu Giang',
  },
  currentPeriod: '10/2026',
  previousWaterReading: 658,
}

export type NotificationCategory = 'invoice' | 'water_schedule' | 'operations'

export type NotificationItem = {
  id: string
  category: NotificationCategory
  title: string
  message: string
  createdAt: string
  timeLabel: string
  read: boolean
  relatedPath?: string
  detail?: string
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
    category: 'invoice',
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
    relatedPath: '/bills/detail',
  },
  {
    id: 'TB-002',
    category: 'invoice',
    title: 'Thanh toán hóa đơn thành công',
    message: 'Hóa đơn tiền nước kỳ 09/2026 đã được thanh toán thành công.',
    createdAt: '2026-10-22T14:25:00+07:00',
    timeLabel: '22/10/2026 14:25',
    read: false,
    detail: 'Cảm ơn Quý khách đã thanh toán hóa đơn tiền nước kỳ 09/2026. Số tiền: 172.400đ.',
    relatedPath: '/bills/detail',
  },
  {
    id: 'TB-003',
    category: 'invoice',
    title: 'Nhắc thanh toán hóa đơn',
    message: 'Hóa đơn tháng 10/2026 sắp đến hạn thanh toán.',
    createdAt: '2026-10-22T09:12:00+07:00',
    timeLabel: '22/10/2026 09:12',
    read: true,
    detail: 'Hóa đơn tiền nước kỳ 10/2026 sắp đến hạn thanh toán. Vui lòng thanh toán đúng hạn để tránh gián đoạn dịch vụ.',
    relatedPath: '/bills/detail',
  },
  {
    id: 'TB-004',
    category: 'water_schedule',
    title: 'Lịch tạm ngưng cấp nước',
    message: 'Dự kiến tạm ngưng cấp nước để bảo trì hệ thống tại một phần phường Vị Thanh.',
    createdAt: '2026-10-19T16:40:00+07:00',
    timeLabel: '19/10/2026 16:40',
    read: false,
    detail: 'Thời gian: từ 22:00 ngày 20/10/2026 đến 05:00 ngày 21/10/2026. Khu vực: một phần phường Vị Thanh. Quý khách vui lòng chủ động trữ nước.',
  },
  {
    id: 'TB-005',
    category: 'operations',
    title: 'Cập nhật vận hành hệ thống cấp nước',
    message: 'Thông tin vận hành và khuyến nghị sử dụng nước sạch.',
    createdAt: '2026-10-18T10:00:00+07:00',
    timeLabel: '18/10/2026 10:00',
    read: true,
    detail: 'Hệ thống cấp nước hoạt động bình thường. Quý khách có thể theo dõi các thông báo vận hành mới tại ứng dụng.',
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
  status: 'Mới tiếp nhận' | 'Đang xử lý' | 'Đã hoàn tất'
  attachments: { name: string; url: string }[]
  technicianNotes: string[]
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
    attachments: [],
    technicianNotes: ['Đội kỹ thuật đã tiếp nhận và đang kiểm tra áp lực tuyến ống.'],
  },
  {
    id: 'SC-20261012-002',
    type: 'leak',
    reason: 'Rò rỉ tại đồng hồ',
    cause: 'Đường ống gặp sự cố',
    description: 'Nước rò rỉ tại vị trí đồng hồ nước.',
    address: 'Đường Trần Hưng Đạo, phường Vị Thanh',
    date: '2026-10-12',
    status: 'Mới tiếp nhận',
    attachments: [],
    technicianNotes: [],
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
    attachments: [],
    technicianNotes: ['Đã kiểm tra và súc xả tuyến ống. Chất lượng nước đã ổn định.'],
  },
]
