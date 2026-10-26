import { Text, View } from '@tarojs/components'

import type { DailyPrizeStats } from '@/types/redemption'

import './summary-cards.less'

export default function SummaryCards({ summary }: { summary: DailyPrizeStats['summary'] }) {
  const cards = [
    {
      label: '领奖人数',
      value: summary.people,
      unit: '人',
      hint: '按用户去重',
      primary: true,
    },
    {
      label: '已领取奖品',
      value: summary.received,
      unit: '份',
      hint: '所选日期已领取',
    },
    {
      label: '待领取奖品',
      value: summary.pending,
      unit: '份',
      hint: '所选日期中奖待领取',
    },
    {
      label: '涉及奖品',
      value: summary.categories,
      unit: '种',
      hint: '所选日期奖品种类',
    },
  ]
  return (
    <View className='admin-summary'>
      {cards.map((card) => (
        <View
          key={card.label}
          className={`admin-summary-card${card.primary ? ' admin-summary-card--primary' : ''}`}
        >
          <Text className='admin-summary-label'>{card.label}</Text>
          <View className='admin-summary-value'>
            <Text>{card.value}</Text>
            <Text>{card.unit}</Text>
          </View>
          <Text className='admin-summary-hint'>{card.hint}</Text>
          {card.primary && (
            <View className='admin-summary-flower' aria-hidden>
              ✳
            </View>
          )}
        </View>
      ))}
    </View>
  )
}
