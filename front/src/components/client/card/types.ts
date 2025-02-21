import { ClientDTO } from 'dtos'
import { HTMLAttributes } from 'react'
import { Interface } from 'readline/promises'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  client: ClientDTO
  onCRUDClient?: () => void
  onSelectClient?: (client: ClientDTO) => void
  type: 'list' | 'selected' | 'skeleton'
}
