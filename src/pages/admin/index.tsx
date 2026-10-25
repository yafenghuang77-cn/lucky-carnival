import { Input, Picker, Text, View } from '@tarojs/components'
import { useMemo, useState } from 'react'
import ActionButton from '../../components/action-button'
import AdminLogin from '../../features/admin/components/admin-login'
import PrizeBreakdown from '../../features/admin/components/prize-breakdown'
import RecordsList from '../../features/admin/components/records-list'
import SummaryCards from '../../features/admin/components/summary-cards'
import { DEMO_STATS_DAYS, getDemoDailyStats } from '../../services/admin-demo'
import { shanghaiDay } from '../../utils/date'
import './index.less'

type Filter = 'all' | 'received' | 'pending'
const FILTERS: Array<{ key: Filter; label: string }> = [{ key: 'all', label: '全部记录' }, { key: 'received', label: '已领取' }, { key: 'pending', label: '待领取' }]

export default function Admin() {
  // UI preview only. Real access must be granted by the future server session endpoint.
  const [preview, setPreview] = useState(false)
  const [day, setDay] = useState(shanghaiDay)
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const stats = useMemo(() => getDemoDailyStats(day), [day])
  const records = stats.records.filter((record) => (filter === 'all' || record.status === filter) && `${record.userName} ${record.userId} ${record.prizeName}`.toLowerCase().includes(query.trim().toLowerCase()))
  const exitPreview = () => { setPreview(false); setQuery(''); setFilter('all') }

  if (!preview) return <AdminLogin onPreview={() => setPreview(true)} />

  return <View className='admin-page'>
    <View className='admin-topbar'><View className='admin-topbar-brand'><View className='admin-brand-stripes'><View /><View /><View /></View><Text>幸运嘉年华</Text><Text className='admin-topbar-separator'>/</Text><Text className='admin-topbar-location'>门店管理</Text></View><ActionButton className='admin-exit-button' onClick={exitPreview}>退出预览 <Text>↗</Text></ActionButton></View>
    <View className='admin-main'>
      <View className='admin-title-row'><View><Text className='admin-eyebrow'>A GOOD DAY, IN NUMBERS</Text><Text className='admin-page-title'>每一份好运，都有记录。</Text><Text className='admin-page-description'>查看用户每日领奖情况，为到店服务做好准备。</Text></View><View className='admin-preview-badge'><View /><Text>UI 预览 · 示例数据</Text></View></View>
      <View className='admin-date-toolbar'><View><Text className='admin-date-label'>统计日期</Text><Picker mode='date' value={day} end={shanghaiDay()} onChange={(event) => setDay(event.detail.value)}><View className='admin-date-picker'><Text>{day.replace(/-/g, '.')}</Text><Text>⌄</Text></View></Picker></View><View className='admin-date-shortcuts'>{DEMO_STATS_DAYS.map((date) => <ActionButton key={date} className={`admin-date-shortcut${day === date ? ' admin-date-shortcut--active' : ''}`} onClick={() => setDay(date)}>{date.slice(5).replace('-', '.')}</ActionButton>)}</View></View>
      <SummaryCards summary={stats.summary} />
      <View className='admin-content-grid'>
        <View className='admin-panel admin-records-panel'>
          <View className='admin-panel-heading'><View><Text className='admin-panel-title'>用户领奖明细</Text><Text className='admin-panel-subtitle'>每位用户每天限抽 1 次，名单按所选日期展示</Text></View><Text className='admin-panel-count'>{records.length} / {stats.records.length} 条</Text></View>
          <View className='admin-record-filters'><View className='admin-filter-tabs'>{FILTERS.map((item) => <ActionButton className={`admin-filter-tab${filter === item.key ? ' admin-filter-tab--active' : ''}`} key={item.key} onClick={() => setFilter(item.key)}>{item.label}</ActionButton>)}</View><Input className='admin-search' value={query} maxlength={80} placeholder='搜索用户、编号或奖品' aria-label='搜索用户、编号或奖品' onInput={(event) => setQuery(event.detail.value)} /></View>
          <RecordsList records={records} filtered={Boolean(query.trim()) || filter !== 'all'} />
          <Text className='admin-stats-definition'>已领取按领奖日期统计；待领取按中奖日期展示。领奖人数按用户去重。</Text>
        </View>
        <PrizeBreakdown items={stats.prizeBreakdown} />
      </View>
      <View className='admin-preview-explanation'><Text>预览说明</Text><Text>当前使用虚构示例数据，支持日期切换、状态筛选和搜索；真实登录、权限与领奖数据尚未接入。本次不包含门店核销操作。</Text></View>
      <Text className='admin-footer'>LUCKY CARNIVAL · 把好礼送到每一个人手中</Text>
    </View>
  </View>
}
