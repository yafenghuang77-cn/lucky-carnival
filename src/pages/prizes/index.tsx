import { Text, View } from '@tarojs/components'
import { navigateBack, redirectTo, useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import ActionButton from '../../components/action-button'
import VoucherCard, { voucherStatus } from '../../features/prizes/components/voucher-card'
import { getDemoVouchers } from '../../services/lottery-demo'
import { PrizeVoucher } from '../../types/redemption'
import './index.less'

type Filter = 'all' | 'pending' | 'claimed'
const FILTERS: Array<{ key: Filter; label: string }> = [{ key: 'all', label: '全部奖品' }, { key: 'pending', label: '待领取' }, { key: 'claimed', label: '已领取' }]
const EXAMPLE: PrizeVoucher = { id: 'example', prizeName: '星巴克中杯券', prizeKind: 'coffee', prizeDesc: '中杯兑换券', code: 'DEMO2026', expiresAt: '2026-11-11T23:59:59+08:00', wonAt: '2026-10-25T14:32:08+08:00', status: 'pending' }

export default function MyPrizes() {
  const [vouchers, setVouchers] = useState<PrizeVoucher[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [exampleVisible, setExampleVisible] = useState(false)
  useDidShow(() => setVouchers(getDemoVouchers()))
  const visible = vouchers.filter((voucher) => filter === 'all' || voucherStatus(voucher) === filter)
  const goLottery = () => navigateBack().catch(() => redirectTo({ url: '/pages/lottery/index' }))

  return <View className='prizes-page'>
    <View className='prizes-heading'><Text className='prizes-eyebrow'>YOUR LITTLE HAPPINESS</Text><Text className='prizes-title'>我的幸运口袋<Text>✦</Text></Text><Text className='prizes-subtitle'>每一份小美好，都替你好好收着。</Text></View>
    <View className='prizes-body'>
      <View className='prizes-tabs'>{FILTERS.map((item) => <ActionButton key={item.key} className={`prizes-tab${filter === item.key ? ' prizes-tab--active' : ''}`} onClick={() => setFilter(item.key)}>{item.label}<Text>{item.key === 'all' ? vouchers.length : vouchers.filter((voucher) => voucherStatus(voucher) === item.key).length}</Text></ActionButton>)}</View>
      {visible.length ? visible.map((voucher) => <VoucherCard key={voucher.id} voucher={voucher} />) : <View className='prizes-empty'><View className='prizes-empty-ticket'>✦</View><Text className='prizes-empty-title'>{filter === 'all' ? '惊喜口袋，等待装满' : filter === 'pending' ? '暂无待领取的奖品' : '暂无已领取的奖品'}</Text><Text className='prizes-empty-description'>去抽一份好运，让期待变成小美好。</Text><ActionButton className='prizes-draw-button' onClick={goLottery}>去试试手气 <Text>↗</Text></ActionButton></View>}
      <View className='prizes-help'><Text className='prizes-help-title'>到店兑换，轻松一点</Text><Text>1. 在「我的奖品」中找到对应奖券。</Text><Text>2. 到店后向工作人员出示兑奖码。</Text><Text>3. 具体兑换信息以后续活动规则为准。</Text><Text className='prizes-help-note'>当前仅为 UI 预览，真实领取、身份权限及门店兑换待后续接入。</Text></View>
      <ActionButton className='prizes-example-button' onClick={() => setExampleVisible((value) => !value)}>{exampleVisible ? '收起奖券示例' : '查看奖券样式示例'} <Text>{exampleVisible ? '−' : '+'}</Text></ActionButton>
      {exampleVisible && <VoucherCard voucher={EXAMPLE} example />}
      <Text className='prizes-footer'>LUCKY CARNIVAL · 好事正在发生</Text>
    </View>
  </View>
}
