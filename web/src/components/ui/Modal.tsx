import { useEffect, type ReactNode } from 'react'
import { Heading } from '@/components/ui/Typography'

export function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="presentation">
      <button type="button" className="absolute inset-0 bg-ink/40" aria-label="Close dialog" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 m-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-lift"
      >
        <Heading as="h2" id="modal-title" className="text-2xl">
          {title}
        </Heading>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}
