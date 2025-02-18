import { cn } from 'utils'
import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const baseInputStyle = cn(
      'py-3 pl-5 text-2xl placeholder:text-[#AAAAAA] border-2 border-theme-gray rounded-[4px]'
    )
    return <input className={cn(baseInputStyle, 'h-12', className)} ref={ref} {...props} />
  }
)

Input.displayName = 'Input'
