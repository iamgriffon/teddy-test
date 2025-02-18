import { cn } from 'utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function Input({ className, ...props }: InputProps) {
  const baseInputStyle = cn(
    'py-3 pl-5 text-2xl placeholder:text-[#AAAAAA] border-2 border-[#D9D9D9] rounded-[4px]'
  )
  return <input className={cn(baseInputStyle, 'h-12', className)} {...props} />
}
