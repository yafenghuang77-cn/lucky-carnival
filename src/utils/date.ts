import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(customParseFormat)

const DATE_INPUT_FORMATS = ['YYYY-MM-DD', 'YYYY/M/D', 'YYYY/MM/DD', 'YYYY/MM/D', 'YYYY/M/DD']
const TIME_INPUT_FORMATS = ['HH:mm:ss', 'H:mm:ss', 'HH:mm', 'H:mm']
const DATE_TIME_INPUT =
  /^(\d{4}([-/])\d{1,2}\2\d{1,2})(?:[T ](\d{1,2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?)(Z|[+-](?:[01]\d|2[0-3]):?[0-5]\d)?)?$/i

/** Date-only values and legacy records without an offset are Beijing local time. */
export function shanghaiTime(value?: string) {
  if (value === undefined) {
    return dayjs.utc().utcOffset(8)
  }
  const input = value.trim()
  const parts = input.match(DATE_TIME_INPUT)
  if (!parts) {
    return dayjs.utc(NaN)
  }
  const [, calendarDate, , time, offset] = parts
  // Validate the clock separately; dayjs preserves only millisecond precision.
  const clock = time?.replace(/\.\d+$/, '')
  if (
    !DATE_INPUT_FORMATS.some((pattern) => dayjs.utc(calendarDate, pattern, true).isValid()) ||
    (clock && !TIME_INPUT_FORMATS.some((pattern) => dayjs.utc(clock, pattern, true).isValid()))
  ) {
    return dayjs.utc(NaN)
  }
  const date = dayjs.utc(input)
  return (offset ? date : date.subtract(8, 'hour')).utcOffset(8)
}

export const shanghaiDay = (value?: string) => shanghaiTime(value).format('YYYY-MM-DD')

export function formatDate(value?: string, pattern = 'YYYY.MM.DD') {
  if (!value) {
    return '—'
  }
  const date = shanghaiTime(value)
  return date.isValid() ? date.format(pattern) : '—'
}

export const formatTime = (value?: string) => formatDate(value, 'YYYY.MM.DD HH:mm')
