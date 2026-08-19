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

  await page.goto('/programs/womb-care')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'program-detail.png'), fullPage: true })

  await page.getByRole('button', { name: /enrol|enroll/i }).click()
  await page.getByRole('button', { name: 'Checkout' }).click()
  await expect(page.getByRole('heading', { name: /order received/i })).toBeVisible()
  await page.goto('/learn/womb-care/first-trimester-rest')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'lesson-player.png'), fullPage: true })

  await page.goto('/tools/due-date')
  await expect(page.getByRole('heading', { name: /due date/i })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'tools-due-date.png'), fullPage: true })

  await page.goto('/tools/kicks')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'tools-kicks.png'), fullPage: true })

  await page.goto('/tools/contractions')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'tools-contractions.png'), fullPage: true })

  await page.goto('/tools/weight')
  await expect(page.getByRole('heading', { name: /weight/i })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'tools-weight.png'), fullPage: true })

  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/')
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible()
  await page.locator('header').screenshot({ path: resolve(dir, 'header-desktop.png') })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'header-mobile.png') })
  await page.setViewportSize({ width: 1280, height: 800 })

  await page.goto('/shop')
  await expect(page.getByRole('heading', { name: 'Shop' })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'shop.png'), fullPage: true })

  await page.goto('/shop/garbh-sanskar-daily-pack')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'shop-pdp.png'), fullPage: true })

  await page.getByRole('button', { name: /add to cart/i }).click()
  await expect(page.getByRole('status').filter({ hasText: /added to cart/i })).toBeVisible()
  await page.goto('/cart')
  await expect(page.getByRole('heading', { name: 'Cart', exact: true })).toBeVisible()
  await expect(page.getByText(/garbh sanskar daily practice pack/i).first()).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'cart.png'), fullPage: true })

  await page.goto('/checkout')
  await page.getByRole('button', { name: 'Checkout' }).click()
  await expect(page.getByRole('heading', { name: /order received/i })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'checkout-confirmation.png'), fullPage: true })

  await page.goto('/community/pregnancy')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'community-compose.png'), fullPage: true })

  await page.goto('/admin')
  await page.getByLabel('Username').fill('adminmani')
  await page.getByLabel('Password').fill('maniadmin')
  await page.getByRole('button', { name: 'Log in' }).click()
  await expect(page.getByRole('heading', { name: 'WonderHug CMS' })).toBeVisible()
  await page.screenshot({ path: resolve(dir, 'admin.png'), fullPage: true })
})
