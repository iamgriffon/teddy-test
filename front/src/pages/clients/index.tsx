import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useUserStore } from 'store'
import { ClientDTO } from 'dtos'
import {
  ClientList,
  ClientPageSelector,
  ClientPageFooter
} from 'components/client'
import { getClients, getUser, isAuthenticated } from 'services'
import { useLocalStorage } from '@uidotdev/usehooks'

export function Clients() {
  const [page, setPage] = useState(1)
  const { setUser, user: userStore } = useUserStore()
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [clients, setClients] = useLocalStorage<ClientDTO[]>('clients', [])
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  )

  const selected = searchParams.get('selected')
  const isMainScreen = useMemo(() => {
    return !searchParams.size || !selected || selected === 'false'
  }, [searchParams, selected])
  const isUserAuthenticated = useMemo(() => isAuthenticated(), [])

  const { data, isLoading, refetch } = useQuery({
    queryKey: [],
    queryFn: () => getClients(page, itemsPerPage),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 5,
    enabled: isUserAuthenticated || !!userStore?.name
  })

  const { data: userData, refetch: refetchUser } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    enabled: !!isUserAuthenticated && !userStore,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 2
  })

  useEffect(() => {
    if (userData && userData.name) {
      setUser({
        id: userData.id,
        name: userData.name
      })
    }
  }, [userData, setUser])

  const pageData = {
    data: selected
      ? clients.slice((page - 1) * itemsPerPage, page * itemsPerPage)
      : data?.clients || [],
    total: selected ? clients.length : data?.total || 0,
    total_pages: selected
      ? Math.ceil(clients.length / itemsPerPage)
      : data?.total_pages || 0
  }

  const handleSelectedClient = useCallback(
    (client: ClientDTO) => {
      if (clients.find((selectedClient) => selectedClient.id === client.id)) {
        const selectedClients = clients.filter(
          (selectedClient) => selectedClient.id !== client.id
        )
        return setClients([...selectedClients])
      }
      return setClients([...clients, client])
    },
    [clients, setClients]
  )

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1)
  }

  const onUpdateClient = useCallback(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    if (!!pageData.total_pages && itemsPerPage * page - 1 > pageData.total) {
      setPage(pageData.total_pages)
    }
    //eslint-disable-next-line
  }, [handlePageClick, setItemsPerPage, pageData, refetch])

  useEffect(() => {
    refetch()
    //eslint-disable-next-line
  }, [handlePageClick])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const selected = searchParams.get('selected')
    const paramsMap = ['true', 'false']
    const isValidParams =
      searchParams.size && paramsMap.includes(selected as string)

    if (!isValidParams) {
      navigate(window.location.pathname)
    }
    setPage(1)
    Promise.all([refetch(), refetchUser()])
    //eslint-disable-next-line
  }, [location.search, navigate, setItemsPerPage])

  const handleClearClients = useCallback(() => {
    setClients([])
  }, [setClients])

  return (
    <div className="flex size-full grow flex-col overflow-x-auto px-10">
      <section
        className="mb-5 flex h-[calc(100vh-320px)] flex-col gap-4 max-xl:w-[1024px] max-lg:w-[768px] max-md:w-[480px] max-sm:w-[320px] xl:w-[1280px]"
        data-testid="clients-section"
      >
        <ClientPageSelector
          total={pageData.total || 0}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
        <ClientList
          isLoading={isLoading}
          itemsPerPage={itemsPerPage}
          list={pageData}
          selected={selected === 'true'}
          onSelectClient={handleSelectedClient}
          onUpdateClient={onUpdateClient}
        />
      </section>
      <ClientPageFooter
        isMainScreen={isMainScreen}
        list={pageData}
        handlePageClick={handlePageClick}
        page={page}
        refetch={refetch}
        handleClearClients={handleClearClients}
      />
    </div>
  )
}
