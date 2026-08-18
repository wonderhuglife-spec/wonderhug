import { pageMetadata } from '@/lib/seo'
import { HomePage } from '@/views/HomePage'
import { organizationJsonLd } from '@/lib/jsonld'
import { JsonLd } from '@/components/seo/JsonLd'

export const metadata = pageMetadata({
  title: 'WonderHug.Life — from pregnancy planning to conscious parenting',
  description:
    'A trusted daily companion for the journey from preparing for pregnancy to raising a child. Experts, education, tools and community — evidence-aware and culturally at home in India.',
  path: '/',
})

export default function Page() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Is WonderHug a clinic?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. WonderHug.Life is education, Garbh Sanskar practice and community. Speak with a qualified clinician for medical decisions.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is Telugu supported?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. English and Telugu are first-class locales on the website and in the native app.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do I join the WhatsApp community?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Use the WhatsApp dock or Community pages. Rooms are run with AiSensy for 50,000+ mothers.',
              },
            },
          ],
        }}
      />
      <HomePage />
    </>
  )
}
