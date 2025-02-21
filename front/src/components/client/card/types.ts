import { ClientDTO } from 'dtos'
import { HTMLAttributes } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  client: ClientDTO
  onCRUDClient?: () => void
  onSelectClient?: (client: ClientDTO) => void
  type: 'list' | 'selected' | 'skeleton'
}
