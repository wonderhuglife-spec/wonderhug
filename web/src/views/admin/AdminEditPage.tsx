'use client'

import { useMemo, useState } from 'react'
import { Link, useNavigate } from '@/lib/navigation'
import type { CmsCollection, CmsItem } from '@/cms/types'
import { editorFields, readField, writeField } from '@/cms/fields'
import { deleteCmsItem, emptyItem, getWorkingCms, saveCmsItem, slugify } from '@/cms/store'
import { persistRemoteCms } from '@/cms/remote'
import { Button } from '@/components/ui/Button'
import { Input, Label, Textarea } from '@/components/ui/Input'
import { ImagePicker } from '@/components/admin/ImagePicker'
import { Seo } from '@/components/seo/Seo'

export function AdminEditPage({ collection, id }: { collection: CmsCollection; id: string }) {
  const navigate = useNavigate()
  const initial = useMemo(() => {
    if (id === 'new') return emptyItem(collection)
    return getWorkingCms().items.find((item) => item.collection === collection && item.id === id) ?? emptyItem(collection)
  }, [collection, id])
  const [item, setItem] = useState<CmsItem>(initial)
  const [notice, setNotice] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const fields = editorFields(collection)

  function setValue(field: (typeof fields)[number], value: string) {
    setItem((current) => {
      const next = writeField(current, field, value)
      if (field.key === 'title' && (!current.slug || current.slug === 'new-item' || current.slug === '/new-page')) {
        next.slug = collection === 'pages' ? `/${slugify(value)}` : slugify(value)
      }
      return next
    })
  }

  async function onSave() {
    if (!item.title.trim() || !item.slug.trim()) {
      setNotice('Title and slug are required.')
      return
    }
    setSaving(true)
    const next = saveCmsItem(item)
    const remote = await persistRemoteCms(next)
    setSaving(false)
    setNotice(remote ?? 'Saved. The public site will use this copy (this browser now, every visitor once Supabase accepts the write).')
  }

  async function onDelete() {
    if (!window.confirm('Delete this item from the CMS?')) return
    const next = deleteCmsItem(item.id)
    await persistRemoteCms(next)
    navigate(`/admin/${collection}`)
  }

  return (
    <>
      <Seo title={`Edit ${item.title || 'item'} · WonderHug CMS`} description="" path={`/admin/${collection}/${id}`} />
      <p className="text-sm">
        <Link to={`/admin/${collection}`} className="text-[#2271b1] hover:underline">
          ← All {collection}
        </Link>
      </p>
      <h1 className="mt-3 font-serif text-3xl">{item.title || 'New item'}</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <form
          className="space-y-5 rounded-2xl border border-[#c3c4c7] bg-white p-6"
          onSubmit={(event) => {
            event.preventDefault()
            void onSave()
          }}
        >
          {fields.map((field) => {
            const value = readField(item, field)
            const fieldId = String(field.key)
            return (
              <div key={fieldId}>
                {field.key === 'imageUrl' ? (
                  <ImagePicker label={field.label} value={value} onChange={(next) => setValue(field, next)} />
                ) : (
                  <>
                    <Label htmlFor={fieldId}>{field.label}</Label>
                    {field.type === 'textarea' ? (
                      <Textarea id={fieldId} value={value} onChange={(event) => setValue(field, event.target.value)} className="min-h-40" />
                    ) : field.type === 'select' ? (
                      <select
                        id={fieldId}
                        value={value}
                        onChange={(event) => setValue(field, event.target.value)}
                        className="min-h-12 w-full rounded-xl border border-line bg-white px-4"
                      >
                        {(field.options ?? []).map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        id={fieldId}
                        type={field.type === 'number' ? 'number' : 'text'}
                        value={value}
                        onChange={(event) => setValue(field, event.target.value)}
                      />
                    )}
                  </>
                )}
                {field.hint ? <p className="mt-1 text-xs text-slate">{field.hint}</p> : null}
              </div>
            )
          })}
          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : 'Update'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => void onDelete()}>
              Delete
            </Button>
          </div>
          {notice ? <p className="text-sm text-navy">{notice}</p> : null}
        </form>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-[#c3c4c7] bg-white p-4 text-sm text-slate">
            <p className="font-medium text-ink">Publish</p>
            <p className="mt-2">Draft stays in the panel. Published items are merged onto the live website.</p>
            {item.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.imageUrl} alt="" className="mt-4 h-32 w-full rounded-xl object-cover" />
            ) : null}
          </div>
        </aside>
      </div>
    </>
  )
}
