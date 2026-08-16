'use client'

import { describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { JourneySelector } from '@/sections/home/JourneySelector'
import { renderWithProviders, screen } from '@/test/render'

describe('JourneySelector', () => {
  it('updates recommendations when a journey is selected', async () => {
    const user = userEvent.setup()
    renderWithProviders(<JourneySelector />)

    expect(screen.getByRole('heading', { name: /where are you right now/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /new parent/i }))

    const region = screen.getByTestId('journey-recommendations')
    expect(region).toHaveTextContent(/fourth trimester/i)
  })
})
