import type { TrustSignal } from '@/components/editorial/TrustSignals'

/**
 * TODO(owner): confirm before promoting any excluded signal into `trustSignals`.
 *
 * Live entries below are true of the current product (disclaimer, journal bylines,
 * evidence/tradition split, no invented testimonials, published legal shells).
 *
 * Excluded until WonderHug confirms:
 * - Counsellor staffing hours / “trained non-medical counsellors, Monday to Saturday”
 * - WhatsApp / community headcount (search snippets of “50,000+” are unverified here)
 * - Company registration number, GST, or a counsel-final refund policy
 * - Named clinical reviewers (faculty seats are still labelled placeholders)
 */
export const trustSignals: TrustSignal[] = [
  {
    id: 'editorial-review',
    icon: 'review',
    label: 'Author and review status on every article',
    detail:
      'Journal pieces name an author, a review status, and a last-reviewed date when we have one. Faculty seats stay labelled until WonderHug verifies a named clinician.',
    href: '/blog',
  },
  {
    id: 'evidence-vs-tradition',
    icon: 'source',
    label: 'Evidence separated from tradition',
    detail:
      'Clinical education is labelled, referenced, and never a diagnosis. Garbh Sanskar is hosted as living practice — we will not invent laboratory proof around a raga or a story.',
    href: '/medical-disclaimer',
  },
  {
    id: 'no-fake-stories',
    icon: 'consent',
    label: 'Consent-based stories only',
    detail:
      'We do not write testimonials on a family’s behalf. Named stories appear only with written consent from the people who lived them.',
  },
  {
    id: 'education',
    icon: 'legal',
    label: 'Education, not a clinic',
    detail:
      'WonderHug shares educational information. It does not diagnose, treat, or replace antenatal care. The medical disclaimer is linked in the footer of every page.',
    href: '/medical-disclaimer',
  },
  {
    id: 'privacy',
    icon: 'shield',
    label: 'Privacy notice is published',
    detail:
      'An operational privacy notice describes current behaviour. Counsel-reviewed policy copy is still pending — we will not claim certifications or “never sold” guarantees until that copy exists.',
    href: '/privacy',
  },
]

/** Conversion bar: first four live signals. Do not pad with unverified claims. */
export const conversionTrustSignals = trustSignals.slice(0, 4)

// TODO(owner): activate once counsellor hours and training are confirmed in writing.
export const pendingHumanSupport: TrustSignal = {
  id: 'human-support',
  icon: 'support',
  label: 'Real people, not just bots',
  detail: 'Do not publish until WonderHug confirms who staffs WhatsApp, their training, and hours.',
}

// TODO(owner): activate once company registration / refund policy is counsel-published.
export const pendingCompanyLegal: TrustSignal = {
  id: 'company-legal',
  icon: 'legal',
  label: 'Transparent about who we are',
  detail: 'Do not publish registration numbers or refund promises until they exist on /terms.',
}
