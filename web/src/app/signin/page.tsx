import { pageMetadata } from '@/lib/seo'
import { SignInPage } from '@/views/SignInPage'

export const metadata = pageMetadata({
  title: 'Sign in',
  description: 'Phone OTP and email magic link via Supabase.',
  path: '/signin',
})

export default function Page() {
  return <SignInPage />
}
