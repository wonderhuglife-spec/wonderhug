import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navbar } from '@/components/layout/Navbar'

describe('Navbar', () => {
  it('exposes primary destinations', async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(nav).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'Pregnancy' })).toHaveAttribute('href', '/pregnancy')
    expect(screen.getByRole('link', { name: 'Start Your Journey' })).toHaveAttribute('href', '/start')
  })

  it('opens mobile drawer', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(screen.getByRole('dialog', { name: 'Menu' })).toBeInTheDocument()
  })
})
