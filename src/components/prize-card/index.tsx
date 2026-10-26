import { Text, View } from '@tarojs/components'

import { getPrizePresentation } from '../../features/lottery/presentation'
import PrizeArt from '../prize-art'

import type { Prize } from '../../types/lottery'
import './index.less'

type Props = { prize: Prize; active?: boolean; featured?: boolean }

export default function PrizeCard({ prize, active, featured }: Props) {
  const { kind, hint, value } = getPrizePresentation(prize)
  return (
    <View className={`lottery-cell${active ? ' lottery-cell--active' : ''}`}>
      {featured && <Text className='lottery-cell-badge'>头奖</Text>}
      <View className='lottery-prize-art'>
        <PrizeArt kind={kind} value={value} />
      </View>
      <Text className='lottery-prize-name'>{prize.shortName}</Text>
      <Text className='lottery-prize-hint'>{hint}</Text>
    </View>
  )
}
