'use client'

import { Link } from '@/lib/navigation'
import { CMS_COLLECTIONS } from '@/cms/types'
import { useCmsState } from '@/hooks/useCatalog'
import { supabase } from '@/lib/supabase'
import { Seo } from '@/components/seo/Seo'

export function AdminDashboard() {
  const state = useCmsState()
  const counts = CMS_COLLECTIONS.map((collection) => ({
    ...collection,
    total: state.items.filter((item) => item.collection === collection.id).length,
    published: state.items.filter((item) => item.collection === collection.id && item.status === 'published').length,
  }))

  return (
    <>
      <Seo title="WonderHug CMS" description="Manage every public page and catalogue from one panel." path="/admin" />
      <h1 className="font-serif text-3xl">WonderHug CMS</h1>
      <p className="mt-2 max-w-2xl text-slate">
        WordPress-style editing for the website. Create, edit, unpublish, or delete posts, pages, products, programmes,
        faculty seats, practices, and community rooms. The public site loads this catalogue from the backend when
        Supabase is connected, and from this browser when it is not.
      </p>
      {!supabase ? (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
          Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to web/.env.local, then apply
          supabase/migrations/20260819120000_cms_admin_auth.sql in the Supabase SQL editor.
        </p>
      ) : (
        <p className="mt-4 rounded-xl border border-teal/30 bg-teal-soft px-4 py-3 text-sm">
          Supabase project is connected. Saves use your CMS login (not the public key). Apply
          supabase/migrations/20260821120000_cms_save_catalog.sql in the SQL editor if catalogue tables still reject rows.
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {counts.map((card) => (
          <Link
            key={card.id}
            to={`/admin/${card.id}`}
            className="rounded-2xl border border-[#c3c4c7] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-slate">{card.label}</p>
            <p className="mt-2 font-serif text-3xl">{card.total}</p>
            <p className="mt-1 text-sm text-slate">{card.published} published</p>
            <p className="mt-3 text-sm text-[#2271b1]">Open {card.label.toLowerCase()} →</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Link to="/admin/media" className="rounded-2xl border border-[#c3c4c7] bg-white p-5">
          <h2 className="font-serif text-xl">Media</h2>
          <p className="mt-2 text-sm text-slate">Swap hero, journal, programme and shop photographs site-wide.</p>
        </Link>
        <Link to="/admin/settings" className="rounded-2xl border border-[#c3c4c7] bg-white p-5">
          <h2 className="font-serif text-xl">Homepage</h2>
          <p className="mt-2 text-sm text-slate">Edit the hero title, body, and cover image without a deploy.</p>
        </Link>
      </div>
    </>
  )
}
