import { pageMetadata } from '@/lib/seo'
import { StartPage } from '@/views/StartPage'

export const metadata = pageMetadata({
  title: 'Start your journey',
  description: 'Choose a stage and personalise recommendations.',
  path: '/start',
})

export default function Page() {
  return <StartPage />
}
