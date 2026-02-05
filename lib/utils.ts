export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

export function sortByDate<T extends { startDate?: string; endDate?: string; date?: string }>(
  items: T[],
  ascending = false
): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.startDate || a.date || '').getTime()
    const dateB = new Date(b.startDate || b.date || '').getTime()
    return ascending ? dateA - dateB : dateB - dateA
  })
}
