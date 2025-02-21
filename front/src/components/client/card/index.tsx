import { ClientDTO } from 'dtos'
import { ListClientCard } from './list-client-card'
import { SelectedClientCard } from './selected-client-card'
import { ClientCardSkeleton } from './card-skeleton'
import { cn } from 'utils/cn'
import { CardProps } from './types'

export function ClientCard({
  client = {} as ClientDTO,
  onCRUDClient = () => {},
  onSelectClient = () => {},
  type,
  ...props
}: CardProps) {
  const ComponentMap = {
    list: ListClientCard,
    selected: SelectedClientCard,
    skeleton: ClientCardSkeleton
  }

  const baseStyle =
    'flex h-[150px] min-w-[285px] max-w-[320px] flex-col items-center justify-center gap-2.5 rounded-[4px] bg-white px-16 py-4 shadow-[0px_0px_4px_0px_#0000001A]'

  const Component = ComponentMap[type] as React.FC<CardProps>
  return (
    <Component
      client={client}
      className={cn(baseStyle, props.className)}
      onCRUDClient={onCRUDClient}
      onSelectClient={onSelectClient}
      type={type}
      {...props}
    />
  )
}
