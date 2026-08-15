import { test, expect } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const dir = resolve(process.cwd(), '../docs/screenshots')

test('capture verification screenshots', async ({ page }) => {
  mkdirSync(dir, { recursive: true })

  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'homepage.png'), fullPage: true })

  await page.goto('/blog/garbh-sanskar-as-practice-not-promise')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'blog-post.png'), fullPage: true })

  await page.goto('/tools/due-date')
  await expect(page.getByRole('heading', { name: /due date/i })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'tools-due-date.png'), fullPage: true })

  await page.goto('/shop/garbh-sanskar-daily-pack')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'shop-pdp.png'), fullPage: true })

  await page.getByRole('button', { name: 'Add to cart' }).click()
  await page.goto('/cart')
  await expect(page.getByRole('heading', { name: 'Cart' })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'cart.png'), fullPage: true })

  await page.goto('/checkout')
  await page.getByRole('button', { name: 'Checkout' }).click()
  await expect(page.getByRole('heading', { name: /order received/i })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'checkout-confirmation.png'), fullPage: true })

  await page.goto('/community/pregnancy')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'community-compose.png'), fullPage: true })

  await page.goto('/admin')
  await expect(page.getByRole('heading', { name: /cms/i })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'admin.png'), fullPage: true })

  await page.goto('/')
  await page.getByRole('button', { name: 'తెలుగు' }).click()
  await expect(page.getByRole('link', { name: 'అంగడి' }).first()).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'homepage-telugu.png'), fullPage: true })
})
