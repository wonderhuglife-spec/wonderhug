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

test('journey page links to planner checkout', async ({ page }) => {
  await page.goto('/journey')
  await expect(page.getByRole('heading', { name: /daily companion from planning to parenting/i })).toBeVisible()
  await page.getByRole('link', { name: /continue to planning/i }).click()
  await expect(page.getByRole('heading', { name: /choose your plan/i })).toBeVisible()
  await page.getByRole('button', { name: 'Pregnant' }).click()
  await expect(page.getByLabel(/last menstrual period/i)).toBeVisible()
  await page.getByRole('button', { name: 'Continue to checkout' }).click()
  await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible()
})

test('journal shows a full-width lead and paginates', async ({ page }) => {
  await page.goto('/blog')
  await expect(page.getByRole('heading', { name: 'Journal' })).toBeVisible()
  await expect(page.getByRole('navigation', { name: 'Journal pages' })).toBeVisible()
  await page.getByRole('button', { name: '2' }).click()
  await expect(page).toHaveURL(/page=2/)
  await expect(page.getByRole('link').filter({ has: page.getByRole('heading', { level: 2 }) }).first()).toBeVisible()
})

test('signin offers phone OTP', async ({ page }) => {
  await page.goto('/signin')
  await expect(page.getByLabel(/mobile number/i)).toBeVisible()
  await page.getByRole('button', { name: /send otp/i }).click()
  await expect(page.getByText(/supabase is not configured/i)).toBeVisible()
})
