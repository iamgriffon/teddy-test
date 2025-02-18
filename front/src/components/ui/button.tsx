import { cn } from 'utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function Button({ children, className, ...props }: ButtonProps) {
  const baseButtonStyle = cn(
    'w-full flex items-center font-bold justify-center text-white rounded-[4px]'
  )

  return (
    <button className={cn(baseButtonStyle, className)} {...props}>
      {children}
    </button>
  )
}
