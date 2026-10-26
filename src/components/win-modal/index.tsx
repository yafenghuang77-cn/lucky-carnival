import { Text, View } from '@tarojs/components'
import { useCallback, useEffect, useRef } from 'react'

import ActionButton from '@/components/action-button'
import PrizeArt from '@/components/prize-art'
import useTaroAnimation, { prefersReducedMotion } from '@/hooks/use-taro-animation'

import type { WinRecord } from '@/types/lottery'

import './index.less'

export type { WinRecord } from '@/types/lottery'

type Props = {
  visible: boolean
  record?: WinRecord | null
  onClose: () => void
}

export default function WinModal({ visible, record, onClose }: Props) {
  if (!visible || !record) {
    return null
  }
  return <WinModalContent record={record} onClose={onClose} />
}

function WinModalContent({ record, onClose }: { record: WinRecord; onClose: () => void }) {
  const { animation, animate } = useTaroAnimation()
  const { animation: scrimAnimation, animate: animateScrim } = useTaroAnimation()
  const closingRef = useRef(false)
  const exitTimer = useRef<ReturnType<typeof setTimeout>>()
  const entranceTimer = useRef<ReturnType<typeof setTimeout>>()
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  const requestClose = useCallback(() => {
    if (closingRef.current) {
      return
    }
    closingRef.current = true
    clearTimeout(entranceTimer.current)
    if (prefersReducedMotion()) {
      closeRef.current()
      return
    }
    animate((motion) => motion.opacity(0).translateY(12).scale(0.98), 180)
    animateScrim((motion) => motion.opacity(0), 180)
    exitTimer.current = setTimeout(() => closeRef.current(), 180)
  }, [animate, animateScrim])

  useEffect(() => {
    // Let the initial pose render before starting the entrance on either platform.
    entranceTimer.current = setTimeout(
      () => {
        animate((motion) => motion.opacity(1).translateY(0).scale(1), 280)
        animateScrim((motion) => motion.opacity(1), 220)
      },
      prefersReducedMotion() ? 0 : 32,
    )
    return () => {
      clearTimeout(entranceTimer.current)
      clearTimeout(exitTimer.current)
    }
  }, [animate, animateScrim])

  useEffect(() => {
    if (process.env.TARO_ENV !== 'h5') {
      return
    }
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const root = document.querySelector('.win-modal-root')
    const focusable = () =>
      Array.from(
        root?.querySelectorAll<HTMLElement>('[role="button"]:not([disabled]), [tabindex="0"]') ||
          [],
      )
    const dialog = root?.querySelector<HTMLElement>('[role="dialog"]')
    // H5 custom elements finish applying tabIndex after React's effect runs.
    const focusTimer = setTimeout(() => dialog?.focus({ preventScroll: true }), 32)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        requestClose()
      }
      if (event.key !== 'Tab') {
        return
      }
      const items = focusable()
      if (!items.length) {
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === dialog)
      ) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      previousFocus?.focus()
    }
  }, [requestClose])

  const isWin = record.isWin !== false

  return (
    <View className='win-modal-root' catchMove>
      <View
        className='win-modal-scrim'
        animation={scrimAnimation}
        aria-hidden
        onClick={requestClose}
      />
      <View
        className={`win-modal-dialog${isWin ? '' : ' win-modal-dialog--thanks'}`}
        animation={animation}
        role='dialog'
        {...(process.env.TARO_ENV === 'h5' ? { tabIndex: -1 } : {})}
        aria-modal
        aria-labelledby='win-modal-title'
      >
        {isWin && (
          <View className='win-confetti' aria-hidden>
            {Array.from({ length: 10 }, (_, index) => (
              <View key={index} className={`confetti-piece confetti-piece--${index}`} />
            ))}
          </View>
        )}
        <View className='win-ticket'>
          <View className='win-ticket-header'>
            <Text className='win-eyebrow'>
              {isWin ? 'A LITTLE GIFT FOR YOU' : 'GOOD LUCK IS ON THE WAY'}
            </Text>
            <Text id='win-modal-title' className='win-title'>
              {isWin ? '叮！好运签收' : '好运，再等等'}
            </Text>
            <Text className='win-subtitle'>
              {isWin ? '恭喜你，捕获一份小美好' : '这次擦肩而过，下次继续期待'}
            </Text>
            <View className='win-art-stage'>
              <View className='win-art-halo' />
              <Text className='win-art-spark win-art-spark--left'>✧</Text>
              <PrizeArt
                kind={record.prizeKind || (isWin ? 'redpack' : 'thanks')}
                value={record.prizeValue}
                large
              />
              <Text className='win-art-spark win-art-spark--right'>✦</Text>
            </View>
            <Text className='win-prize-label'>{isWin ? '你获得了' : '谢谢你的参与'}</Text>
            <Text className='win-prize-name'>{record.prizeName}</Text>
            {record.prizeDesc && <Text className='win-prize-description'>{record.prizeDesc}</Text>}
          </View>
          <View className='win-ticket-divider'>
            <View />
            <Text>LUCKY YOU</Text>
            <View />
          </View>
          <View className='win-ticket-bottom'>
            <Text className='win-result-note'>
              {isWin
                ? record.id === 'preview'
                  ? '中奖效果预览 · 愿好事如期而至'
                  : '奖品已放入「我的奖品」，记得查看哦'
                : '愿你的每一份期待，都有回响'}
            </Text>
          </View>
        </View>
        <ActionButton
          className='win-close-button'
          aria-label='关闭抽奖结果弹窗'
          onClick={requestClose}
        >
          <View />
          <View />
        </ActionButton>
      </View>
    </View>
  )
}
