import type { MetadataRoute } from 'next'
import { allAppRoutes } from '@/lib/routes'
import { env } from '@/lib/env'

export default function sitemap(): MetadataRoute.Sitemap {
  const site = env.siteUrl.replace(/\/$/, '')
  return allAppRoutes()
    .filter((route) => !route.path.startsWith('/order/') && !route.path.startsWith('/admin') && route.path !== '/account' && route.path !== '/checkout' && route.path !== '/cart' && route.path !== '/signin')
    .map((route) => ({
      url: `${site}${route.path}`,
      changeFrequency: route.path === '/' ? 'weekly' : 'monthly',
      priority: route.path === '/' ? 1 : 0.6,
    }))
}
