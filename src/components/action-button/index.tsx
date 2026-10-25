import { Button } from '@tarojs/components'
import { forwardRef, ButtonHTMLAttributes } from 'react'
import './index.less'

type Props = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'disabled' | 'aria-label'> & {
  onClick?: () => void
}

/** Native H5 buttons supply keyboard behavior; mini apps use Taro's native control. */
const ActionButton = forwardRef<HTMLButtonElement, Props>(({ className = '', disabled, ...props }, ref) => {
  const buttonClass = `action-button ${className}`
  if (process.env.TARO_ENV === 'h5') {
    return <button {...props} ref={ref} type='button' className={buttonClass} disabled={disabled} />
  }
  return <Button {...props} ref={ref} className={buttonClass} disabled={disabled || undefined} />
})

ActionButton.displayName = 'ActionButton'
export default ActionButton
