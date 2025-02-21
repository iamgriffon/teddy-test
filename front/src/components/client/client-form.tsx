import { maskSalary } from 'utils/input-masks'
import { Button, Input, Overlay } from 'components/ui'
import { useMemo } from 'react'
import { CloseIcon } from 'components/icons'
import { cn } from 'utils'
import { useFormContext, SubmitHandler, FieldValues } from 'react-hook-form'

interface ClientFormProps<T> {
  onSubmit: (data: T) => void
  buttonText: string
  title: string
  onClose: () => void
  loading?: boolean
  type?: 'create' | 'update' | 'delete' | 'clear'
}

export function ClientForm<T>({
  onSubmit,
  buttonText,
  onClose,
  title,
  loading = false,
  type = 'create'
}: ClientFormProps<T>) {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()
  const formsWithInputs = useMemo(() => ['create', 'update'], [])
  const baseInputStyle = useMemo(() => 'w-[360px] h-10 text-base', [])
  const name = watch('name')
  const errorMessageStyle = useMemo(() => 'text-red-500 text-sm', [])
  return (
    <Overlay>
      <section className="flex size-full flex-col items-center justify-center">
        <form
          className="mb-5 flex h-[w-360px] flex-col justify-center gap-4 rounded-md bg-white p-5"
          onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
          data-testid="client-form"
        >
          <p className="relative flex w-full items-center justify-between">
            <span className="text-lg font-bold" data-testid="client-form-title">
              {title}
            </span>
            <CloseIcon
              width={12}
              height={12}
              className="absolute right-1 top-1.5 cursor-pointer"
              onClick={onClose}
              data-testid="close-modal-button"
            />
          </p>
          {formsWithInputs.includes(type) ? (
            <>
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Digite o nome:"
                  {...register('name')}
                  className={baseInputStyle}
                  data-testid="client-form-name-input"
                />
                {errors?.name && (
                  <p
                    className={errorMessageStyle}
                    data-testid="client-form-name-error"
                  >
                    *{errors.name.message as string}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
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
                {errors?.sallary && (
                  <p
                    className={errorMessageStyle}
                    data-testid="client-form-sallary-error"
                  >
                    *{errors.sallary.message as string}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
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
                {errors?.company_sallary && (
                  <p
                    className={errorMessageStyle}
                    data-testid="client-form-company-sallary-error"
                  >
                    *{errors.company_sallary.message as string}
                  </p>
                )}
              </div>
            </>
          ) : (
            <p
              className="flex gap-2 text-lg"
              data-testid="client-form-delete-message"
            >
              {type === 'clear' ? (
                <span>
                  Você está prestes a limpar todos os clientes selecionados
                </span>
              ) : (
                <>
                  <span>Você está prestes a excluir o cliente:</span>
                  <span className="font-bold">{name}</span>
                </>
              )}
            </p>
          )}
          <Button
            type={type === 'delete' ? 'button' : 'submit'}
            className="h-10 w-full bg-theme-primary font-bold text-white transition-all duration-300 hover:bg-orange-800/90"
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
