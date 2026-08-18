import { pageMetadata } from '@/lib/seo'
import { CommunityPage } from '@/views/CommunityPage'

export const metadata = pageMetadata({
  title: 'Community',
  description: 'Moderated rooms and the AiSensy WhatsApp community.',
  path: '/community',
})

export default function Page() {
  return <CommunityPage />
}
