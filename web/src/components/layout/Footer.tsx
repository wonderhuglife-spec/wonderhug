import { Link } from 'react-router-dom'
import { Logo } from '@/components/brand/Logo'
import { MEDICAL_DISCLAIMER, NAV_ITEMS } from '@/lib/constants'

const legal = [
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
  { to: '/medical-disclaimer', label: 'Medical disclaimer' },
]

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-canvas">
      <div className="mx-auto grid max-w-page gap-12 px-5 py-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate">{MEDICAL_DISCLAIMER}</p>
        </div>
        <div className="md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">Explore</p>
          <ul className="mt-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-ink hover:text-teal-dark">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">Legal</p>
          <ul className="mt-4 space-y-2">
            {legal.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-ink hover:text-teal-dark">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-6 text-center text-xs text-slate-muted">
        © {new Date().getFullYear()} WonderHug.Life. Education, not diagnosis.
      </div>
    </footer>
  )
}
