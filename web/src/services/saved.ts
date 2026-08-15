const KEY = 'wonderhug.savedArticles'

export function listSavedArticleIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]') as string[]
  } catch {
    return []
  }
}

export function toggleSavedArticle(id: string): string[] {
  const current = listSavedArticleIds()
  const next = current.includes(id) ? current.filter((row) => row !== id) : [...current, id]
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}

export function isArticleSaved(id: string) {
  return listSavedArticleIds().includes(id)
}
