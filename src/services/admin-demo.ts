import { shanghaiTime } from '@/utils/date'

import type { DailyPrizeRecord, DailyPrizeStats } from '@/types/redemption'

// Fictional records only. Replace this adapter with authenticated API calls later.
const SAMPLE = [
  {
    userName: '小橙',
    userId: 'U1008',
    prizeName: '星巴克中杯券',
    prizeKind: 'coffee',
    status: 'received',
    time: '15:42:08',
  },
  {
    userName: '阿沐',
    userId: 'U1026',
    prizeName: '88 元无门槛红包',
    prizeKind: 'redpack',
    status: 'received',
    time: '15:28:32',
  },
  {
    userName: '可可',
    userId: 'U1031',
    prizeName: '满 100 减 20 券',
    prizeKind: 'coupon',
    status: 'pending',
    time: '15:16:40',
  },
  {
    userName: '小林',
    userId: 'U1019',
    prizeName: '50 积分',
    prizeKind: 'points',
    status: 'received',
    time: '14:58:12',
  },
  {
    userName: '小北',
    userId: 'U1088',
    prizeName: '6 元红包',
    prizeKind: 'redpack',
    status: 'received',
    time: '14:32:26',
  },
  {
    userName: '一颗栗子',
    userId: 'U1042',
    prizeName: '免邮券',
    prizeKind: 'shipping',
    status: 'pending',
    time: '14:08:05',
  },
  {
    userName: '小陈',
    userId: 'U1013',
    prizeName: '星巴克中杯券',
    prizeKind: 'coffee',
    status: 'received',
    time: '13:45:19',
  },
  {
    userName: '晴天',
    userId: 'U1057',
    prizeName: '满 100 减 20 券',
    prizeKind: 'coupon',
    status: 'received',
    time: '12:26:43',
  },
  {
    userName: '小周',
    userId: 'U1062',
    prizeName: '6 元红包',
    prizeKind: 'redpack',
    status: 'pending',
    time: '11:47:18',
  },
  {
    userName: '豆豆',
    userId: 'U1024',
    prizeName: '星巴克中杯券',
    prizeKind: 'coffee',
    status: 'received',
    time: '11:25:09',
  },
] as const

export const DEMO_STATS_DAYS = ['2026-10-25', '2026-10-24', '2026-10-23']

export function getDemoDailyStats(day: string): DailyPrizeStats {
  const dayIndex = DEMO_STATS_DAYS.indexOf(day)
  const source = dayIndex < 0 ? [] : SAMPLE.slice(0, SAMPLE.length - dayIndex * 2)
  const records: DailyPrizeRecord[] = source.map((item, index) => ({
    id: `${day}_${index}`,
    userName: item.userName,
    userId: item.userId,
    prizeName: item.prizeName,
    prizeKind: item.prizeKind,
    wonAt: shanghaiTime(`${day}T${item.time}`).format(),
    receivedAt:
      item.status === 'received' ? shanghaiTime(`${day}T${item.time}`).format() : undefined,
    status: item.status,
  }))
  const received = records.filter((item) => item.status === 'received')
  const breakdown = new Map<string, { prizeName: string; received: number; pending: number }>()
  for (const item of records) {
    const group = breakdown.get(item.prizeName) || {
      prizeName: item.prizeName,
      received: 0,
      pending: 0,
    }
    group[item.status] += 1
    breakdown.set(item.prizeName, group)
  }
  return {
    day,
    summary: {
      people: new Set(received.map((item) => item.userId)).size,
      received: received.length,
      pending: records.length - received.length,
      categories: breakdown.size,
    },
    prizeBreakdown: Array.from(breakdown.values()),
    records,
  }
}
