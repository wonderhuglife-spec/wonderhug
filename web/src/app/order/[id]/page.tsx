import { pageMetadata } from '@/lib/seo'
import { OrderConfirmationPage } from '@/views/OrderConfirmationPage'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  return pageMetadata({
    title: 'Order received',
    description: 'WonderHug order confirmation',
    path: `/order/${id}`,
  })
}

export default async function Page({ params }: Props) {
  const { id } = await params
  return <OrderConfirmationPage id={id} />
}
