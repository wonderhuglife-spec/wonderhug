const KEY = 'wonderhug.journeyStage'

export function readStoredJourney(): string | null {
  try {
    return window.localStorage.getItem(KEY)
  } catch {
    return null
  }
}

export function writeStoredJourney(stage: string) {
  try {
    window.localStorage.setItem(KEY, stage)
  } catch {
    /* private mode */
  }
}
