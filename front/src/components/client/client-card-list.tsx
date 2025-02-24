import { ClientDTO } from 'dtos'
import { ClientCard } from './card'
import { ClientCardSkeleton } from './card/card-skeleton'
import { useMemo } from 'react'

interface ClientListProps {
  isLoading: boolean
  itemsPerPage: number
  selected: boolean | null
  list: {
    data: ClientDTO[]
    total: number
    total_pages: number
  }
  onSelectClient: (client: ClientDTO) => void
  onUpdateClient?: () => void
}

export function ClientList({
  isLoading,
  itemsPerPage,
  list,
  selected,
  onSelectClient,
  onUpdateClient
}: ClientListProps) {
  const cardType = useMemo(() => {
    if (selected) return 'selected'
    if (isLoading) return 'skeleton'
    return 'list'
  }, [selected, isLoading])

  const Cards = () => {
    if (cardType === 'skeleton') {
      return Array.from({ length: itemsPerPage }).map((_, index) => (
        <ClientCardSkeleton
          key={index}
          type={cardType}
          client={{} as ClientDTO}
          data-testid={`client-card-skeleton`}
          onUpdateClient={() => {}}
        />
      ))
    }
    if (!list.data.length) {
      return (
        <div className="text-center text-gray-500">
          Nenhum cliente encontrado
        </div>
      )
    }
    return list.data.map((client, index) => (
      <ClientCard
        key={index}
        client={client}
        type={cardType}
        onSelectClient={onSelectClient}
        onUpdateClient={onUpdateClient}
        data-testid={`client-card-${index + 1}`}
      />
    ))
  }
  return (
    <div
      className="grid max-h-[calc(100vh-320px)] w-full grid-cols-1 gap-5 overflow-y-auto p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      style={{
        gridAutoRows: 'minmax(150px, auto)'
      }}
      data-testid="clients-cards-wrapper"
    >
      <Cards />
    </div>
  )
}
