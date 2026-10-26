import { Text, View } from '@tarojs/components'
import { navigateTo } from '@tarojs/taro'

import ActionButton from '@/components/action-button'
import FestivalSeal from '@/components/festival-seal'
import MotionView from '@/components/motion-view'
import PrizeArt from '@/components/prize-art'
import { showLotteryRules } from '@/features/lottery/rules'
import lotteryMock from '@/mock/lottery.json'
import { formatDate } from '@/utils/date'

import './index.less'

export default function Index() {
  const { activity } = lotteryMock
  return (
    <View className='index'>
      <MotionView className='index-content'>
        <View className='index-header'>
          <View className='index-brand'>
            <Text className='index-brand-mark' aria-hidden>
              ✳
            </Text>
            <Text>幸运嘉年华</Text>
          </View>
          <Text className='index-edition'>限时好礼季</Text>
        </View>
        <View className='index-hero'>
          <Text className='index-eyebrow'>LUCKY CARNIVAL · 2026</Text>
          <View className='index-hero-main'>
            <View className='index-title'>
              <Text>好事发生，</Text>
              <Text className='index-title-accent'>好运正当时。</Text>
            </View>
            <FestivalSeal />
          </View>
          <Text className='index-sub'>一份好礼，添一份欢喜。</Text>
        </View>
        <View className='index-card'>
          <View className='index-card-heading'>
            <Text className='index-tag'>每日限抽 1 次</Text>
            <Text className='index-card-issue'>惊喜好礼 · 等你来抽</Text>
          </View>
          <Text className='index-card-title'>把好运，带回家</Text>
          <Text className='index-card-description'>iPhone 15、88 元红包与更多惊喜</Text>
          <View className='index-artwork' aria-hidden>
            <View className='index-artwork-circle' />
            <View className='index-artwork-spark index-artwork-spark--left'>✦</View>
            <PrizeArt kind='redpack' />
            <View className='index-grand-prize'>
              <Text className='index-grand-prize-label'>幸运头奖</Text>
              <PrizeArt kind='phone' />
              <Text className='index-grand-prize-name'>iPhone 15</Text>
            </View>
            <PrizeArt kind='coffee' />
            <View className='index-artwork-spark index-artwork-spark--right'>✧</View>
          </View>
          <ActionButton
            className='index-primary'
            onClick={() => navigateTo({ url: '/pages/lottery/index' })}
          >
            开启我的好运 <Text aria-hidden>→</Text>
          </ActionButton>
          <View className='index-card-date'>
            <Text>活动时间</Text>
            <Text>
              {formatDate(activity.startTime)} — {formatDate(activity.endTime)}
            </Text>
          </View>
        </View>
        <View className='index-links'>
          <ActionButton
            className='index-link'
            onClick={() => navigateTo({ url: '/pages/prizes/index' })}
          >
            <View className='index-link-icon' aria-hidden>
              <View className='index-ticket-icon' />
            </View>
            <View className='index-link-copy'>
              <Text className='index-link-title'>我的奖品</Text>
              <Text className='index-link-description'>查看我的幸运好礼</Text>
            </View>
            <Text className='index-link-arrow' aria-hidden>
              ›
            </Text>
          </ActionButton>
          <ActionButton className='index-link' onClick={() => showLotteryRules(activity)}>
            <View className='index-link-icon' aria-hidden>
              <View className='index-rules-icon'>
                <View />
                <View />
              </View>
            </View>
            <View className='index-link-copy'>
              <Text className='index-link-title'>活动玩法</Text>
              <Text className='index-link-description'>好运指南，先睹为快</Text>
            </View>
            <Text className='index-link-arrow' aria-hidden>
              ›
            </Text>
          </ActionButton>
        </View>
        <View className='index-footer'>
          <View className='index-footer-line' />
          <Text>好礼相伴 · 好运常在</Text>
          <View className='index-footer-line' />
        </View>
        <ActionButton
          className='index-admin-link'
          onClick={() => navigateTo({ url: '/pages/admin/index' })}
        >
          门店管理 <Text aria-hidden>↗</Text>
        </ActionButton>
      </MotionView>
    </View>
  )
}
