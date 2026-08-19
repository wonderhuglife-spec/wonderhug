'use client'

import { useId, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { fileToCmsImage } from '@/cms/imageFile'
import { Label } from '@/components/ui/Input'

export function ImagePicker({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (url: string) => void
}) {
  const id = useId()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onFile(file: File | undefined) {
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      if (supabase) {
        const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
        const path = `uploads/${crypto.randomUUID()}.${ext === 'jpeg' ? 'jpg' : ext}`
        const { error: uploadError } = await supabase.storage.from('cms-media').upload(path, file, { upsert: false, contentType: file.type })
        if (!uploadError) {
          const { data } = supabase.storage.from('cms-media').getPublicUrl(path)
          onChange(data.publicUrl)
          setBusy(false)
          return
        }
      }
      onChange(await fileToCmsImage(file))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not upload that image.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        type="url"
        value={value.startsWith('data:') ? '' : value}
        placeholder={value.startsWith('data:') ? 'Uploaded image (saved with this item)' : 'https://… or upload a file'}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 w-full rounded-xl border border-line bg-white px-4 text-ink placeholder:text-slate-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
      />
      <label className="mt-2 inline-flex min-h-11 cursor-pointer items-center rounded-full border border-line bg-white px-4 text-sm">
        {busy ? 'Uploading…' : 'Upload image'}
        <input type="file" accept="image/*" className="sr-only" onChange={(event) => void onFile(event.target.files?.[0])} />
      </label>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="mt-3 h-32 w-full rounded-xl object-cover" />
      ) : null}
      {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
    </div>
  )
}
