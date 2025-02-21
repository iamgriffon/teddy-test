import { useMemo } from 'react'
import { cn } from 'utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  loading?: boolean
  variant?: 'primary' | 'secondary'
}

export function Button({
  children,
  className,
  loading,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const baseButtonStyle = cn(
    'w-full flex items-center font-bold justify-center text-white rounded-[4px] transition-colors duration-300',
    loading && 'opacity-50 animate-pulse cursor-not-allowed',
    props.disabled && 'opacity-50 animate-pulse cursor-not-allowed'
  )

  const buttonStyle = useMemo(() => {
    if (variant === 'primary') {
      return 'bg-theme-primary text-white hover:bg-orange-800/90'
    }
    if (variant === 'secondary') {
      return 'bg-white text-theme-primary hover:text-orange-800/90 border-2 border-theme-primary hover:border-orange-800/90'
    }
  }, [variant])

  return (
    <button className={cn(baseButtonStyle, buttonStyle, className)} {...props}>
      {loading ? 'Carregando...' : children}
    </button>
  )
}
