import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from '@/lib/navigation'
import { TrustSignals } from '@/components/editorial/TrustSignals'
import { conversionTrustSignals, trustSignals } from '@/data/trustSignals'

describe('trustSignals catalogue', () => {
  it('exports only live claims and omits unverified staffing or registration copy', () => {
    expect(trustSignals.length).toBeGreaterThan(0)
    expect(trustSignals.every((signal) => !/50,000|Monday to Saturday|GST|registration number/i.test(`${signal.label} ${signal.detail}`))).toBe(true)
    expect(conversionTrustSignals).toHaveLength(4)
  })
})

describe('TrustSignals', () => {
  it('renders nothing when the list is empty', () => {
    const { container } = render(
      <MemoryRouter>
        <TrustSignals signals={[]} />
      </MemoryRouter>,
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('renders the section heading and live labels', () => {
    render(
      <MemoryRouter>
        <TrustSignals signals={trustSignals} />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: /nothing here is invented/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /consent-based stories only/i })).toBeInTheDocument()
  })
})
