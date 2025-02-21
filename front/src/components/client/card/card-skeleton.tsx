import { cn } from 'utils/cn'
import { CardProps } from './types'

export function ClientCardSkeleton({ ...props }: CardProps) {
  return (
    <section
      className={cn('bg-gray-200 animate-pulse', props.className)}
      {...props}
    />
  )
}
