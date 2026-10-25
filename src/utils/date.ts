export const shanghaiDay = (date = new Date()) => new Date(date.getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10)
export function formatTime(value?: string) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return new Date(date.getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 16).replace('T', ' ').replace(/-/g, '.')
}
