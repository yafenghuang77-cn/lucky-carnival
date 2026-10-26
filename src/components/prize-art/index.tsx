import { Text, View } from '@tarojs/components'

import type { PrizeKind } from '@/types/lottery'

import './index.less'

export type { PrizeKind } from '@/types/lottery'

type Props = {
  kind: PrizeKind
  value?: string
  large?: boolean
}

/** Pure CSS artwork keeps the same appearance in H5 and WeChat. */
export default function PrizeArt({ kind, value, large = false }: Props) {
  return (
    <View className={`prize-art prize-art--${kind}${large ? ' prize-art--large' : ''}`} aria-hidden>
      <View className='art-shadow' />
      <View className='art-object'>
        {kind === 'phone' && (
          <>
            <View className='phone-lens lens-one' />
            <View className='phone-lens lens-two' />
            <View className='phone-lens lens-three' />
            <View className='phone-glint' />
          </>
        )}
        {kind === 'redpack' && (
          <>
            <View className='redpack-flap' />
            <Text className='redpack-value'>{value || '88'}</Text>
            <Text className='redpack-unit'>元红包</Text>
          </>
        )}
        {kind === 'coupon' && (
          <>
            <Text className='coupon-value'>
              {value || '20'}
              <Text className='coupon-unit'>元</Text>
            </Text>
            <View className='coupon-line' />
            <Text className='coupon-caption'>COUPON</Text>
          </>
        )}
        {kind === 'coffee' && (
          <>
            <View className='coffee-lid' />
            <View className='coffee-sleeve'>
              <View className='coffee-mark' />
            </View>
          </>
        )}
        {kind === 'points' && (
          <>
            <View className='coin-inner'>
              <Text className='coin-star'>✦</Text>
            </View>
            <Text className='coin-count'>50</Text>
          </>
        )}
        {kind === 'thanks' && (
          <>
            <View className='clover-leaf leaf-one' />
            <View className='clover-leaf leaf-two' />
            <View className='clover-leaf leaf-three' />
            <View className='clover-leaf leaf-four' />
            <View className='clover-stem' />
          </>
        )}
        {kind === 'shipping' && (
          <>
            <View className='parcel-tape' />
            <View className='parcel-label'>
              <View />
              <View />
            </View>
          </>
        )}
      </View>
    </View>
  )
}
