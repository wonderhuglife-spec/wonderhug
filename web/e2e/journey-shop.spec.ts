import { test, expect } from '@playwright/test'

test('journey selection to shop checkout demo', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.getByRole('button', { name: /new parent/i }).click()
  await page.getByRole('link', { name: 'Shop' }).first().click()
  await expect(page.getByRole('heading', { name: 'Shop' })).toBeVisible()
  await page.getByRole('button', { name: 'Add to cart' }).first().click()
  await page.goto('/checkout')
  await page.getByRole('button', { name: 'Checkout' }).click()
  await expect(page.getByRole('heading', { name: /order received/i })).toBeVisible()
})

test('telugu language switch', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'తెలుగు' }).click()
  await expect(page.getByRole('link', { name: 'అంగడి' }).first()).toBeVisible()
})

test('signin offers phone OTP', async ({ page }) => {
  await page.goto('/signin')
  await expect(page.getByLabel(/mobile number/i)).toBeVisible()
  await page.getByRole('button', { name: /send otp/i }).click()
  await expect(page.getByText(/supabase is not configured/i)).toBeVisible()
})
