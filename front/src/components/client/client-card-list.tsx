import { ClientDTO } from 'dtos'
import { ClientCard } from './card'

interface ClientListProps {
  isLoading: boolean
  itemsPerPage: number
  cardType: 'list' | 'selected' | 'skeleton'
  list: {
    data: ClientDTO[]
    total: number
    total_pages: number
  }
  onCRUDClient: () => void
}

export function ClientList({
  isLoading,
  itemsPerPage,
  cardType,
  list,
  onCRUDClient
}: ClientListProps) {

  return (
    <div
      className="grid w-full max-h-[calc(100vh-320px)] grid-cols-1 gap-5 overflow-y-auto p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      style={{
        gridAutoRows: 'minmax(150px, auto)'
      }}
      data-testid="clients-cards-wrapper"
    >
      {isLoading
        ? Array.from({ length: itemsPerPage }).map((_, index) => (
            <ClientCard
              key={index}
              type={cardType}
              data-testid={`client-card-skeleton-${index}`}
            />
          ))
        : list.data.map((client, index) => (
            <ClientCard
              key={index}
              client={client}
              type={cardType}
              data-testid={`client-card-${index}`}
              onCRUDClient={onCRUDClient}
            />
          ))}
    </div>
  )
}
