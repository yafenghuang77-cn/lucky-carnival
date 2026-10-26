import { Text, View } from '@tarojs/components'

import ActionButton from '@/components/action-button'
import './lottery-footer.less'

type Props = { rolling: boolean; onPrizes: () => void; onRules: () => void; onPreview: () => void }

export default function LotteryFooter({ rolling, onPrizes, onRules, onPreview }: Props) {
  return (
    <View className='lottery-bottom'>
      <View className='lottery-note'>
        <View className='lottery-note-spark'>✦</View>
        <Text>{rolling ? '惊喜正在路上，请稍等片刻…' : '每一次期待，都值得一份惊喜'}</Text>
      </View>
      <View className='lottery-links'>
        <ActionButton className='lottery-link' onClick={onPrizes}>
          <View className='ticket-mini' />
          <Text>我的奖品</Text>
          <Text className='lottery-link-arrow'>↗</Text>
        </ActionButton>
        <View className='lottery-links-divider' />
        <ActionButton className='lottery-link' onClick={onRules}>
          <View className='rules-mini'>
            <View />
            <View />
          </View>
          <Text>玩法说明</Text>
          <Text className='lottery-link-arrow'>↗</Text>
        </ActionButton>
      </View>
      <ActionButton className='lottery-preview' disabled={rolling} onClick={onPreview}>
        预览中奖弹窗 <Text>→</Text>
      </ActionButton>
      <View className='lottery-footer'>
        <Text>LUCKY CARNIVAL</Text>
        <Text>好运常在 · 快乐加倍</Text>
      </View>
    </View>
  )
}
