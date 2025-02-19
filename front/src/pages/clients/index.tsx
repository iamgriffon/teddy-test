import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getClients, GetClientsResponse } from 'services'
import { useClientStore } from 'store'
import { ClientDTO } from 'dtos'
import { ClientList, ClientPageSelector, ClientPageFooter } from 'components/client'

export function Clients() {
  const { clients, selectedClients, updateList, list } = useClientStore()
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const selected = searchParams.get('selected')
  const isHomeScreen = useMemo(() => {
    return !searchParams.size || !selected || selected === 'false'
  }, [searchParams, selected])

  const { data, isLoading, refetch } = useQuery({
    queryKey: [],
    queryFn: () => getClients(page, itemsPerPage),
    refetchOnWindowFocus: true,
    refetchOnMount: true
  })

  const cardType = useMemo(() => {
    if (selected) return 'selected'
    if (isLoading) return 'skeleton'
    return 'list'
  }, [selected, isLoading])

  const onFetchClients = useCallback((data: GetClientsResponse) => {
    let clientsList = {
      data: [] as ClientDTO[],
      total: 0,
      total_pages: 0
    }

    if (selected === 'true') {
      clientsList = {
        data: selectedClients,
        total: selectedClients.length,
        total_pages: Math.ceil(selectedClients.length / itemsPerPage)
      }
    }
    if (selected === 'false' || !selected) {
      clientsList = {
        data: data.clients,
        total: data?.total || 0,
        total_pages: data?.total_pages || 0
      }
    }
    updateList(clientsList)
  }, [selected, clients, data, selectedClients, itemsPerPage, updateList])

  const sanitizeStoredClients = useCallback(() => {
    if (selectedClients.length && clients.length) {
      const storedClients = selectedClients.filter((client) =>
        clients.find((c) => c.id === client.id)
      )
      localStorage.setItem('selectedClients', JSON.stringify(storedClients))
    }
  }, [clients, selectedClients])

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1)
  }

  useEffect(() => {
    refetch()
    //eslint-disable-next-line
  }, [handlePageClick])

  useEffect(() => {
    if (data && location.pathname.includes('clients')) {
      onFetchClients(data)
    }
    //eslint-disable-next-line
  }, [data, location])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const selected = searchParams.get('selected')
    const paramsMap = ['true', 'false']
    const isValidParams =
      searchParams.size && paramsMap.includes(selected as string)

    if (!isValidParams) {
      navigate(window.location.pathname)
    }
  }, [location.search, navigate])

  if (list.data.length) {
    sanitizeStoredClients()
  }

  const onCRUDClient = () => {
    if (!isHomeScreen) {
      return sanitizeStoredClients()
    }
    refetch()
  }

  return (
    <div className="flex h-full grow flex-col justify-between">
      <section
        className="mb-5 flex flex-col h-[calc(100vh-320px)] gap-4 max-xl:w-[1024px] max-lg:w-[768px] max-md:w-[480px] max-sm:w-[320px] xl:w-[1280px]"
        data-testid="clients-section"
      >
        <ClientPageSelector
          reload={refetch}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
        <ClientList
          isLoading={isLoading}
          itemsPerPage={itemsPerPage}
          cardType={cardType}
          list={list}
          onCRUDClient={onCRUDClient}
        />
      </section>
      <ClientPageFooter
        isHomeScreen={isHomeScreen}
        list={list}
        handlePageClick={handlePageClick}
        page={page}
        refetch={refetch}
      />
    </div>
  )
}
