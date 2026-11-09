import { useEffect } from 'react'

type SuccessToastProps = {
  message: string
  onClose: () => void
  duration?: number
}

export default function SuccessToast({ message, onClose, duration = 2200 }: SuccessToastProps) {
  useEffect(() => {
    const timeoutId = window.setTimeout(onClose, duration)
    return () => window.clearTimeout(timeoutId)
  }, [message, onClose, duration])

  if (!message) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[calc(1rem+env(safe-area-inset-top,0px))] z-50 flex justify-center px-4" role="status" aria-live="polite">
      <div className="flex w-full max-w-[390px] items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-base font-semibold text-slate-800 shadow-lg">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 4 4L19 6" />
          </svg>
        </span>
        <span>{message}</span>
      </div>
    </div>
  )
}
