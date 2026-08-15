import { Heading, Text } from '@/components/ui/Typography'
import type { ReactNode } from 'react'

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-canvas px-6 py-12 text-center">
      <Heading as="h3">{title}</Heading>
      <Text muted className="mx-auto mt-3 max-w-md">
        {description}
      </Text>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
