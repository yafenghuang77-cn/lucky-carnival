import { Text, View } from '@tarojs/components'

import FestivalSeal from '@/components/festival-seal'
import { formatDate } from '@/utils/date'

import './activity-hero.less'

type Props = { title: string; startTime: string; endTime: string }

export default function ActivityHero({ title, startTime, endTime }: Props) {
  return (
    <>
      <View className='lottery-nav'>
        <View className='lottery-brand'>
          <Text className='brand-flower' aria-hidden>
            ✳
          </Text>
          <Text>{title}</Text>
        </View>
        <Text className='lottery-edition'>限时好礼季</Text>
      </View>
      <View className='lottery-hero'>
        <Text className='hero-eyebrow'>A LITTLE LUCK, A LOT OF JOY</Text>
        <View className='lottery-hero-main'>
          <View className='hero-heading'>
            <Text>今天，好运</Text>
            <Text className='hero-heading-last'>轮到你。</Text>
          </View>
          <FestivalSeal />
        </View>
        <Text className='hero-description'>轻点开启，让惊喜如期而至。</Text>
        <View className='hero-date'>
          <View className='hero-date-dot' />
          <Text>
            {formatDate(startTime)} — {formatDate(endTime)}
          </Text>
        </View>
      </View>
    </>
  )
}
