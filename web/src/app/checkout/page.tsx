import { pageMetadata } from '@/lib/seo'
import { CheckoutPage } from '@/views/CheckoutPage'

export const metadata = pageMetadata({
  title: 'Checkout',
  description: 'Pay with UPI, cards or netbanking via Razorpay.',
  path: '/checkout',
})

export default function Page() {
  return <CheckoutPage />
}
