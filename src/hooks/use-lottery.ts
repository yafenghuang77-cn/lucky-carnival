import { showToast, useDidShow } from '@tarojs/taro'
import { useEffect, useRef, useState } from 'react'

import { makeWinRecord } from '../features/lottery/presentation'
import lotteryMock from '../mock/lottery.json'
import { consumeDemoChance, getDemoRemaining, saveDemoVoucher } from '../services/lottery-demo'
import { shanghaiDay } from '../utils/date'

import type { WinRecord } from '../types/lottery'

// Clockwise prize indexes; the center is reserved for GO.
const ROLL_ORDER = [0, 1, 2, 4, 7, 6, 5, 3]

export default function useLottery() {
  const { activity, prizes } = lotteryMock
  const [remain, setRemain] = useState(getDemoRemaining)
  const [activePrize, setActivePrize] = useState(-1)
  const [rolling, setRolling] = useState(false)
  const [winVisible, setWinVisible] = useState(false)
  const [winRecord, setWinRecord] = useState<WinRecord | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rollingRef = useRef(false)
  const drawButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    },
    [],
  )

  useDidShow(() => setRemain(getDemoRemaining()))

  useEffect(() => {
    let midnightTimer: ReturnType<typeof setTimeout>
    const scheduleReset = () => {
      const nextDay = new Date(`${shanghaiDay()}T00:00:00+08:00`).getTime() + 86400000
      midnightTimer = setTimeout(
        () => {
          setRemain(getDemoRemaining())
          scheduleReset()
        },
        Math.max(100, nextDay - Date.now() + 100),
      )
    }
    scheduleReset()
    return () => clearTimeout(midnightTimer)
  }, [])

  const startDraw = () => {
    if (rollingRef.current || remain <= 0) {
      return
    }
    const available = prizes.filter((prize) => prize.stock > 0 && prize.weight > 0)
    if (!available.length) {
      showToast({ title: '本轮奖品已抽完', icon: 'none' })
      return
    }
    if (!consumeDemoChance()) {
      setRemain(0)
      return
    }
    let random = Math.random() * available.reduce((sum, prize) => sum + prize.weight, 0)
    const prize =
      available.find((item) => {
        random -= item.weight
        return random < 0
      }) || available[available.length - 1]
    const totalSteps = 24 + ROLL_ORDER.indexOf(prizes.indexOf(prize)) + 1
    let step = 0
    rollingRef.current = true
    setRolling(true)
    setRemain(0)
    setActivePrize(-1)

    const tick = () => {
      setActivePrize(ROLL_ORDER[step % ROLL_ORDER.length])
      step += 1
      if (step >= totalSteps) {
        timerRef.current = setTimeout(() => {
          const result = makeWinRecord(prize)
          const record = result.isWin ? saveDemoVoucher(result, activity.endTime) : result
          setWinRecord(record)
          setWinVisible(true)
          setRolling(false)
          rollingRef.current = false
          timerRef.current = null
        }, 350)
        return
      }
      const delay = step > totalSteps - 7 ? 85 + (step - totalSteps + 7) * 32 : 70
      timerRef.current = setTimeout(tick, delay)
    }
    timerRef.current = setTimeout(tick, 70)
  }

  const previewWin = () => {
    if (rollingRef.current) {
      return
    }
    setWinRecord({
      ...makeWinRecord(prizes[1]),
      id: 'preview',
      prizeDesc: '一份好心情，即刻到账',
    })
    setWinVisible(true)
  }

  const closeModal = () => {
    setWinVisible(false)
    setActivePrize(-1)
  }

  return {
    activity,
    prizes,
    remain,
    activePrize,
    rolling,
    winVisible,
    winRecord,
    drawButtonRef,
    startDraw,
    previewWin,
    closeModal,
  }
}
