import { Prize, PrizeKind, WinRecord } from '../../types/lottery'

const PRESENTATION: Record<string, { kind: PrizeKind; hint: string; value?: string }> = {
  p1: { kind: 'phone', hint: '人气大奖' },
  p2: { kind: 'redpack', hint: '无门槛红包', value: '88' },
  p3: { kind: 'coupon', hint: '满 100 元可用' },
  p4: { kind: 'coffee', hint: '中杯兑换券' },
  p5: { kind: 'points', hint: '小积分大惊喜' },
  p6: { kind: 'thanks', hint: '好运会再来' },
  p7: { kind: 'redpack', hint: '一份小确幸', value: '6' },
  p8: { kind: 'shipping', hint: '好物包邮到家' },
}

export const getPrizePresentation = (prize: Prize) => PRESENTATION[prize.id] || { kind: 'coupon' as PrizeKind, hint: prize.name }

export function makeWinRecord(prize: Prize): WinRecord {
  const { kind, hint, value } = getPrizePresentation(prize)
  return {
    id: `draw_${Date.now()}`,
    prizeName: prize.name,
    prizeDesc: prize.type === 'thanks' ? '谢谢你的参与，下一份惊喜也许就属于你。' : hint,
    prizeKind: kind,
    prizeValue: value,
    isWin: prize.type !== 'thanks',
    status: 'pending',
    wonAt: new Date().toLocaleString('zh-CN'),
  }
}
