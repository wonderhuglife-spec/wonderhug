'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'

export function SignInPage() {
  const { t } = useTranslation()
  const { sendPhoneOtp, verifyPhoneOtp, sendEmailLink } = useAuth()
  const [phone, setPhone] = useState('+91')
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  return (
    <>
      <Seo title={t('auth.title')} description={t('auth.title')} path="/signin" />
      <Container className="max-w-xl py-16">
        <Heading as="h1">{t('auth.title')}</Heading>
        <Text muted className="mt-4">
          {t('auth.phoneHelp')}
        </Text>
        <div className="mt-8">
          <Label htmlFor="phone">{t('auth.phone')}</Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Button className="mt-3" onClick={async () => setMessage((await sendPhoneOtp(phone)) ?? 'OTP sent if keys are configured.')}>
            {t('auth.sendOtp')}
          </Button>
        </div>
        <div className="mt-6">
          <Label htmlFor="otp">{t('auth.otp')}</Label>
          <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <Button className="mt-3" variant="secondary" onClick={async () => setMessage((await verifyPhoneOtp(phone, otp)) ?? 'Signed in.')}>
            {t('auth.verify')}
          </Button>
        </div>
        <div className="mt-10 border-t border-line pt-8">
          <Label htmlFor="email">{t('auth.email')}</Label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button className="mt-3" variant="ghost" onClick={async () => setMessage((await sendEmailLink(email)) ?? 'Check your email.')}>
            {t('auth.magic')}
          </Button>
        </div>
        {message ? <p className="mt-6 text-sm text-navy">{message}</p> : null}
      </Container>
    </>
  )
}
