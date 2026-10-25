import { Text, View } from '@tarojs/components'
import './activity-hero.less'

type Props = { title: string; startTime: string; endTime: string }

export default function ActivityHero({ title, startTime, endTime }: Props) {
  return <>
    <View className='lottery-nav'>
      <View className='lottery-brand'><Text className='brand-flower'>✳</Text><Text>{title}</Text></View>
    </View>
    <View className='lottery-hero'>
      <Text className='hero-eyebrow'>A LITTLE LUCK, A LOT OF JOY</Text>
      <View className='hero-heading'><Text>今天，好运</Text><Text className='hero-heading-last'>轮到你<Text className='hero-heading-star'>✦</Text></Text></View>
      <Text className='hero-description'>让生活多一点惊喜，让好事发生。</Text>
      <View className='hero-date'><View className='hero-date-dot' /><Text>{startTime.replace(/-/g, '.')} — {endTime.replace(/-/g, '.')}</Text></View>
      <View className='hero-orbit' aria-hidden /><Text className='hero-spark hero-spark-one' aria-hidden>✧</Text><Text className='hero-spark hero-spark-two' aria-hidden>✦</Text>
    </View>
  </>
}
