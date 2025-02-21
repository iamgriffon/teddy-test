import { Button, Paginator } from 'components/ui'
import { ClientForm } from 'components/client'
import { useForm } from 'react-hook-form'
import { parseCurrency } from 'utils'
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
import { ClientDTO } from 'dtos'
import { text } from 'consts'
interface ClientPageFooterProps {
  isMainScreen: boolean
  list: {
    data: ClientDTO[]
    total_pages: number
  }
  handleClearClients: () => void
  handlePageClick: (selectedItem: { selected: number }) => void
  page: number
  refetch: () => void
}
export function ClientPageFooter({
  isMainScreen,
  list,
  handlePageClick,
  page,
  refetch,
  handleClearClients
}: ClientPageFooterProps) {
  const [createClientForm, setCreateClientForm] = useState(false)
  const [selectedClientsForm, setSelectedClientsForm] = useState(false)

  const onClickBottomBtn = useCallback(() => {
    if (isMainScreen) {
      setCreateClientForm(true)
      createUserForm.reset()
      return
    }

    setSelectedClientsForm(true)
    deleteSelectedClientsForm.reset()
    return

    //eslint-disable-next-line
  }, [isMainScreen])

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
      toast.success(text.CREATE_CLIENT_SUCCESS)
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

  const onClearSelectedClients = useCallback(() => {
    handleClearClients()
    setSelectedClientsForm(false)
    deleteSelectedClientsForm.reset()
    toast.success(text.CLEAR_SELECTED_CLIENTS_SUCCESS)
  }, [handleClearClients, setSelectedClientsForm, deleteSelectedClientsForm])

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
            onSubmit={onClearSelectedClients}
            buttonText="Limpar clientes selecionados"
            title="Limpar clientes"
            onClose={() => setSelectedClientsForm(false)}
            type="clear"
          />
        </FormProvider>
      )}
      <Button
        className="h-10"
        onClick={onClickBottomBtn}
        data-testid="client-footer-button"
        disabled={!list.data.length}
      >
        {isMainScreen ? 'Criar Cliente' : 'Limpar clientes selecionados'}
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
