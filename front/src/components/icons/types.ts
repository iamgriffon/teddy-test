import { SVGProps } from 'react'

export interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string
  width?: number
  height?: number
  fill?: string
  stroke?: string
  onClick?: () => void
}
