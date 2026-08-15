import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SiteLayout } from '@/layouts/SiteLayout'
import { Loading } from '@/components/ui/Loading'
import { Container } from '@/components/ui/Container'

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })))
const HubPage = lazy(() => import('@/pages/HubPage').then((m) => ({ default: m.HubPage })))
const BlogIndexPage = lazy(() => import('@/pages/BlogIndexPage').then((m) => ({ default: m.BlogIndexPage })))
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })))
const ExpertsPage = lazy(() => import('@/pages/ExpertsPage').then((m) => ({ default: m.ExpertsPage })))
const ExpertProfilePage = lazy(() => import('@/pages/ExpertProfilePage').then((m) => ({ default: m.ExpertProfilePage })))
const ToolsPage = lazy(() => import('@/pages/ToolsPage').then((m) => ({ default: m.ToolsPage })))
const CommunityPage = lazy(() => import('@/pages/CommunityPage').then((m) => ({ default: m.CommunityPage })))
const CommunityGroupPage = lazy(() =>
  import('@/pages/CommunityGroupPage').then((m) => ({ default: m.CommunityGroupPage })),
)
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const StartPage = lazy(() => import('@/pages/StartPage').then((m) => ({ default: m.StartPage })))
const DownloadPage = lazy(() => import('@/pages/DownloadPage').then((m) => ({ default: m.DownloadPage })))
const LegalPage = lazy(() => import('@/pages/LegalPage').then((m) => ({ default: m.LegalPage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

function Fallback() {
  return (
    <Container>
      <Loading label="Loading page" />
    </Container>
  )
}

const hub = { element: <HubPage /> }

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'pregnancy', ...hub },
      { path: 'pregnancy/week-by-week', ...hub },
      { path: 'pregnancy/trimester', ...hub },
      { path: 'pregnancy/birth-preparation', ...hub },
      { path: 'pregnancy-planning', ...hub },
      { path: 'pregnancy-planning/nutrition', ...hub },
      { path: 'pregnancy-planning/lifestyle', ...hub },
      { path: 'pregnancy-planning/couple-readiness', ...hub },
      { path: 'parenting', ...hub },
      { path: 'parenting/newborn', ...hub },
      { path: 'parenting/baby-development', ...hub },
      { path: 'blog', element: <BlogIndexPage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      { path: 'experts', element: <ExpertsPage /> },
      { path: 'experts/:slug', element: <ExpertProfilePage /> },
      { path: 'tools', element: <ToolsPage /> },
      { path: 'community', element: <CommunityPage /> },
      { path: 'community/:slug', element: <CommunityGroupPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'start', element: <StartPage /> },
      { path: 'download', element: <DownloadPage /> },
      { path: 'privacy', element: <LegalPage kind="privacy" /> },
      { path: 'terms', element: <LegalPage kind="terms" /> },
      { path: 'medical-disclaimer', element: <LegalPage kind="disclaimer" /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export function AppRouter() {
  return (
    <Suspense fallback={<Fallback />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
