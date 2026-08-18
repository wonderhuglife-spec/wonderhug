'use client'

import { describe, expect, it } from 'vitest'
import { MemoryRouter } from '@/lib/navigation'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppProviders } from '@/providers'
import { SignInPage } from '@/views/SignInPage'
import { CheckoutPage } from '@/views/CheckoutPage'

describe('auth UI', () => {
  it('offers phone OTP and email magic link', async () => {
    const user = userEvent.setup()
    render(
      <AppProviders>
        <MemoryRouter>
          <SignInPage />
        </MemoryRouter>
      </AppProviders>,
    )
    expect(screen.getByRole('heading', { name: /account/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /send otp/i }))
    expect(await screen.findByText(/supabase is not configured/i)).toBeInTheDocument()
  })
})

describe('checkout UI', () => {
  it('shows empty-cart checkout disabled', () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <CheckoutPage />
        </MemoryRouter>
      </AppProviders>,
    )
    expect(screen.getByRole('button', { name: /checkout/i })).toBeDisabled()
  })
})
