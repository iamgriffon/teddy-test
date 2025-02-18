import { cn } from 'utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  loading?: boolean
}

export function Button({
  children,
  className,
  loading,
  ...props
}: ButtonProps) {
  const baseButtonStyle = cn(
    'w-full flex items-center font-bold justify-center text-white rounded-[4px]',
    loading && 'opacity-50 animate-pulse cursor-not-allowed'
  )

  return (
    <button className={cn(baseButtonStyle, className)} {...props}>
      {loading ? 'Carregando...' : children}
    </button>
  )
}
