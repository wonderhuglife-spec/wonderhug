const KEY = 'wonderhug.journeyStage'
const PROFILE_KEY = 'wonderhug.profile'

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

export function readStoredProfile<T>(): T | null {
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export function writeStoredProfile<T>(profile: T) {
  try {
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
  } catch {
    /* private mode */
  }
}
