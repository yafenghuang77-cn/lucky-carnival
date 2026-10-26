import { View } from '@tarojs/components'
import { navigateTo } from '@tarojs/taro'

import WinModal from '../../components/win-modal'
import ActivityHero from '../../features/lottery/components/activity-hero'
import LotteryBoard from '../../features/lottery/components/lottery-board'
import LotteryFooter from '../../features/lottery/components/lottery-footer'
import { showLotteryRules } from '../../features/lottery/rules'
import useLottery from '../../hooks/use-lottery'
import './index.less'

export default function Lottery() {
  const lottery = useLottery()
  const { activity } = lottery

  const showRules = () => showLotteryRules(activity)

  const showMyPrizes = () => navigateTo({ url: '/pages/prizes/index' })

  return (
    <View className='lottery-page'>
      <View className='lottery-content'>
        <ActivityHero
          title={activity.title}
          startTime={activity.startTime}
          endTime={activity.endTime}
        />
        <LotteryBoard
          prizes={lottery.prizes}
          activePrize={lottery.activePrize}
          rolling={lottery.rolling}
          remain={lottery.remain}
          drawButtonRef={lottery.drawButtonRef}
          onDraw={lottery.startDraw}
        />
        <LotteryFooter
          rolling={lottery.rolling}
          onPrizes={showMyPrizes}
          onRules={showRules}
          onPreview={lottery.previewWin}
        />
      </View>
      <WinModal
        visible={lottery.winVisible}
        record={lottery.winRecord}
        onClose={lottery.closeModal}
      />
    </View>
  )
}
