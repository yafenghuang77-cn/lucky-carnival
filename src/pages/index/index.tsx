import { Text, View } from '@tarojs/components'
import { navigateTo } from '@tarojs/taro'

import ActionButton from '@/components/action-button'
import PrizeArt from '@/components/prize-art'
import { showLotteryRules } from '@/features/lottery/rules'
import lotteryMock from '@/mock/lottery.json'
import { formatDate } from '@/utils/date'
import './index.less'

export default function Index() {
  const { activity } = lotteryMock
  return (
    <View className='index'>
      <View className='index-content'>
        <View className='index-brand'>
          <Text>✳</Text>
          <Text>幸运嘉年华</Text>
        </View>
        <View className='index-hero'>
          <Text className='index-eyebrow'>MAKE ROOM FOR A LITTLE LUCK</Text>
          <Text className='index-title'>
            好事发生，<Text>就在今天。</Text>
          </Text>
          <Text className='index-sub'>给平常的生活，加一份意外的惊喜。</Text>
        </View>
        <View className='index-card'>
          <View className='index-card-heading'>
            <Text className='index-tag'>每日限抽 1 次</Text>
            <Text className='index-card-issue'>NO. 001</Text>
          </View>
          <Text className='index-card-title'>你的好运，等待开启。</Text>
          <Text className='index-card-description'>iPhone 15、红包、咖啡券与更多好礼</Text>
          <View className='index-artwork'>
            <View className='index-artwork-circle' />
            <PrizeArt kind='coffee' />
            <PrizeArt kind='redpack' />
            <PrizeArt kind='coupon' />
          </View>
          <View className='index-card-date'>
            <View />
            <Text>
              {formatDate(activity.startTime)} — {formatDate(activity.endTime)}
            </Text>
            <View />
          </View>
          <ActionButton
            className='index-primary'
            onClick={() => navigateTo({ url: '/pages/lottery/index' })}
          >
            开启今日好运 <Text>↗</Text>
          </ActionButton>
        </View>
        <View className='index-links'>
          <ActionButton
            className='index-link'
            onClick={() => navigateTo({ url: '/pages/prizes/index' })}
          >
            <Text className='index-link-number'>01</Text>
            <View>
              <Text className='index-link-title'>我的奖品</Text>
              <Text className='index-link-description'>把每一份小美好，装进口袋</Text>
            </View>
            <Text className='index-link-arrow'>↗</Text>
          </ActionButton>
          <ActionButton className='index-link' onClick={() => showLotteryRules(activity)}>
            <Text className='index-link-number'>02</Text>
            <View>
              <Text className='index-link-title'>活动玩法</Text>
              <Text className='index-link-description'>每天一次，给好运一个机会</Text>
            </View>
            <Text className='index-link-arrow'>↗</Text>
          </ActionButton>
          <ActionButton
            className='index-link'
            onClick={() => navigateTo({ url: '/pages/admin/index' })}
          >
            <Text className='index-link-number'>03</Text>
            <View>
              <Text className='index-link-title'>门店管理</Text>
              <Text className='index-link-description'>管理员入口 · 每日领奖统计</Text>
            </View>
            <Text className='index-link-arrow'>↗</Text>
          </ActionButton>
        </View>
        <Text className='index-footer'>LUCKY CARNIVAL · 快乐加倍</Text>
      </View>
    </View>
  )
}
