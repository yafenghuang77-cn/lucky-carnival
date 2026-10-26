import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import type { ConfigType } from 'dayjs'

dayjs.extend(utc)

/** Date-only values and legacy records without an offset are Beijing local time. */
export function shanghaiTime(value?: ConfigType) {
  const input = typeof value === 'string' ? value.trim() : value
  const date = dayjs.utc(input)
  const hasNoOffset = typeof input === 'string' && !/(Z|[+-]\d{2}:?\d{2})$/i.test(input)
  return (hasNoOffset ? date.subtract(8, 'hour') : date).utcOffset(8)
}

export const shanghaiDay = (value?: ConfigType) => shanghaiTime(value).format('YYYY-MM-DD')

export function formatDate(value?: string, pattern = 'YYYY.MM.DD') {
  if (!value) {
    return '—'
  }
  const date = shanghaiTime(value)
  return date.isValid() ? date.format(pattern) : '—'
}

export const formatTime = (value?: string) => formatDate(value, 'YYYY.MM.DD HH:mm')
