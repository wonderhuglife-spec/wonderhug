'use client'

import { useState } from 'react'
import { NavLink } from '@/lib/navigation'
import { Menu, ShoppingBag } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Logo } from '@/components/brand/Logo'
import { ButtonLink } from '@/components/ui/Button'
import { Drawer } from '@/components/ui/Drawer'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { NAV_GROUPS, NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/cn'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { JOURNEY_OPTIONS } from '@/data/journeys'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'min-h-11 rounded-full px-3 text-sm font-medium text-slate transition-colors hover:text-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal',
    isActive && 'bg-teal-soft text-purple',
  )

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const { count } = useCart()
  const { user } = useAuth()
  const locale = currentLocale()

  const journeyLinks = JOURNEY_OPTIONS.map((item) => ({
    to:
      item.id === 'planning'
        ? '/pregnancy-planning'
        : item.id === 'ttc'
          ? '/pregnancy-planning'
          : item.id === 'pregnant'
            ? '/pregnancy'
            : item.id === 'birth_prep'
              ? '/pregnancy/birth-preparation'
              : item.id === 'new_parent'
                ? '/parenting/newborn'
                : '/parenting',
    label: pick(item.label, locale),
  }))

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 shadow-[0_1px_0_rgba(121,64,155,0.06)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[80rem] items-center justify-between gap-3 px-5 py-2.5 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          <NavLink to="/" end className={linkClass}>
            {t('nav.home')}
          </NavLink>
          <div className="relative group">
            <button type="button" className="min-h-11 rounded-full px-3 text-sm font-medium text-slate hover:text-purple">
              {t('nav.journey')}
            </button>
            <div className="invisible absolute left-0 top-full z-20 min-w-60 rounded-2xl border border-line bg-white p-2 opacity-0 shadow-lift transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {journeyLinks.map((item) => (
                <NavLink key={item.to + item.label} to={item.to} className="block min-h-11 rounded-xl px-3 py-2 text-sm text-ink hover:bg-teal-soft">
                  {item.label}
                </NavLink>
              ))}
              <NavLink to="/garbh-sanskar" className="block min-h-11 rounded-xl px-3 py-2 text-sm text-ink hover:bg-teal-soft">
                {t('nav.garbh')}
              </NavLink>
              <NavLink to="/tools" className="block min-h-11 rounded-xl px-3 py-2 text-sm text-ink hover:bg-teal-soft">
                {t('nav.tools')}
              </NavLink>
            </div>
          </div>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {t(item.key)}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher compact />
          <NavLink to="/cart" className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-white" aria-label={t('nav.cart')}>
            <ShoppingBag className="h-4 w-4" />
            {count > 0 ? <span className="absolute right-1 top-1 h-4 min-w-4 rounded-full bg-purple text-center text-[10px] text-white">{count}</span> : null}
          </NavLink>
          <ButtonLink to={user ? '/account' : '/signin'} variant="ghost" size="sm">
            {user ? t('nav.account') : t('cta.signIn')}
          </ButtonLink>
          <ButtonLink to="/start" size="sm">
            {t('cta.start')}
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
      <Drawer open={open} title={t('nav.menu')} onClose={() => setOpen(false)}>
        <LanguageSwitcher />
        <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
          <NavLink to="/" className="min-h-11 rounded-xl px-3 py-2" onClick={() => setOpen(false)}>
            {t('nav.home')}
          </NavLink>
          {NAV_GROUPS[0].items.map((item) => (
            <NavLink key={item.to} to={item.to} className="min-h-11 rounded-xl px-3 py-2" onClick={() => setOpen(false)}>
              {t(item.key)}
            </NavLink>
          ))}
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className="min-h-11 rounded-xl px-3 py-2" onClick={() => setOpen(false)}>
              {t(item.key)}
            </NavLink>
          ))}
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          <ButtonLink to="/start" onClick={() => setOpen(false)}>
            {t('cta.start')}
          </ButtonLink>
          <ButtonLink to="/cart" variant="secondary" onClick={() => setOpen(false)}>
            {t('nav.cart')}
          </ButtonLink>
        </div>
      </Drawer>
    </header>
  )
}
