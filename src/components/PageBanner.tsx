type PageBannerProps = {
  title: string
  description: string
  image?: string
  textPosition?: 'left' | 'center'
}

export default function PageBanner({ title, description, image, textPosition = 'left' }: PageBannerProps) {
  return (
    <section
      className={`relative flex min-h-24 items-center overflow-hidden rounded-3xl bg-sky-100 bg-cover px-4 py-3 ${textPosition === 'center' ? 'justify-center bg-center text-center' : 'bg-right'}`}
      style={{ backgroundImage: `url('${image ?? '/banner-nuoc.png'}')` }}
    >
      <div className={`absolute inset-0 ${textPosition === 'center' ? 'bg-white/10' : `bg-gradient-to-r ${image ? 'from-[#dff4ff]/75 via-[#e8f7ff]/35' : 'from-[#dff4ff]/95 via-[#e8f7ff]/80'} to-transparent`}`} />
      <div className={`relative z-10 ${textPosition === 'center' ? 'max-w-[65%]' : 'max-w-[74%]'}`}>
        <h1 className="text-lg font-bold leading-tight text-[#124b84]">{title}</h1>
        <p className="mt-1 text-xs leading-4 text-slate-700 sm:text-sm">{description}</p>
      </div>
    </section>
  )
}
