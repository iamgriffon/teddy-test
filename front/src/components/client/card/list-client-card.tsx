import { AddIcon, DeleteIcon, EditIcon } from 'components/icons'
import { ClientDTO } from 'dtos'
import { useCallback, useMemo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { deleteClient, updateClient } from 'services'
import { useForm, FormProvider } from 'react-hook-form'
import { ClientFormSchema, type ClientFormSchemaType } from 'schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseCurrency, printCurrency, cn } from 'utils'
import { ClientForm } from '../client-form'
import { useUserStore } from 'store'
import { toast } from 'react-toastify'
import { CardProps } from './types'
import { text } from 'consts'
import { useLocalStorage } from '@uidotdev/usehooks'
export function ListClientCard({
  client,
  onCRUDClient,
  onSelectClient,
  ...props
}: CardProps) {
  const { user } = useUserStore()

  const { mutate: onDeleteClient, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteClient(id),
    onSuccess: () => {
      setDeleteFormOpen(false)
      toast.success(text.DELETE_CLIENT_SUCCESS)
      onCRUDClient?.()
    },
    onError: () => {
      toast.error(text.DELETE_CLIENT_ERROR)
    }
  })

  const [clients] = useLocalStorage<ClientDTO[]>('clients', [])

  const { mutate: onUpdateClient, isPending: isUpdating } = useMutation({
    mutationFn: (params: ClientDTO) => updateClient(client.id, params),
    onSuccess: () => {
      setUpdateFormOpen(false)
      toast.success(text.UPDATE_CLIENT_SUCCESS)
      onCRUDClient?.()
    },
    onError: () => {
      toast.error(text.UPDATE_CLIENT_ERROR)
    }
  })

  const isSelected = useMemo(() => {
    return clients.find((c) => c.id === client.id)
  }, [clients, client?.id])

  const [deleteFormOpen, setDeleteFormOpen] = useState(false)
  const [updateFormOpen, setUpdateFormOpen] = useState(false)

  const handleAddClient = useCallback(() => {
    if (!client || !user) return
    onSelectClient?.(client)
    toast.success(
      `${client.name} ${isSelected ? text.DELETE_SELECTED_CLIENT_SUCCESS : text.SELECT_CLIENT_SUCCESS}`,
      {
        position: 'bottom-left'
      }
    )
  }, [client, isSelected, user])

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

  if (!user)
    return (
      <section
        {...props}
        className={cn(props.className, 'bg-red-gray-100 animate-pulse')}
      />
    )

  return (
    <section {...props}>
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
