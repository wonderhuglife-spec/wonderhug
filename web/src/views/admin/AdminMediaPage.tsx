'use client'

import { useState } from 'react'
import { MEDIA_ASSET_LIST } from '@/data/mediaAssets'
import { getWorkingCms, saveCmsMedia } from '@/cms/store'
import { persistRemoteCms } from '@/cms/remote'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Input'
import { Seo } from '@/components/seo/Seo'

export function AdminMediaPage() {
  const [notice, setNotice] = useState<string | null>(null)
  const media = getWorkingCms().media

  return (
    <>
      <Seo title="Media · WonderHug CMS" description="Replace site photographs." path="/admin/media" />
      <h1 className="font-serif text-3xl">Media</h1>
      <p className="mt-2 max-w-2xl text-slate">
        Paste a URL to swap a photograph everywhere that slot is used. Keep pregnancy and parenting imagery family-safe.
      </p>
      {notice ? <p className="mt-4 text-sm text-navy">{notice}</p> : null}
      <div className="mt-8 grid gap-6">
        {MEDIA_ASSET_LIST.map((asset) => (
          <MediaRow
            key={asset.key}
            assetKey={asset.key}
            label={asset.label}
            fallbackSrc={asset.src}
            fallbackAlt={asset.alt}
            current={media[asset.key]}
            onSaved={setNotice}
          />
        ))}
      </div>
    </>
  )
}

function MediaRow({
  assetKey,
  label,
  fallbackSrc,
  fallbackAlt,
  current,
  onSaved,
}: {
  assetKey: string
  label: string
  fallbackSrc: string
  fallbackAlt: string
  current?: { src: string; alt: string }
  onSaved: (message: string) => void
}) {
  const [src, setSrc] = useState(current?.src ?? '')
  const [alt, setAlt] = useState(current?.alt ?? fallbackAlt)

  return (
    <article className="grid gap-4 rounded-2xl border border-[#c3c4c7] bg-white p-5 md:grid-cols-[12rem_minmax(0,1fr)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src || fallbackSrc} alt="" className="h-36 w-full rounded-xl object-cover" />
      <div>
        <h2 className="font-medium">{label}</h2>
        <p className="mt-1 break-all text-xs text-slate">{fallbackSrc}</p>
        <div className="mt-3">
          <Label htmlFor={`src-${assetKey}`}>Replacement URL</Label>
          <Input id={`src-${assetKey}`} value={src} onChange={(event) => setSrc(event.target.value)} placeholder={fallbackSrc} />
        </div>
        <div className="mt-3">
          <Label htmlFor={`alt-${assetKey}`}>Alt text</Label>
          <Input id={`alt-${assetKey}`} value={alt} onChange={(event) => setAlt(event.target.value)} />
        </div>
        <Button
          className="mt-4"
          variant="secondary"
          onClick={() => {
            const next = saveCmsMedia(assetKey, { src: src.trim() || fallbackSrc, alt: alt.trim() || fallbackAlt })
            void persistRemoteCms(next).then((error) => onSaved(error ?? `Saved ${label}`))
          }}
        >
          Save
        </Button>
      </div>
    </article>
  )
}
