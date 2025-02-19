import { FormProvider } from 'react-hook-form'
import { FirstStepFormProps } from './types'
import { Link, Button, Input } from 'components/ui'
import { links } from 'routes/links'

export function FirstStepForm({
  handleNextStep,
  firstStepForm
}: FirstStepFormProps) {
  const { login } = links
  return (
    <FormProvider {...firstStepForm}>
      <form
        onSubmit={firstStepForm.handleSubmit(handleNextStep)}
        className="flex h-full w-[512px] flex-col items-center justify-center gap-5"
        data-testid="homepage-form"
      >
        <h1 className="font-sans text-4xl" data-testid="homepage-title">
          Olá, seja bem-vindo(a)!{' '}
        </h1>
        <section className="flex w-full flex-col items-start gap-2">
          <Input
            placeholder="Digite seu nome:"
            className="h-[60px] w-full"
            {...firstStepForm.register('name')}
            id="user-input"
            data-testid="homepage-input"
          />
          {firstStepForm.formState.errors.name && (
            <p
              className="text-right text-sm text-red-500"
              data-testid="homepage-error"
            >
              * {firstStepForm.formState.errors.name.message}
            </p>
          )}
        </section>
        <Button
          className="h-[60px] bg-theme-primary hover:bg-orange-800/90"
          type="submit"
          data-testid="homepage-button"
        >
          Continuar
        </Button>
        <Link to={login} active>
          Já possui uma conta? Faça login
        </Link>
      </form>
    </FormProvider>
  )
}
