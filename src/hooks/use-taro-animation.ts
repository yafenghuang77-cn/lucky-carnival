import { createAnimation } from '@tarojs/taro'
import { useCallback, useRef, useState } from 'react'

import type { Animation } from '@tarojs/taro'

/** Keep one animation instance per component and export each update to Taro components. */
export default function useTaroAnimation() {
  const instance = useRef<Animation | null>(null)
  const [animation, setAnimation] = useState<ReturnType<Animation['export']>>()

  const animate = useCallback((configure: (value: Animation) => Animation, duration: number) => {
    instance.current ??= createAnimation({ timingFunction: 'ease-out' })
    const reduceMotion =
      process.env.TARO_ENV === 'h5' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setAnimation(
      configure(instance.current)
        .step({ duration: reduceMotion ? 0 : duration })
        .export(),
    )
  }, [])

  return { animation, animate }
}
