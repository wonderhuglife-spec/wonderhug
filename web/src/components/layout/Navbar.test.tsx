'use client'

import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { MemoryRouter } from '@/lib/navigation'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppProviders } from '@/providers'
import { Navbar } from '@/components/layout/Navbar'

function wrap(ui: ReactNode) {
  return <AppProviders><MemoryRouter>{ui}</MemoryRouter></AppProviders>
}

describe('Navbar', () => {
  it('exposes shop and programmes', () => {
    render(wrap(<Navbar />))
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(within(nav).getByRole('link', { name: 'Shop' })).toHaveAttribute('href', '/shop')
    expect(within(nav).getByRole('link', { name: 'Programs' })).toHaveAttribute('href', '/programs')
    expect(within(nav).getAllByRole('link', { name: 'Journey' })[0]).toHaveAttribute('href', '/journey')
    expect(screen.queryByRole('group', { name: /language/i })).not.toBeInTheDocument()
  })

  it('opens mobile drawer', async () => {
    const user = userEvent.setup()
    render(wrap(<Navbar />))
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(screen.getByRole('dialog', { name: 'Menu' })).toBeInTheDocument()
    expect(screen.queryByRole('group', { name: /language/i })).not.toBeInTheDocument()
  })
})
