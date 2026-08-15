import { cn } from '@/lib/cn'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'min-h-12 w-full rounded-xl border border-line bg-white px-4 text-ink placeholder:text-slate-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal',
        className,
      )}
      {...props}
    />
  )
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'min-h-32 w-full rounded-xl border border-line bg-white p-4 text-ink placeholder:text-slate-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal',
        className,
      )}
      {...props}
    />
  )
}

export function Label({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-ink">
      {children}
    </label>
  )
}
