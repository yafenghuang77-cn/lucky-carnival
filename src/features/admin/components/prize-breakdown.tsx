import { Text, View } from '@tarojs/components'

import type { DailyPrizeStats } from '../../../types/redemption'
import './prize-breakdown.less'

export default function PrizeBreakdown({ items }: { items: DailyPrizeStats['prizeBreakdown'] }) {
  const max = Math.max(1, ...items.map((item) => item.received + item.pending))
  return (
    <View className='admin-panel admin-breakdown'>
      <View className='admin-panel-heading'>
        <Text className='admin-panel-title'>好礼领取分布</Text>
        <Text className='admin-panel-meta'>按奖品统计</Text>
      </View>
      <View className='admin-breakdown-legend'>
        <View className='breakdown-dot' />
        <Text>已领取</Text>
        <View className='breakdown-dot breakdown-dot--pending' />
        <Text>待领取</Text>
      </View>
      {items.length ? (
        items.map((item) => (
          <View className='admin-breakdown-item' key={item.prizeName}>
            <View className='admin-breakdown-label'>
              <Text>{item.prizeName}</Text>
              <Text>
                {item.received} 已领取 · {item.pending} 待领取
              </Text>
            </View>
            <View className='admin-breakdown-track'>
              <View
                className='admin-breakdown-fill'
                style={{ width: `${(item.received / max) * 100}%` }}
              />
              <View
                className='admin-breakdown-fill admin-breakdown-fill--pending'
                style={{ width: `${(item.pending / max) * 100}%` }}
              />
            </View>
          </View>
        ))
      ) : (
        <Text className='admin-breakdown-empty'>所选日期暂无奖品数据</Text>
      )}
    </View>
  )
}
