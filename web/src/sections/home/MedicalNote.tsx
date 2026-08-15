'use client'

import { MEDICAL_DISCLAIMER } from '@/lib/constants'
import { Container } from '@/components/ui/Container'
import { Link } from '@/lib/navigation'

export function MedicalNote() {
  return (
    <Container className="pb-10">
      <p className="max-w-3xl text-xs leading-relaxed text-slate-muted">
        {MEDICAL_DISCLAIMER}{' '}
        <Link to="/medical-disclaimer" className="underline underline-offset-2">
          Read the full disclaimer
        </Link>
        .
      </p>
    </Container>
  )
}
