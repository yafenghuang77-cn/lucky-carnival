import { Input, Text, View } from '@tarojs/components'
import { useState } from 'react'
import ActionButton from '../../../components/action-button'
import './admin-login.less'

type Props = { onPreview: () => void }

export default function AdminLogin({ onPreview }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const explainLogin = () => {
    setPassword('')
    setMessage('当前仅展示登录界面，暂未接入账号服务。请通过下方入口预览示例统计。')
  }

  return <View className='admin-login-page'>
    <View className='admin-login-brand'><View className='admin-brand-stripes'><View /><View /><View /></View><Text>幸运嘉年华 · 门店管理</Text></View>
    <View className='admin-login-card'>
      <View className='admin-lock-art'><View className='admin-lock-shackle' /><View className='admin-lock-body'><View /></View></View>
      <Text className='admin-login-eyebrow'>FOR STORE ADMINS</Text>
      <Text className='admin-login-title'>好礼有数，管理有序。</Text>
      <Text className='admin-login-description'>管理员登录后，可查看每日用户领奖记录。</Text>
      <View className='admin-login-fields'>
        <Text className='admin-field-label'>管理员账号</Text>
        <Input className='admin-text-input' value={username} maxlength={40} placeholder='请输入管理员账号' aria-label='管理员账号' onInput={(event) => setUsername(event.detail.value)} />
        <Text className='admin-field-label'>登录密码</Text>
        <Input className='admin-text-input' value={password} password maxlength={128} placeholder='请输入登录密码' aria-label='管理员登录密码' onInput={(event) => setPassword(event.detail.value)} />
        {message && <View className='admin-login-message' role='status'><Text>{message}</Text></View>}
        <ActionButton className='admin-login-submit' disabled={!username.trim() || !password} onClick={explainLogin}>管理员登录 <Text>↗</Text></ActionButton>
      </View>
      <View className='admin-preview-divider' />
      <Text className='admin-preview-notice'>当前为 UI 预览，真实权限与数据将在后端接入。</Text>
      <ActionButton className='admin-preview-entry' onClick={onPreview}>查看示例统计页面 <Text>→</Text></ActionButton>
    </View>
    <Text className='admin-login-footer'>LUCKY CARNIVAL · 每一份好运，都有记录</Text>
  </View>
}
