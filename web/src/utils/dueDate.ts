export function dueDateFromLmp(lmp: Date): Date {
  const due = new Date(lmp.getTime())
  due.setDate(due.getDate() + 280)
  return due
}

export function gestationalWeek(lmp: Date, today = new Date()): number {
  const ms = today.getTime() - lmp.getTime()
  const days = Math.floor(ms / 86400000)
  const week = Math.floor(days / 7) + 1
  return Math.min(42, Math.max(1, week))
}

export function parseIsoDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const date = new Date(`${value}T00:00:00`)
  return Number.isNaN(date.getTime()) ? null : date
}
