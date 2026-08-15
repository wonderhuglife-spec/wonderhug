import { useLocation, useParams } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { ButtonLink } from '@/components/ui/Button'
import { listLocalOrders } from '@/services/checkout'
import type { Order } from '@/types/domain'

export function OrderConfirmationPage() {
  const { id = '' } = useParams()
  const state = useLocation().state as { order?: Order } | null
  const order = state?.order ?? listLocalOrders().find((item) => item.id === id)

  return (
    <>
      <Seo title="Order confirmation" description="WonderHug order" path={`/order/${id}`} />
      <Container className="py-16">
        <Heading as="h1">Order received</Heading>
        {order ? (
          <>
            <Text className="mt-4">
              Reference {order.id} · {order.checkoutMode === 'demo' ? 'Demo checkout (Razorpay keys not in this environment)' : 'Razorpay'} ·{' '}
              {order.status}
            </Text>
            <ul className="mt-6 list-disc pl-5">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.title} × {item.quantity}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Text className="mt-4">We could not find that order on this device.</Text>
        )}
        <ButtonLink to="/account" className="mt-8">
          Account
        </ButtonLink>
      </Container>
    </>
  )
}
