export type AnalyticsEventName =
  | 'hero_cta_click'
  | 'journey_selected'
  | 'signup_started'
  | 'signup_completed'
  | 'article_opened'
  | 'article_saved'
  | 'expert_opened'
  | 'tool_used'
  | 'community_opened'
  | 'community_post_created'
  | 'app_download_clicked'

export interface AnalyticsPayload {
  [key: string]: string | number | boolean | null | undefined
}

type Sink = (event: AnalyticsEventName, payload?: AnalyticsPayload) => void

const sinks: Sink[] = []

export function registerAnalyticsSink(sink: Sink) {
  sinks.push(sink)
}

export function track(event: AnalyticsEventName, payload?: AnalyticsPayload) {
  for (const sink of sinks) {
    sink(event, payload)
  }
  if (process.env.NODE_ENV !== 'production') {
    console.info('[analytics]', event, payload ?? {})
  }
}

registerAnalyticsSink(() => {
  /* Plug GA4 / Mixpanel here when CONFIG is provided. */
})
