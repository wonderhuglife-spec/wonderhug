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
const DueDateToolPage = lazy(() => import('@/pages/ToolsPage').then((m) => ({ default: m.DueDateToolPage })))
const KickToolPage = lazy(() => import('@/pages/ToolsPage').then((m) => ({ default: m.KickToolPage })))
const ContractionToolPage = lazy(() => import('@/pages/ToolsPage').then((m) => ({ default: m.ContractionToolPage })))
const WeightToolPage = lazy(() => import('@/pages/ToolsPage').then((m) => ({ default: m.WeightToolPage })))
const CommunityPage = lazy(() => import('@/pages/CommunityPage').then((m) => ({ default: m.CommunityPage })))
const CommunityGroupPage = lazy(() => import('@/pages/CommunityGroupPage').then((m) => ({ default: m.CommunityGroupPage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const StartPage = lazy(() => import('@/pages/StartPage').then((m) => ({ default: m.StartPage })))
const DownloadPage = lazy(() => import('@/pages/DownloadPage').then((m) => ({ default: m.DownloadPage })))
const LegalPage = lazy(() => import('@/pages/LegalPage').then((m) => ({ default: m.LegalPage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))
const ShopPage = lazy(() => import('@/pages/ShopPage').then((m) => ({ default: m.ShopPage })))
const ProductPage = lazy(() => import('@/pages/ProductPage').then((m) => ({ default: m.ProductPage })))
const CartPage = lazy(() => import('@/pages/CartPage').then((m) => ({ default: m.CartPage })))
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage').then((m) => ({ default: m.CheckoutPage })))
const OrderConfirmationPage = lazy(() => import('@/pages/OrderConfirmationPage').then((m) => ({ default: m.OrderConfirmationPage })))
const ProgramsPage = lazy(() => import('@/pages/ProgramsPage').then((m) => ({ default: m.ProgramsPage })))
const ProgramDetailPage = lazy(() => import('@/pages/ProgramDetailPage').then((m) => ({ default: m.ProgramDetailPage })))
const PracticesPage = lazy(() => import('@/pages/PracticesPage').then((m) => ({ default: m.PracticesPage })))
const PracticeDetailPage = lazy(() => import('@/pages/PracticeDetailPage').then((m) => ({ default: m.PracticeDetailPage })))
const WeekIndexPage = lazy(() => import('@/pages/WeekIndexPage').then((m) => ({ default: m.WeekIndexPage })))
const WeekPage = lazy(() => import('@/pages/WeekPage').then((m) => ({ default: m.WeekPage })))
const SignInPage = lazy(() => import('@/pages/SignInPage').then((m) => ({ default: m.SignInPage })))
const AccountPage = lazy(() => import('@/pages/AccountPage').then((m) => ({ default: m.AccountPage })))
const AdminPage = lazy(() => import('@/pages/AdminPage').then((m) => ({ default: m.AdminPage })))

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
      { path: 'pregnancy/week-by-week', element: <WeekIndexPage /> },
      { path: 'pregnancy/week/:week', element: <WeekPage /> },
      { path: 'pregnancy/trimester', ...hub },
      { path: 'pregnancy/birth-preparation', ...hub },
      { path: 'garbh-sanskar', ...hub },
      { path: 'practices', element: <PracticesPage /> },
      { path: 'practices/:slug', element: <PracticeDetailPage /> },
      { path: 'pregnancy-planning', ...hub },
      { path: 'pregnancy-planning/nutrition', ...hub },
      { path: 'pregnancy-planning/lifestyle', ...hub },
      { path: 'pregnancy-planning/couple-readiness', ...hub },
      { path: 'parenting', ...hub },
      { path: 'parenting/newborn', ...hub },
      { path: 'parenting/baby-development', ...hub },
      { path: 'mental-wellness', ...hub },
      { path: 'postpartum', ...hub },
      { path: 'blog', element: <BlogIndexPage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      { path: 'experts', element: <ExpertsPage /> },
      { path: 'experts/:slug', element: <ExpertProfilePage /> },
      { path: 'tools', element: <ToolsPage /> },
      { path: 'tools/due-date', element: <DueDateToolPage /> },
      { path: 'tools/kicks', element: <KickToolPage /> },
      { path: 'tools/contractions', element: <ContractionToolPage /> },
      { path: 'tools/weight', element: <WeightToolPage /> },
      { path: 'community', element: <CommunityPage /> },
      { path: 'community/:slug', element: <CommunityGroupPage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'shop/:slug', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'order/:id', element: <OrderConfirmationPage /> },
      { path: 'programs', element: <ProgramsPage /> },
      { path: 'programs/:slug', element: <ProgramDetailPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'start', element: <StartPage /> },
      { path: 'download', element: <DownloadPage /> },
      { path: 'signin', element: <SignInPage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'admin', element: <AdminPage /> },
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
