import { Button, Paginator } from 'components/ui'
import { ClientForm } from 'components/client'
import { useForm } from 'react-hook-form'
import { parseCurrency } from 'utils'
import { useClientStore } from 'store'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ClientFormSchema,
  SelectedClientFormSchema,
  type ClientFormSchemaType,
  type SelectedClientFormSchemaType
} from 'schemas'
import { FormProvider } from 'react-hook-form'
import { useCallback, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createClient, CreateClientRequest } from 'services'
import { toast } from 'react-toastify'

interface ClientPageFooterProps {
  isHomeScreen: boolean
  list: {
    total_pages: number
  }
  
  handlePageClick: (selectedItem: { selected: number }) => void
  page: number
  refetch: () => void
}
export function ClientPageFooter({
  isHomeScreen,
  list,
  handlePageClick,
  page,
  refetch
}: ClientPageFooterProps) {
  const [createClientForm, setCreateClientForm] = useState(false)
  const [selectedClientsForm, setSelectedClientsForm] = useState(false)
  const { deleteSelectedClients, selectedClients } = useClientStore()

  const onClickBottomBtn = useCallback(() => {
    if (isHomeScreen) {
      setCreateClientForm(true)
      createUserForm.reset()
      return
    }

    setSelectedClientsForm(true)
    deleteSelectedClientsForm.reset()
    return

    //eslint-disable-next-line
  }, [isHomeScreen])

  const createUserForm = useForm<ClientFormSchemaType>({
    resolver: zodResolver(ClientFormSchema),
    defaultValues: {
      name: '',
      sallary: '',
      company_sallary: ''
    }
  })

  const deleteSelectedClientsForm = useForm<SelectedClientFormSchemaType>({
    resolver: zodResolver(SelectedClientFormSchema),
    defaultValues: {
      clients: []
    }
  })

  const { mutate: onCreateClient, isPending: isCreatingClient } = useMutation({
    mutationFn: (data: CreateClientRequest) => createClient(data),
    onSuccess: () => {
      refetch()
      setCreateClientForm(false)
      createUserForm.reset()
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
      onCreateClient(params)
    },
    [onCreateClient]
  )

  const handleDeleteSelectedClients = useCallback(
    (data: SelectedClientFormSchemaType) => {
      deleteSelectedClients(data.clients)
      setSelectedClientsForm(false)
    },
    [deleteSelectedClients, selectedClients]
  )

  return (
    <footer>
      {createClientForm && (
        <FormProvider {...createUserForm}>
          <ClientForm
            onSubmit={handleCreateClient}
            buttonText="Criar Cliente"
            title="Criar Cliente"
            onClose={() => setCreateClientForm(false)}
            loading={isCreatingClient}
          />
        </FormProvider>
      )}
      {selectedClientsForm && (
        <FormProvider {...deleteSelectedClientsForm}>
          <ClientForm
            onSubmit={handleDeleteSelectedClients}
            buttonText="Limpar clientes selecionados"
            title="Limpar clientes"
            onClose={() => setSelectedClientsForm(false)}
            type="delete"
          />
        </FormProvider>
      )}
      <Button
        className="h-10 w-full border-2 border-theme-primary text-sm font-bold text-theme-primary transition-all duration-300 hover:bg-theme-primary hover:text-white"
        onClick={onClickBottomBtn}
        data-testid="client-footer-button"
      >
        {isHomeScreen ? 'Criar Cliente' : 'Limpar clientes selecionados'}
      </Button>
      {!!list.total_pages && list.total_pages > 1 && (
        <Paginator
          pageCount={list.total_pages || 0}
          handlePageClick={handlePageClick}
          className="pt-5"
          currentPage={page - 1}
        />
      )}
    </footer>
  )
}
