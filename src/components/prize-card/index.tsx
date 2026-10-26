import { Text, View } from '@tarojs/components'
import { useEffect } from 'react'

import PrizeArt from '@/components/prize-art'
import { getPrizePresentation } from '@/features/lottery/presentation'
import useTaroAnimation from '@/hooks/use-taro-animation'

import type { Prize } from '@/types/lottery'

import './index.less'

type Props = { prize: Prize; active?: boolean; featured?: boolean }

export default function PrizeCard({ prize, active, featured }: Props) {
  const { kind, hint, value } = getPrizePresentation(prize)
  const { animation, animate } = useTaroAnimation()

  useEffect(() => {
    animate((motion) => motion.scale(active ? 1.025 : 1), 100)
  }, [active, animate])

  return (
    <View className={`lottery-cell${active ? ' lottery-cell--active' : ''}`} animation={animation}>
      {featured && <Text className='lottery-cell-badge'>头奖</Text>}
      <View className='lottery-prize-art'>
        <PrizeArt kind={kind} value={value} />
      </View>
      <Text className='lottery-prize-name'>{prize.shortName}</Text>
      <Text className='lottery-prize-hint'>{hint}</Text>
    </View>
  )
}
