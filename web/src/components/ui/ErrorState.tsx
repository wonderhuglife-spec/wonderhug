import { Button } from '@/components/ui/Button'
import { Heading, Text } from '@/components/ui/Typography'

export function ErrorState({
  title = 'Something did not load',
  message,
  onRetry,
}: {
  title?: string
  message: string
  onRetry?: () => void
}) {
  return (
    <div role="alert" className="rounded-2xl border border-line bg-white px-6 py-10 text-center">
      <Heading as="h3">{title}</Heading>
      <Text muted className="mx-auto mt-3 max-w-md">
        {message}
      </Text>
      {onRetry ? (
        <Button className="mt-6" variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  )
}
