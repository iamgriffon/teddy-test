import { ClientDTO } from 'dtos'
import { HTMLAttributes, useCallback } from 'react'
import { printCurrency } from 'utils/print-currency'
import { useClientStore } from 'store/client'
import { MinusIcon } from 'components/icons/minus-icon'
import { CardProps } from './types'


export function SelectedClientCard({
  client,
  onCRUDClient,
  ...props
}: CardProps) {
  const { deleteSelectedClient } = useClientStore()

  const handleDeleteSelectedClient = useCallback(() => {
    deleteSelectedClient(client?.id.toString() || '')
    onCRUDClient?.()
  }, [deleteSelectedClient, client?.id, onCRUDClient])

  return (
    <section
      {...props}
    >
      <h1 className="truncate font-bold" data-testid="client-form-name">
        {client?.name}
      </h1>
      <span data-testid="client-form-sallary" className="truncate">
        Salário: {printCurrency(client?.sallary)}
      </span>
      <span data-testid="client-form-company-sallary" className="truncate">
        Empresa: {printCurrency(client?.company_sallary)}
      </span>
      <div className="relative flex w-full items-center justify-end -right-10">
        <button
          className="flex cursor-pointer items-center justify-center rounded-full hover:bg-gray-100"
          onClick={handleDeleteSelectedClient}
          data-testid="client-remove-button"
        >
          <MinusIcon
            width={17}
            height={17}
          />
        </button>
      </div>
    </section>
  )
}
