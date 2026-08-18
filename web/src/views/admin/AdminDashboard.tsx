'use client'

import { Link } from '@/lib/navigation'
import { CMS_COLLECTIONS } from '@/cms/types'
import { useCmsState } from '@/hooks/useCatalog'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { Seo } from '@/components/seo/Seo'

export function AdminDashboard() {
  const state = useCmsState()
  const { user, role } = useAuth()
  const staff = role === 'admin' || role === 'moderator' || role === 'expert'
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
          Supabase keys are not set, so saves stay on this device. Add NEXT_PUBLIC_SUPABASE_URL and
          NEXT_PUBLIC_SUPABASE_ANON_KEY, then set profiles.role to admin, to sync every visitor.
        </p>
      ) : user && !staff ? (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
          You are signed in but this profile is not staff. Local edits still work; Studio writes need an admin role.
        </p>
      ) : null}

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
