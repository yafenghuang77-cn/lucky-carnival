import { Text, View } from '@tarojs/components'

import './chance-bar.less'

export default function ChanceBar({ remain }: { remain: number }) {
  return (
    <View className='lottery-chances'>
      <Text>
        今日还有 <Text className='lottery-chances-number'>{remain}</Text> 次好运机会
      </Text>
      <Text className='lottery-daily-limit'>{remain > 0 ? '每天限抽 1 次' : '今日已参与'}</Text>
    </View>
  )
}
