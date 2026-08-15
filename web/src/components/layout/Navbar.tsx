import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
import { ButtonLink } from '@/components/ui/Button'
import { Drawer } from '@/components/ui/Drawer'
import { NAV_ITEMS, PRIMARY_CTA, SECONDARY_CTA } from '@/lib/constants'
import { cn } from '@/lib/cn'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'min-h-11 rounded-full px-3 text-sm text-slate hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal',
                  isActive && 'text-ink font-medium',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink to={SECONDARY_CTA.to} variant="ghost" size="sm">
            {SECONDARY_CTA.label}
          </ButtonLink>
          <ButtonLink to={PRIMARY_CTA.to} size="sm">
            {PRIMARY_CTA.label}
          </ButtonLink>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line lg:hidden"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
      </div>
      <Drawer open={open} title="Menu" onClose={() => setOpen(false)}>
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className="min-h-11 rounded-xl px-3 py-2 text-ink hover:bg-canvas"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          <ButtonLink to={PRIMARY_CTA.to} onClick={() => setOpen(false)}>
            {PRIMARY_CTA.label}
          </ButtonLink>
          <ButtonLink to={SECONDARY_CTA.to} variant="secondary" onClick={() => setOpen(false)}>
            {SECONDARY_CTA.label}
          </ButtonLink>
        </div>
      </Drawer>
    </header>
  )
}
