import { FormProvider } from 'react-hook-form'
import { Button, Input } from 'components/ui'
import { SecondStepFormProps } from './types'

export function SecondStepForm({
  handleLogin,
  handleStepBack,
  secondStepForm
}: SecondStepFormProps) {
  return (
    <section className="flex size-full flex-col items-center justify-center gap-5">
      <FormProvider {...secondStepForm}>
        <form
          onSubmit={secondStepForm.handleSubmit(handleLogin)}
          className="flex w-[512px] flex-col items-start justify-center gap-5"
          data-testid="homepage-form"
        >
          <h1
            className="flex flex-col gap-2 font-sans text-4xl"
            data-testid="homepage-title"
          >
            <span>Para prosseguir,</span>
            <span>digite seu e-mail e senha</span>
          </h1>
          <section className="flex w-full flex-col items-start gap-2">
            <Input
              placeholder="Digite seu e-mail:"
              className="h-[60px] w-full"
              {...secondStepForm.register('email')}
              data-testid="homepage-email-input"
            />
            {secondStepForm.formState.errors.email && (
              <p
                className="text-right text-sm text-red-500"
                data-testid="homepage-error"
              >
                * {secondStepForm.formState.errors.email.message}
              </p>
            )}
          </section>
          <section className="flex w-full flex-col items-start gap-2">
            <Input
              placeholder="Digite sua senha:"
              className="h-[60px] w-full"
              type="password"
              {...secondStepForm.register('password')}
            />
            {secondStepForm.formState.errors.password && (
              <p
                className="text-left text-sm text-red-500"
                data-testid="homepage-error"
              >
                * {secondStepForm.formState.errors.password.message}
              </p>
            )}
          </section>
          <Button
            className="h-[60px] bg-theme-primary hover:bg-orange-800/90"
            type="submit"
            data-testid="homepage-second-step-button"
          >
            Entrar
          </Button>
        </form>
      </FormProvider>
      <Button
        variant="secondary"
        className="h-[60px] border-2 border-theme-primary text-theme-primary hover:border-orange-800/90 hover:bg-gray-200/90 hover:text-orange-800/90"
        type="button"
        data-testid="homepage-second-step-back-button"
        onClick={handleStepBack}
      >
        Voltar
      </Button>
    </section>
  )
}
