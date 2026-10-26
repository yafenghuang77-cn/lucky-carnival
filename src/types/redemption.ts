import type { PrizeKind, WinRecord } from './lottery'

export type PrizeVoucher = WinRecord & {
  code: string
  expiresAt: string
}

export type DailyPrizeRecord = {
  id: string
  userName: string
  userId: string
  prizeName: string
  prizeKind: PrizeKind
  wonAt: string
  receivedAt?: string
  status: 'received' | 'pending'
}

export type DailyPrizeStats = {
  day: string
  summary: { people: number; received: number; pending: number; categories: number }
  prizeBreakdown: Array<{ prizeName: string; received: number; pending: number }>
  records: DailyPrizeRecord[]
}
