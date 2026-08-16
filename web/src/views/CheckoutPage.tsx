'use client'

import { useState } from 'react'
import { useNavigate } from '@/lib/navigation'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Input'
import { useCart } from '@/hooks/useCart'
import { placeOrder } from '@/services/checkout'
import { formatInr } from '@/lib/constants'
import { currentLocale } from '@/i18n'

export function CheckoutPage() {
  const { t } = useTranslation()
  const locale = currentLocale()
  const { items, totalPaise, clear } = useCart()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const demo = !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

  async function onPay() {
    setBusy(true)
    setError(null)
    try {
      const order = await placeOrder(items, email, phone)
      clear()
      navigate(`/order/${order.id}`, { state: { order } })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <Seo title={t('cta.checkout')} description={t('cta.checkout')} path="/checkout" />
      <Container className="max-w-xl py-16">
        <Heading as="h1">{t('cta.checkout')}</Heading>
        {demo ? (
          <Text muted className="mt-4">
            {t('cart.demo')}
          </Text>
        ) : (
          <Text muted className="mt-4">
            UPI, cards and netbanking via Razorpay.
          </Text>
        )}
        <p className="mt-6 text-lg font-medium">{formatInr(totalPaise, locale)}</p>
        <div className="mt-6">
          <Label htmlFor="email">{t('auth.email')}</Label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mt-4">
          <Label htmlFor="phone">{t('auth.phone')}</Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91" />
        </div>
        {error ? <p className="mt-4 text-sm text-purple">{error}</p> : null}
        <Button className="mt-8" disabled={busy || items.length === 0} onClick={() => void onPay()}>
          {busy ? t('common.loading') : t('cta.checkout')}
        </Button>
      </Container>
    </>
  )
}
