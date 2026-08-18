import { test, expect } from '@playwright/test'

test('journal article renders full body and a 200-loadable image', async ({ page }) => {
  const response = await page.goto('/blog/garbh-sanskar-as-practice-not-promise', { waitUntil: 'domcontentloaded' })
  expect(response?.status()).toBeLessThan(400)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Garbh Sanskar/i)

  const body = page.getByTestId('article-body')
  await expect(body).toBeVisible()
  const text = (await body.innerText()).replace(/\s+/g, ' ').trim()
  expect(text.length).toBeGreaterThan(400)

  const img = page.locator('article img').first()
  await expect(img).toBeVisible()
  const src = await img.getAttribute('src')
  expect(src).toBeTruthy()
  const url = new URL(src!, page.url()).href
  const imageResponse = await page.request.get(url)
  expect(imageResponse.status(), `image ${url}`).toBe(200)
  expect(imageResponse.headers()['content-type'] ?? '').toMatch(/image|octet-stream/)
})
