type PageBannerProps = {
  title: string
  description: string
}

export default function PageBanner({ title, description }: PageBannerProps) {
  return (
    <section
      className="relative flex min-h-24 items-center overflow-hidden rounded-2xl bg-sky-100 bg-cover bg-right px-4 py-3"
      style={{ backgroundImage: "url('/banner-hau-giang.svg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#dff4ff]/95 via-[#e8f7ff]/80 to-transparent" />
      <div className="relative z-10 max-w-[74%]">
        <h1 className="text-lg font-bold leading-tight text-[#124b84]">{title}</h1>
        <p className="mt-1 text-xs leading-4 text-slate-700 sm:text-sm">{description}</p>
      </div>
    </section>
  )
}
