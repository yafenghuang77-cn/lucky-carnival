import { Text, View } from '@tarojs/components'

import { formatTime } from '../../../utils/date'

import type { DailyPrizeRecord } from '../../../types/redemption'
import './records-list.less'

export default function RecordsList({
  records,
  filtered,
}: {
  records: DailyPrizeRecord[]
  filtered: boolean
}) {
  if (!records.length) {
    return (
      <View className='admin-record-empty'>
        <Text className='admin-record-empty-mark'>—</Text>
        <Text>{filtered ? '没有符合条件的记录' : '这一天还没有领奖记录'}</Text>
        <Text>试试其他日期或筛选条件</Text>
      </View>
    )
  }
  return (
    <View className='admin-records'>
      <View className='admin-record-head'>
        <Text>用户</Text>
        <Text>奖品</Text>
        <Text>领奖时间 / 中奖时间</Text>
        <Text>状态</Text>
      </View>
      {records.map((record) => (
        <View className='admin-record' key={record.id}>
          <View className='admin-record-user'>
            <View className='admin-user-avatar'>{record.userName.slice(0, 1)}</View>
            <View>
              <Text className='admin-user-name'>{record.userName}</Text>
              <Text className='admin-user-id'>{record.userId}</Text>
            </View>
          </View>
          <View className='admin-record-prize'>
            <Text>{record.prizeName}</Text>
            <Text className='admin-record-time-mobile'>
              {record.status === 'received' ? '领奖' : '中奖'}{' '}
              {formatTime(record.receivedAt || record.wonAt)}
            </Text>
          </View>
          <Text className='admin-record-time-desktop'>
            {formatTime(record.receivedAt || record.wonAt)}
          </Text>
          <Text className={`admin-record-status admin-record-status--${record.status}`}>
            {record.status === 'received' ? '已领取' : '待领取'}
          </Text>
        </View>
      ))}
    </View>
  )
}
