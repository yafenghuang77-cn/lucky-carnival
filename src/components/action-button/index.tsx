import { Button } from '@tarojs/components'
import { useEffect } from 'react'

import useTaroAnimation from '@/hooks/use-taro-animation'

import type { ButtonProps } from '@tarojs/components'
import type { KeyboardEvent } from 'react'

import './index.less'

type Props = Pick<ButtonProps, 'children' | 'className' | 'disabled'> & {
  'aria-label'?: string
  onClick?: () => void
}

export default function ActionButton({
  className = '',
  disabled,
  onClick,
  'aria-label': ariaLabel,
  ...props
}: Props) {
  const { animation, animate } = useTaroAnimation()
  const press = () => {
    if (!disabled) {
      animate((value) => value.opacity(0.88), 80)
    }
  }
  const release = () => animate((value) => value.opacity(1), 100)

  useEffect(() => {
    if (disabled) {
      animate((value) => value.opacity(1), 0)
    }
  }, [animate, disabled])

  const handleClick = () => {
    if (!disabled) {
      onClick?.()
    }
  }
  const keyboardProps =
    process.env.TARO_ENV === 'h5'
      ? {
          role: 'button',
          tabIndex: disabled ? -1 : 0,
          'aria-disabled': Boolean(disabled),
          onMouseDown: press,
          onMouseUp: release,
          onMouseLeave: release,
          onBlur: release,
          onKeyUp: release,
          onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              if (!event.repeat) {
                press()
                handleClick()
              }
            }
          },
        }
      : {}

  return (
    <Button
      {...props}
      {...keyboardProps}
      className={`action-button ${className}`}
      disabled={disabled || undefined}
      ariaLabel={ariaLabel}
      aria-label={ariaLabel}
      animation={animation}
      hoverClass='none'
      onClick={handleClick}
      onTouchStart={press}
      onTouchEnd={release}
      onTouchCancel={release}
    />
  )
}
