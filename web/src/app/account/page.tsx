import { pageMetadata } from '@/lib/seo'
import { AccountPage } from '@/views/AccountPage'

export const metadata = pageMetadata({
  title: 'Account',
  description: 'Profile, orders, programmes and saved articles.',
  path: '/account',
})

export default function Page() {
  return <AccountPage />
}
