'use client'

import { useEffect, useState } from 'react'
import { NavLink } from '@/lib/navigation'
import { Menu, ShoppingBag, UserRound, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Logo } from '@/components/brand/Logo'
import { ButtonLink } from '@/components/ui/Button'
import { NAV_GROUPS, NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/cn'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { pick } from '@/lib/locale'
import { currentLocale } from '@/i18n'
import { JOURNEY_OPTIONS } from '@/data/journeys'
import { JOURNEY_ART, JOURNEY_HREF } from '@/data/journeyArt'
import { HoverMedia } from '@/components/editorial/HoverMedia'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'inline-flex h-11 items-center rounded-full px-3 text-sm font-medium leading-none text-slate transition hover:bg-canvas hover:text-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal',
    isActive && 'bg-teal-soft text-purple',
  )

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()
  const { t } = useTranslation()
  const { count } = useCart()
  const { user } = useAuth()
  const locale = currentLocale()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const journeyLinks = JOURNEY_OPTIONS.map((item) => ({
    to: JOURNEY_HREF[item.id],
    label: pick(item.label, locale),
    src: JOURNEY_ART[item.id].src,
    alt: JOURNEY_ART[item.id].alt,
  }))

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-all duration-300',
        scrolled
          ? 'border-purple/10 bg-white/95 py-0 shadow-nav backdrop-blur-md'
          : 'border-white/60 bg-white/80 py-0.5 shadow-[0_1px_0_rgba(121,64,155,0.06)] backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex max-w-[80rem] items-center justify-between gap-3 px-5 py-2 sm:px-8">
        <Logo compact={scrolled} />
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          <NavLink to="/" end className={linkClass}>
            {t('nav.home')}
          </NavLink>
          <div className="relative group">
            <button type="button" className="inline-flex h-11 items-center rounded-full px-3 text-sm font-medium leading-none text-slate hover:text-purple">
              {t('nav.journey')}
            </button>
            <div className="invisible absolute left-0 top-full z-20 w-[min(36rem,calc(100vw-2.5rem))] rounded-2xl border border-line bg-white p-3 opacity-0 shadow-lift transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="grid gap-1 sm:grid-cols-2">
                {journeyLinks.map((item) => (
                  <NavLink key={item.to + item.label} to={item.to} className="inline-flex min-h-11 items-center gap-3 rounded-xl px-2 py-2 text-sm leading-none text-ink hover:bg-canvas">
                    <HoverMedia src={item.src} alt="" className="h-12 w-12 shrink-0 rounded-lg" width={96} height={96} zoomOnHover={false} />
                    {item.label}
                  </NavLink>
                ))}
              </div>
              <div className="mt-2 border-t border-line pt-2">
                <NavLink to="/garbh-sanskar" className="inline-flex min-h-11 items-center rounded-xl px-3 py-2 text-sm leading-none text-ink hover:bg-teal-soft">
                  {t('nav.garbh')}
                </NavLink>
                <NavLink to="/tools" className="inline-flex min-h-11 items-center rounded-xl px-3 py-2 text-sm leading-none text-ink hover:bg-teal-soft">
                  {t('nav.tools')}
                </NavLink>
              </div>
            </div>
          </div>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {t(item.key)}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-1.5 md:flex">
          <NavLink
            to="/cart"
            className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line/80 bg-white/90 text-navy transition hover:border-teal hover:text-teal-dark"
            aria-label={t('nav.cart')}
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 ? (
              <span className="absolute right-1 top-1 h-4 min-w-4 rounded-full bg-purple text-center text-[10px] text-white">{count}</span>
            ) : null}
          </NavLink>
          <NavLink
            to={user ? '/account' : '/signin'}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line/80 bg-white/90 text-navy transition hover:border-purple hover:text-purple"
            aria-label={user ? t('nav.account') : t('cta.signIn')}
          >
            <UserRound className="h-4 w-4" />
          </NavLink>
          <ButtonLink to="/start" size="sm" variant="teal" className="ml-1 shadow-[0_8px_20px_rgba(48,146,146,0.35)] hover:scale-[1.03]">
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
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 bg-[#FBF7F2]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            initial={reduce ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <h2 id="drawer-title" className="font-serif text-2xl text-purple">
                {t('nav.menu')}
              </h2>
              <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-6 flex flex-col gap-1 px-5" aria-label="Mobile">
              <NavLink to="/" className="inline-flex min-h-12 items-center rounded-2xl px-3 py-3 font-medium" onClick={() => setOpen(false)}>
                {t('nav.home')}
              </NavLink>
              {NAV_GROUPS[0].items.map((item) => (
                <NavLink key={item.to} to={item.to} className="inline-flex min-h-12 items-center rounded-2xl px-3 py-3" onClick={() => setOpen(false)}>
                  {t(item.key)}
                </NavLink>
              ))}
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.to} to={item.to} className="inline-flex min-h-12 items-center rounded-2xl px-3 py-3" onClick={() => setOpen(false)}>
                  {t(item.key)}
                </NavLink>
              ))}
            </nav>
            <div className="mt-10 flex flex-col gap-3 px-5">
              <ButtonLink to="/start" variant="teal" className="shadow-[0_10px_24px_rgba(48,146,146,0.35)]" onClick={() => setOpen(false)}>
                {t('cta.start')}
              </ButtonLink>
              <ButtonLink to="/cart" variant="secondary" onClick={() => setOpen(false)}>
                {t('nav.cart')}
              </ButtonLink>
              <ButtonLink to={user ? '/account' : '/signin'} variant="ghost" onClick={() => setOpen(false)}>
                {user ? t('nav.account') : t('cta.signIn')}
              </ButtonLink>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
