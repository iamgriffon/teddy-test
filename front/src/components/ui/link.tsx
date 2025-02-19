import { LinkProps as RouterLinkProps, Link as RouterLink } from 'react-router-dom'
import { cn } from 'utils'

interface LinkProps extends RouterLinkProps {
  active?: boolean
}

export function Link({ children, active: condition = false, ...props }: LinkProps) {
  return (
    <RouterLink
      {...props}
      className={cn(
        condition
          ? 'text-base text-theme-primary underline stroke-theme-primary fill-theme-primary hover:text-orange-800/80 hover:fill-orange-800/80'
          : 'text-base hover:text-theme-primary/80 hover:fill-theme-primary/80',
        props.className
      )}
    >
      {children}
    </RouterLink>
  )
}
