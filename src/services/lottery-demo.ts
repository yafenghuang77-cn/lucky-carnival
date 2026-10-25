import Taro from '@tarojs/taro'
import { WinRecord } from '../types/lottery'
import { shanghaiDay } from '../utils/date'
import { PrizeVoucher } from '../types/redemption'

const KEY = 'carnival_demo_vouchers_v1'

export function getDemoVouchers(): PrizeVoucher[] {
  const saved: unknown = Taro.getStorageSync(KEY)
  if (!Array.isArray(saved)) return []
  return saved.filter((item): item is PrizeVoucher => Boolean(item && typeof item.id === 'string' && typeof item.prizeName === 'string' && typeof item.code === 'string' && typeof item.expiresAt === 'string'))
}

export function saveDemoVoucher(record: WinRecord, endTime: string): PrizeVoucher {
  const voucher: PrizeVoucher = {
    ...record,
    code: `DEMO${Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, '0')}`,
    expiresAt: `${endTime}T23:59:59+08:00`,
  }
  const existing = getDemoVouchers().filter((item) => item.id !== record.id)
  Taro.setStorageSync(KEY, [voucher, ...existing])
  return voucher
}

const DRAW_DAY_KEY = 'carnival_demo_last_draw_day_v1'

export const getDemoRemaining = () => Taro.getStorageSync(DRAW_DAY_KEY) === shanghaiDay() ? 0 : 1

export function consumeDemoChance(): boolean {
  if (getDemoRemaining() === 0) return false
  Taro.setStorageSync(DRAW_DAY_KEY, shanghaiDay())
  return true
}
