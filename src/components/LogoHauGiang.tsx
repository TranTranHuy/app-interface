type Props = {
  className?: string
}

export default function LogoHauGiang({ className = '' }: Props) {
  return (
    <img
      src="/logo-hau-giang.png"
      alt="Logo Công ty Cổ phần Cấp nước và Vệ sinh môi trường nông thôn Hậu Giang"
      className={className}
    />
  )
}
