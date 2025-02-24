import { cn } from 'utils/cn'
import { HTMLAttributes } from 'react'

export function ClientCardSkeleton({
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn('bg-gray-200 animate-pulse', props.className)}
      {...props}
    />
  )
}
