import type { Metadata } from 'next'
import { Figtree, Newsreader } from 'next/font/google'
import { AppProviders } from '@/providers'
import { SiteChrome } from '@/layouts/SiteChrome'
import '@/styles/tokens.css'
import '@/index.css'

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://wonderhug.life'),
  title: {
    default: 'WonderHug.Life — from pregnancy planning to conscious parenting',
    template: '%s | WonderHug.Life',
  },
  description:
    'Garbh Sanskar practice, modern maternity education, programmes and a WhatsApp community of 50,000+ mothers for Telugu-speaking homes in Telangana and Andhra Pradesh.',
  icons: { icon: '/favicon.svg', apple: '/logo.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${figtree.variable} ${newsreader.variable}`}>
      <body className="min-h-svh bg-white font-sans text-ink antialiased">
        <AppProviders>
          <SiteChrome>{children}</SiteChrome>
        </AppProviders>
      </body>
    </html>
  )
}
