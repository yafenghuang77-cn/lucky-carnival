import { Text, View } from '@tarojs/components'
import { setClipboardData } from '@tarojs/taro'

import ActionButton from '@/components/action-button'
import PrizeArt from '@/components/prize-art'
import { formatTime, shanghaiTime } from '@/utils/date'

import type { PrizeVoucher } from '@/types/redemption'
import './voucher-card.less'

type Props = { voucher: PrizeVoucher; example?: boolean }

export const voucherStatus = (voucher: PrizeVoucher) =>
  voucher.status === 'claimed'
    ? 'claimed'
    : shanghaiTime(voucher.expiresAt).isBefore(shanghaiTime())
      ? 'expired'
      : 'pending'

export default function VoucherCard({ voucher, example }: Props) {
  const status = voucherStatus(voucher)
  return (
    <View className={`voucher-card voucher-card--${status}`}>
      <View className='voucher-card-main'>
        <View className='voucher-art'>
          <PrizeArt kind={voucher.prizeKind || 'coupon'} value={voucher.prizeValue} />
        </View>
        <View className='voucher-details'>
          <Text className='voucher-name'>{voucher.prizeName}</Text>
          <Text className='voucher-date'>中奖时间 {formatTime(voucher.wonAt)}</Text>
          <Text className='voucher-date'>有效期至 {formatTime(voucher.expiresAt)}</Text>
        </View>
        <Text className={`voucher-status voucher-status--${status}`}>
          {status === 'claimed' ? '已领取' : status === 'expired' ? '已过期' : '待领取'}
        </Text>
      </View>
      <View className='voucher-card-code'>
        <View className='voucher-code-details'>
          <Text className='voucher-code-label'>{example ? '示例兑奖码' : '演示兑奖码'}</Text>
          <Text className='voucher-code'>{voucher.code}</Text>
        </View>
        <ActionButton
          className='voucher-copy'
          onClick={() => setClipboardData({ data: voucher.code })}
        >
          复制兑奖码
        </ActionButton>
      </View>
      <Text className='voucher-demo-note'>UI 演示奖券，仅用于预览，暂不支持门店真实兑换</Text>
    </View>
  )
}
