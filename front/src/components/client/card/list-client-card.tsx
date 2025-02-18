import { AddIcon, DeleteIcon, EditIcon } from 'components/icons'
import { ClientDTO } from 'dtos'
import { HTMLAttributes, useCallback, useMemo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { deleteClient, updateClient } from 'services'
import { useForm, FormProvider } from 'react-hook-form'
import { ClientFormSchema, type ClientFormSchemaType } from 'schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseCurrency, printCurrency, cn } from 'utils'
import { ClientForm } from '../client-form'
import { useClientStore } from 'store'
import { toast } from 'react-toastify'

interface ClientCardProps extends HTMLAttributes<HTMLDivElement> {
  client: ClientDTO
  onCRUDClient: () => void
}

export function ListClientCard({
  client,
  onCRUDClient,
  ...props
}: ClientCardProps) {
  const { mutate: onDeleteClient, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteClient(id),
    onSuccess: () => {
      setDeleteFormOpen(false)
      toast.success('Cliente deletado com sucesso!')
      onCRUDClient()
    },
    onError: () => {
      toast.error('Erro ao deletar cliente!')
    }
  })

  const { mutate: onUpdateClient, isPending: isUpdating } = useMutation({
    mutationFn: (params: ClientDTO) => updateClient(client.id, params),
    onSuccess: () => {
      setUpdateFormOpen(false)
      toast.success('Cliente atualizado com sucesso!')
      onCRUDClient()
    },
    onError: () => {
      toast.error('Erro ao atualizar cliente!')
    }
  })

  const { selectClient, selectedClients } = useClientStore()
  const isSelected = useMemo(
    () =>
      selectedClients.some((selectedClient) => selectedClient.id === client.id),
    [selectedClients, client.id]
  )
  const [deleteFormOpen, setDeleteFormOpen] = useState(false)
  const [updateFormOpen, setUpdateFormOpen] = useState(false)

  const handleAddClient = useCallback(() => {
    selectClient(client)
    toast.success(
      `${client.name} ${isSelected ? 'removido' : 'adicionado'} com sucesso!`,
      {
        position: 'bottom-left'
      }
    )
  }, [client, selectClient, isSelected])

  const UpdateForm = useForm<ClientFormSchemaType>({
    resolver: zodResolver(ClientFormSchema),
    defaultValues: {
      name: client.name,
      sallary: printCurrency(client.sallary),
      company_sallary: printCurrency(client.company_sallary)
    }
  })

  const DeleteForm = useForm<ClientFormSchemaType>({
    resolver: zodResolver(ClientFormSchema),
    defaultValues: {
      name: client.name
    }
  })
  const handleUpdateClient = useCallback(
    (data: ClientFormSchemaType) => {
      const request = {
        ...data,
        id: client.id,
        sallary: parseCurrency(data.sallary),
        company_sallary: parseCurrency(data.company_sallary)
      }
      onUpdateClient(request)
    },
    [onUpdateClient, client.id]
  )

  const UpdateClientForm = useCallback(
    () => (
      <FormProvider {...UpdateForm}>
        <ClientForm
          buttonText="Editar Cliente"
          title="Editar Cliente"
          onSubmit={handleUpdateClient}
          onClose={() => {
            UpdateForm.reset()
            setUpdateFormOpen(false)
          }}
          loading={isUpdating}
        />
      </FormProvider>
    ),
    [UpdateForm, handleUpdateClient, isUpdating]
  )

  const DeleteClientForm = useCallback(
    () => (
      <FormProvider {...DeleteForm}>
        <ClientForm
          buttonText="Excluir Cliente"
          title="Excluir Cliente"
          type="delete"
          onSubmit={() => onDeleteClient(client.id)}
          onClose={() => {
            DeleteForm.reset()
            setDeleteFormOpen(false)
          }}
          loading={isDeleting}
        />
      </FormProvider>
    ),
    [DeleteForm, client, isDeleting, onDeleteClient]
  )

  return (
    <section
      {...props}
    >
      <h1 className="truncate font-bold" data-testid="client-form-name">
        {client.name}
      </h1>
      <span data-testid="client-form-sallary" className="truncate">
        Salário: {printCurrency(client.sallary)}
      </span>
      <span data-testid="client-form-company-sallary" className="truncate">
        Empresa: {printCurrency(client.company_sallary)}
      </span>
      <div className="flex w-full items-center justify-between pt-1.5">
        <AddIcon
          width={17}
          height={17}
          className={cn('cursor-pointer', isSelected && 'rotate-45')}
          onClick={handleAddClient}
          data-testid={isSelected ? 'client-remove-icon' : 'client-add-icon'}
        />
        <EditIcon
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => setUpdateFormOpen(true)}
          data-testid="client-form-edit-icon"
        />
        <DeleteIcon
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => setDeleteFormOpen(true)}
          data-testid="client-form-delete-icon"
        />
      </div>
      {deleteFormOpen && <DeleteClientForm />}
      {updateFormOpen && <UpdateClientForm />}
    </section>
  )
}
