import { View } from '@tarojs/components'
import { useEffect } from 'react'

import useTaroAnimation, { prefersReducedMotion } from '@/hooks/use-taro-animation'

import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  className?: string
  duration?: number
}>

/** Animate a content group once; keep navigation and state changes immediate. */
export default function MotionView({ children, className = '', duration = 280 }: Props) {
  const { animation, animate } = useTaroAnimation()
  const reducedMotion = prefersReducedMotion()

  useEffect(() => {
    const timer = setTimeout(
      () => {
        animate((motion) => motion.opacity(1).translateY(0), duration)
      },
      reducedMotion ? 0 : 32,
    )
    return () => clearTimeout(timer)
  }, [animate, duration, reducedMotion])

  return (
    <View
      className={`motion-view ${className}`}
      style={{
        opacity: reducedMotion ? 1 : 0,
        transform: reducedMotion ? 'none' : 'translateY(12px)',
      }}
      animation={animation}
    >
      {children}
    </View>
  )
}
