import { Container } from '@/components/ui/Container'
import { Eyebrow, Heading, Text } from '@/components/ui/Typography'
import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string
  title: string
  description?: ReactNode
  className?: string
}) {
  return (
    <Container className={cn('mb-10 max-w-3xl', className)}>
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <Heading as="h2">{title}</Heading>
      {description ? (
        <Text muted className="mt-4 text-lg">
          {description}
        </Text>
      ) : null}
    </Container>
  )
}
