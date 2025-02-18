import { useMutation, useQuery } from '@tanstack/react-query'
import Layout from 'components/common/layout'
import { Button } from 'components/ui/button'
import ClientCard from 'components/ui/client-card'
import { ClientForm } from 'components/ui/client-form'
import { Paginator } from 'components/ui/paginator'
import { ClientDTO } from 'dtos/userDTO'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createClient, getClients } from 'services/clients'
import { useClientStore } from 'store/client/store'
import { useUserStore } from 'store/user/store'
import { usePagination } from 'utils/ use-pagination'
import { useForm, FormProvider } from 'react-hook-form'
import { ClientFormSchema } from 'schemas/client-form-schema'
import { ClientFormSchemaType } from 'schemas/client-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseCurrency } from 'utils/parse-currency'
import { printCurrency } from 'utils/print-currency'
import { CreateClientRequest } from 'services/types'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function Clients() {
  const { clients, selectedClients, selectClient, setClients } =
    useClientStore()
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const location = useLocation()
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['clients'],
    queryFn: () => getClients(page, itemsPerPage),
    enabled: !!page && !!itemsPerPage
  })

  const handleOpenForm = useCallback(() => {
    setIsFormOpen(true)
    form.reset()
  }, [])

  useEffect(() => {
    if (data) {
      setClients(data.clients)
    }
  }, [data])

  const list = useMemo(() => {
    const searchParams = new URLSearchParams(location.search)
    const selected = searchParams.get('selected')

    if (selected === 'true') {
      return {
        data: selectedClients,
        total: selectedClients.length,
        total_pages: Math.ceil(selectedClients.length / itemsPerPage)
      }
    }
    if (selected === 'false' || !selected) {
      return {
        data: clients,
        total: data?.total,
        total_pages: data?.total_pages
      }
    }
    searchParams.delete('selected')
    const newSearch = searchParams.toString()
    window.history.replaceState(
      null,
      '',
      newSearch ? `?${newSearch}` : window.location.pathname
    )
    return {
      data: clients,
      total: data?.total
    }
  }, [clients, selectedClients, location.search])

  const options = useMemo(() => {
    return Array.from({ length: 11 }, (_, index) => index + 10).map((item) => ({
      label: item,
      value: item
    }))
  }, [])

  const totalLabel = useMemo(() => {
    if (location.search.includes('selected=true')) {
      if (list.total === 1) {
        return 'cliente selecionado'
      }
      return 'clientes selecionados'
    }
    if (list.total === 1) {
      return 'cliente encontrado'
    }
    return 'clientes encontrados'
  }, [location.search])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setItemsPerPage(Number(event.target.value))
    },
    [refetch]
  )

  const form = useForm<ClientFormSchemaType>({
    resolver: zodResolver(ClientFormSchema),
    defaultValues: {
      name: '',
      sallary: '',
      company_sallary: ''
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateClientRequest) => createClient(data),
    onSuccess: () => {
      refetch()
      setIsFormOpen(false)
      form.reset()
      toast.success('Cliente criado com sucesso!')
    }
  })

  const handleCreateClient = useCallback(
    (data: ClientFormSchemaType) => {
      const params = {
        ...data,
        sallary: parseCurrency(data.sallary),
        company_sallary: parseCurrency(data.company_sallary)
      }
      mutate(params)
    },
    [mutate]
  )

  useEffect(() => {
    refetch()
    setPage(1)
  }, [itemsPerPage])

  useEffect(() => {
    refetch()
  }, [page])

  const onCRUDClient = useCallback(() => {
    refetch()
  }, [])

  return (
    <div className="flex flex-col h-full flex-grow justify-between">
      <section
        className="flex flex-col gap-4 justify-between mb-5"
        data-testid="clients-section"
      >
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-lg leading-6" data-testid="clients-total-label">
            <strong>{list.total}</strong>
            <span className="text-theme-black">{totalLabel}:</span>
          </p>
          <div className="flex items-center gap-2.5">
            <p className="text-lg leading-6">Clientes por página:</p>
            <select
              id="itemsPerPage"
              className="border border-theme-gray rounded-md p-2"
              data-testid="items-per-page-select"
              value={itemsPerPage}
              onChange={handleChange}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid w-full h-full grid-cols-4 max-sm:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3 gap-5" data-testid="clients-cards-wrapper">
          {isLoading
            ? Array.from({ length: itemsPerPage }).map((_, index) => (
                <ClientCard
                  key={index}
                  client={{
                    id: index,
                    name: '',
                    sallary: 0,
                    company_sallary: 0
                  }}
                  loading={true}
                  data-testid={`client-card-${index}`}
                  onCRUDClient={() => {}}
                />
              ))
            : list.data.map((client, index) => (
                <ClientCard
                  key={index}
                  client={client}
                  loading={isLoading}
                  data-testid={`client-card-${index}`}
                  onCRUDClient={onCRUDClient}
                />
              ))}
        </div>
      </section>
      <footer>
        <Button
          className="w-full border-2 h-10 border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-white font-bold transition-all duration-300 text-sm"
          onClick={handleOpenForm}
          data-testid="create-client-button"
        >
          Criar Cliente
        </Button>
        {!!list.total_pages && list.total_pages > 1 && (
          <Paginator
            pageCount={list.total_pages || 0}
            handlePageClick={(selectedItem) =>
              setPage(selectedItem.selected + 1)
            }
            className="pt-5 pb-20"
            currentPage={page - 1}
          />
        )}
      </footer>
      {isFormOpen && (
        <FormProvider {...form}>
          <ClientForm
            onSubmit={handleCreateClient}
            buttonText="Criar Cliente"
            title="Criar Cliente"
            onClose={() => setIsFormOpen(false)}
            loading={isPending}
          />
        </FormProvider>
      )}
    </div>
  )
}
