import Taro from '@tarojs/taro'

import { shanghaiDay, shanghaiTime } from '@/utils/date'
import { array, boolean, enumSchema, looseObject, optional, string, unknown } from '@/utils/schema'

import type { WinRecord } from '@/types/lottery'
import type { PrizeVoucher } from '@/types/redemption'
import type { Schema } from '@/utils/schema'

const KEY = 'carnival_demo_vouchers_v1'
const storedVouchersSchema = array(unknown())
const voucherSchema: Schema<PrizeVoucher> = looseObject({
  id: string(),
  prizeName: string(),
  prizeDesc: optional(string()),
  prizeKind: optional(
    enumSchema(['phone', 'redpack', 'coupon', 'coffee', 'points', 'thanks', 'shipping']),
  ),
  prizeValue: optional(string()),
  isWin: optional(boolean()),
  status: optional(enumSchema(['pending', 'claimed', 'expired'])),
  code: string(),
  expiresAt: string(),
  wonAt: optional(string()),
})

export function getDemoVouchers(): PrizeVoucher[] {
  const saved = storedVouchersSchema.safeParse(Taro.getStorageSync(KEY))
  if (!saved.success) {
    return []
  }
  return saved.data.flatMap((item) => {
    const parsed = voucherSchema.safeParse(item)
    return parsed.success ? [parsed.data] : []
  })
}

export function saveDemoVoucher(record: WinRecord, endTime: string): PrizeVoucher {
  const voucher: PrizeVoucher = {
    ...record,
    code: `DEMO${Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, '0')}`,
    expiresAt: shanghaiTime(endTime).endOf('day').format(),
  }
  const existing = getDemoVouchers().filter((item) => item.id !== record.id)
  Taro.setStorageSync(KEY, [voucher, ...existing])
  return voucher
}

const DRAW_DAY_KEY = 'carnival_demo_last_draw_day_v1'

export const getDemoRemaining = () => (Taro.getStorageSync(DRAW_DAY_KEY) === shanghaiDay() ? 0 : 1)

export function consumeDemoChance(): boolean {
  if (getDemoRemaining() === 0) {
    return false
  }
  Taro.setStorageSync(DRAW_DAY_KEY, shanghaiDay())
  return true
}
