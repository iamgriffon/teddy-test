import { useCallback } from 'react'
import { printCurrency } from 'utils/print-currency'
import { MinusIcon } from 'components/icons/minus-icon'
import { CardProps } from './types'
import { toast } from 'react-toastify'
import { text } from 'consts'
export function SelectedClientCard({
  client,
  onSelectClient,
  ...props
}: CardProps) {
  const handleDeleteSelectedClient = useCallback(() => {
    onSelectClient?.(client)
    toast.success(text.DELETE_SELECTED_CLIENT_SUCCESS)
  }, [onSelectClient, client])

  return (
    <section {...props}>
      <h1 className="truncate font-bold" data-testid="client-form-name">
        {client?.name}
      </h1>
      <span data-testid="client-form-sallary" className="truncate">
        Salário: {printCurrency(client?.sallary)}
      </span>
      <span data-testid="client-form-company-sallary" className="truncate">
        Empresa: {printCurrency(client?.company_sallary)}
      </span>
      <div className="relative -right-10 flex w-full items-center justify-end">
        <button
          className="flex cursor-pointer items-center justify-center rounded-full hover:bg-gray-100"
          onClick={handleDeleteSelectedClient}
          data-testid="client-remove-button"
        >
          <MinusIcon width={17} height={17} />
        </button>
      </div>
    </section>
  )
}
