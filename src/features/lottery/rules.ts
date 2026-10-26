import { showModal } from '@tarojs/taro'

import { formatDate } from '@/utils/date'

export function showLotteryRules(activity: { startTime: string; endTime: string }) {
  return showModal({
    title: '活动规则',
    content: `活动时间：${formatDate(activity.startTime)} 至 ${formatDate(activity.endTime)}。\n每位用户每天限抽 1 次，抽完后当日不可重复抽取。每日北京时间 00:00 重置机会，奖品以抽奖结果为准。\n当前为 UI 体验版，次数在本机按日期记录，刷新不重置；真实用户身份与限次校验将在后端接入。`,
    showCancel: false,
    confirmText: '知道了',
    confirmColor: '#e4002b',
  })
}
