'use client'

import { Link, useNavigate } from '@/lib/navigation'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { useCart } from '@/hooks/useCart'
import { formatInr } from '@/lib/constants'
import { currentLocale } from '@/i18n'
import { PageHero } from '@/components/editorial/PageHero'

export function CartPage() {
  const { t } = useTranslation()
  const locale = currentLocale()
  const { items, remove, totalPaise } = useCart()
  const navigate = useNavigate()

  return (
    <>
      <Seo title={t('cart.title')} description={t('cart.title')} path="/cart" />
      <PageHero kicker="Bag" title={t('cart.title')} src="/images/photo-planning.png" alt="Cart atmosphere." tone="light" />
      <Container className="py-16">
        {items.length === 0 ? (
          <div className="mt-10">
            <EmptyState title={t('cart.empty')} description="" action={<Link to="/shop">{t('shop.title')}</Link>} />
          </div>
        ) : (
          <ul className="mt-8 divide-y divide-line">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-slate">
                    {item.quantity} × {formatInr(item.unitPaise, locale)}
                  </p>
                </div>
                <Button variant="ghost" onClick={() => remove(item.id)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
        {items.length > 0 ? (
          <div className="mt-8 flex items-center justify-between">
            <p className="text-lg font-medium">
              {t('cart.total')}: {formatInr(totalPaise, locale)}
            </p>
            <Button onClick={() => navigate('/checkout')}>{t('cta.checkout')}</Button>
          </div>
        ) : null}
      </Container>
    </>
  )
}
