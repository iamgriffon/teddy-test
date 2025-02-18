import { maskSalary } from 'utils/input-masks'
import { Button } from './button'
import { Input } from './input'
import { Overlay } from './overlay'
import { useMemo, useState } from 'react'
import { CloseIcon } from 'components/icons/close-icon'
import { cn } from 'utils'
import { useFormContext } from 'react-hook-form'
interface ClientFormProps {
  onSubmit: (data: any) => void
  buttonText: string
  title: string
  onClose: () => void
  loading: boolean
  type?: 'create' | 'update' | 'delete'
}

export function ClientForm({
  onSubmit,
  buttonText,
  onClose,
  title,
  loading,
  type = 'create'
}: ClientFormProps) {
  const { handleSubmit, register, setValue, watch } = useFormContext()
  const formsWithInputs = useMemo(() => ['create', 'update'], [])
  const baseInputStyle = useMemo(() => 'w-[360px] h-10 text-base', [])
  const name = watch('name')
  return (
    <Overlay>
      <section className="flex flex-col w-full h-full justify-center items-center">
        <form
          className="flex flex-col gap-4 h-[w-360px] p-5 bg-white rounded-md justify-center mb-5"
          onSubmit={handleSubmit(onSubmit)}
          data-testid="client-form"
        >
          <p className="flex justify-between items-center w-full relative">
            <span className="text-lg font-bold" data-testid="client-form-title">{title}</span>
            <CloseIcon
              width={12}
              height={12}
              className="absolute right-0 top-1.5 cursor-pointer"
              onClick={onClose}
              data-testid="close-modal-button"
            />
          </p>
          {formsWithInputs.includes(type) ? (
            <>
              <Input
                placeholder="Digite o nome:"
                {...register('name')}
                className={baseInputStyle}
                data-testid="client-form-name-input"
              />
              <Input
                placeholder="Digite o salário"
                className={cn(baseInputStyle, 'appearance-none')}
                {...register('sallary', {
                  onChange: (e) => {
                    const value = e.target.value
                    const parsedValue = maskSalary(value)
                    setValue('sallary', parsedValue)
                  }
                })}
                data-testid="client-form-sallary-input"
              />
              <Input
                placeholder="Digite o valor da empresa"
                className={baseInputStyle}
                {...register('company_sallary', {
                  onChange: (e) => {
                    const value = e.target.value
                    const parsedValue = maskSalary(value)
                    setValue('company_sallary', parsedValue)
                  }
                })}
                data-testid="client-form-company-sallary-input"
              />
            </>
          ) : (
            <p className="flex gap-2 text-lg" data-testid="client-form-delete-message">
              <span>Você está prestes a excluir o cliente:</span>
              <span className="font-bold">{name}</span>
            </p>
          )}
          <Button
            type={type === 'delete' ? 'button' : 'submit'}
            className="w-full h-10 bg-theme-primary text-white font-bold hover:bg-orange-800/90 transition-all duration-300"
            loading={loading}
            onClick={() => {
              if (type === 'delete') {
                onSubmit(watch('name'))
              }
            }}
            data-testid="client-form-button"
          >
            {buttonText}
          </Button>
        </form>
      </section>
    </Overlay>
  )
}
