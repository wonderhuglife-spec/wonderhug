import { pageMetadata } from '@/lib/seo'
import { CartPage } from '@/views/CartPage'

export const metadata = pageMetadata({
  title: 'Cart',
  description: 'Your WonderHug cart.',
  path: '/cart',
})

export default function Page() {
  return <CartPage />
}
