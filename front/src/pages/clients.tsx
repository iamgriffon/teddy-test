import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from 'components/ui/button'
import ClientCard from 'components/ui/client-card'
import { ClientForm } from 'components/ui/client-form'
import { Paginator } from 'components/ui/paginator'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createClient, getClients } from 'services/clients'
import { useClientStore } from 'store/client/store'
import { useForm, FormProvider } from 'react-hook-form'
import { ClientFormSchema } from 'schemas/client-form-schema'
import { ClientFormSchemaType } from 'schemas/client-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseCurrency } from 'utils/parse-currency'
import { CreateClientRequest } from 'services/types'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function Clients() {
  const { clients, selectedClients, setClients } = useClientStore()
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
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (data) {
      setClients(data.clients)
    }
    //eslint-disable-next-line
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
  }, [clients, selectedClients, location.search, data, itemsPerPage])

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
  }, [location.search, list.total])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setItemsPerPage(Number(event.target.value))
    },
    []
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
  }, [itemsPerPage, refetch])

  useEffect(() => {
    refetch()
  }, [page, refetch])

  const onCRUDClient = useCallback(() => {
    refetch()
    //eslint-disable-next-line
  }, [])

  return (
    <div className="flex h-full grow flex-col justify-between">
      <section
        className="mb-5 flex flex-col justify-between gap-4"
        data-testid="clients-section"
      >
        <div className="flex items-center justify-between">
          <p
            className="flex items-center gap-2 text-lg leading-6"
            data-testid="clients-total-label"
          >
            <strong>{list.total}</strong>
            <span className="text-theme-black">{totalLabel}:</span>
          </p>
          <div className="flex items-center gap-2.5">
            <p className="text-lg leading-6">Clientes por página:</p>
            <select
              id="itemsPerPage"
              className="rounded-md border border-theme-gray p-2"
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
        <div
          className="grid size-full grid-cols-4 gap-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1"
          data-testid="clients-cards-wrapper"
        >
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
          className="h-10 w-full border-2 border-theme-primary text-sm font-bold text-theme-primary transition-all duration-300 hover:bg-theme-primary hover:text-white"
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
            className="pb-20 pt-5"
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
