'use client'

import { useMemo, useState } from 'react'
import { Link, useNavigate } from '@/lib/navigation'
import { CMS_COLLECTIONS, type CmsCollection } from '@/cms/types'
import { deleteCmsItem, emptyItem, saveCmsItem } from '@/cms/store'
import { persistRemoteCms } from '@/cms/remote'
import { useCmsState } from '@/hooks/useCatalog'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Seo } from '@/components/seo/Seo'

export function AdminCollectionPage({ collection }: { collection: CmsCollection }) {
  const meta = CMS_COLLECTIONS.find((item) => item.id === collection)
  const navigate = useNavigate()
  const state = useCmsState()
  const [query, setQuery] = useState('')
  const [notice, setNotice] = useState<string | null>(null)
  const rows = useMemo(() => {
    const items = state.items.filter((item) => item.collection === collection)
    const q = query.trim().toLowerCase()
    return q ? items.filter((item) => `${item.title} ${item.slug} ${item.status}`.toLowerCase().includes(q)) : items
  }, [collection, query, state.items])

  async function onDelete(id: string) {
    if (!window.confirm('Delete this item from the CMS? It will leave the public website.')) return
    const next = deleteCmsItem(id)
    const remote = await persistRemoteCms(next)
    setNotice(remote ?? 'Deleted. Catalogue updated.')
  }

  function onNew() {
    const draft = emptyItem(collection)
    draft.title = `New ${meta?.singular ?? 'item'}`
    draft.slug = collection === 'pages' ? '/new-page' : 'new-item'
    saveCmsItem(draft)
    navigate(`/admin/${collection}/${draft.id}`)
  }

  return (
    <>
      <Seo title={`${meta?.label ?? 'CMS'} · WonderHug CMS`} description={meta?.description ?? ''} path={`/admin/${collection}`} />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl">{meta?.label ?? collection}</h1>
          <p className="mt-2 max-w-2xl text-slate">{meta?.description}</p>
        </div>
        <Button onClick={onNew}>Add {meta?.singular ?? 'item'}</Button>
      </div>
      <div className="mt-6 max-w-md">
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title or slug" />
      </div>
      {notice ? <p className="mt-4 text-sm text-navy">{notice}</p> : null}
      <div className="mt-6 overflow-hidden rounded-2xl border border-[#c3c4c7] bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f6f7f7] text-xs uppercase tracking-[0.12em] text-slate">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-line">
                <td className="px-4 py-3 font-medium">
                  <Link to={`/admin/${collection}/${row.id}`} className="text-[#2271b1] hover:underline">
                    {row.title || '(untitled)'}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate">{row.slug}</td>
                <td className="px-4 py-3">
                  <span className={row.status === 'published' ? 'text-teal-dark' : 'text-slate'}>{row.status}</span>
                </td>
                <td className="px-4 py-3 text-slate">{row.updatedAt.slice(0, 10)}</td>
                <td className="px-4 py-3 text-right">
                  <button type="button" className="text-sm text-red-700 hover:underline" onClick={() => void onDelete(row.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? <p className="px-4 py-8 text-slate">No items match.</p> : null}
      </div>
    </>
  )
}
