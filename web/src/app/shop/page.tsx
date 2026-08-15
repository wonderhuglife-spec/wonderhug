import { pageMetadata } from '@/lib/seo'
import { ShopPage } from '@/views/ShopPage'

export const metadata = pageMetadata({
  title: 'Shop',
  description: 'Digital practice packs and print-ready journals.',
  path: '/shop',
})

export default function Page() {
  return <ShopPage />
}
