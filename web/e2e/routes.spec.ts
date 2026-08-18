import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

test.describe.configure({ timeout: 300000 })

function routesFromManifest(): string[] {
  const md = readFileSync(resolve(process.cwd(), '../docs/ROUTES.md'), 'utf8')
  return [...md.matchAll(/\| `(\/[^`]*)` \|/g)].map((match) => match[1])
}

test('every ROUTES.md path renders (direct navigation, no 404)', async ({ page }) => {
  const routes = routesFromManifest()
  expect(routes.length).toBeGreaterThan(40)
  const failures: string[] = []
  for (const path of routes) {
    const response = await page.goto(path, { waitUntil: 'domcontentloaded' })
    const status = response?.status() ?? 0
    const heading = page.getByRole('heading').first()
    const notFound = await page.getByRole('heading', { name: /this page is not on the journey/i }).count()
    const hasHeading = await heading.count()
    if (status >= 400 || notFound > 0 || hasHeading === 0) {
      failures.push(`${path} status=${status} notFound=${notFound} headings=${hasHeading}`)
    }
  }
  expect(failures, failures.join('\n')).toEqual([])
})
