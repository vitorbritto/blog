const articleDateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC'
} as const

const articleMonthOptions = {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
} as const

function parseArticleDate(dateString?: string) {
  if (!dateString) return null

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return null

  return date
}

export function formatArticleDate(dateString: string | undefined, locale: string) {
  const date = parseArticleDate(dateString)
  if (!date) return null

  return new Intl.DateTimeFormat(locale, articleDateOptions).format(date)
}

export function getArticleArchiveMonthKey(dateString?: string) {
  const date = parseArticleDate(dateString)
  if (!date) return null

  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1

  return `${year}-${String(month).padStart(2, '0')}`
}

export function formatArticleArchiveMonth(monthKey: string, locale: string) {
  const [year, month] = monthKey.split('-').map(Number)

  if (!year || !month || month < 1 || month > 12) {
    return null
  }

  const label = new Intl.DateTimeFormat(locale, articleMonthOptions).format(
    new Date(Date.UTC(year, month - 1, 1))
  )

  return label.charAt(0).toUpperCase() + label.slice(1)
}
