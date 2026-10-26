import { Text, View } from '@tarojs/components'

import ChanceBar from './chance-bar'
import ActionButton from '../../../components/action-button'
import PrizeCard from '../../../components/prize-card'

import type { Prize } from '../../../types/lottery'
import type { Ref } from 'react'
import './lottery-board.less'

type Props = {
  prizes: Prize[]
  activePrize: number
  rolling: boolean
  remain: number
  drawButtonRef?: Ref<HTMLButtonElement>
  onDraw: () => void
}

export default function LotteryBoard({
  prizes,
  activePrize,
  rolling,
  remain,
  drawButtonRef,
  onDraw,
}: Props) {
  const renderPrize = (prize: Prize, index: number) => (
    <PrizeCard key={prize.id} prize={prize} active={activePrize === index} featured={index === 0} />
  )
  return (
    <View className='lottery-machine'>
      <View className='machine-topline'>
        <View className='machine-line' />
        <Text>一格惊喜 · 一份好运</Text>
        <View className='machine-line' />
      </View>
      <View className='lottery-grid'>
        {prizes.slice(0, 4).map(renderPrize)}
        <ActionButton
          ref={drawButtonRef}
          className='lottery-go'
          disabled={rolling || remain <= 0}
          onClick={onDraw}
        >
          <Text className={`lottery-go-title${rolling ? ' lottery-go-title--rolling' : ''}`}>
            {rolling ? '抽奖中' : remain > 0 ? 'GO' : '明天见'}
          </Text>
          <Text className='lottery-go-label'>
            {rolling ? '好运正在靠近' : remain > 0 ? '点击开启好运' : '机会已用完'}
          </Text>
          <View className='lottery-go-arrow'>↗</View>
        </ActionButton>
        {prizes.slice(4).map((prize, index) => renderPrize(prize, index + 4))}
      </View>
      <ChanceBar remain={remain} />
      <View className='machine-bottom'>
        <View />
        <View />
        <View />
      </View>
    </View>
  )
}
