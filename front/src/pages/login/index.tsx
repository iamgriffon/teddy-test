import { FormProvider, useForm } from 'react-hook-form'
import { Button, Input, Link } from 'components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { type LoginPageProps, LoginPageSchema } from 'schemas'
import { links, text } from 'consts'
import { useMutation } from '@tanstack/react-query'
import { login, type LoginRequest, type LoginResponse } from 'services'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from 'store'
import Cookies from 'js-cookie'

export function Login() {
  const { home } = links
  const navigate = useNavigate()
  const { setUser } = useUserStore()
  const loginForm = useForm<LoginPageProps>({
    resolver: zodResolver(LoginPageSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleSetUser = (data: LoginResponse) => {
    setUser({
      id: data.id,
      name: data.name
    })
    Cookies.set('session_token', data.session_token)
    Cookies.set('session_token_expiry', String(data.session_token_expiry))
    navigate('/clients')
  }

  const { mutate: authenticate, isPending: isAuthenticating } = useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (data) => {
      toast.success(text.LOGIN_SUCCESS)
      handleSetUser(data)
      navigate('/clients')
    },
    onError: () => {
      toast.error(text.LOGIN_ERROR)
    }
  })

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = loginForm

  const handleLogin = async (data: LoginPageProps) => {
    authenticate(data)
  }

  return (
    <section className="flex h-screen w-full items-center justify-center">
      <FormProvider {...loginForm}>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex h-full w-[512px] flex-col items-center justify-center gap-5"
          data-testid="login-form"
        >
          <h1 className="font-sans text-4xl" data-testid="login-title">
            Bem-vindo(a) de volta!
          </h1>
          <section className="flex w-full flex-col items-start gap-2">
            <Input
              placeholder="Digite seu email:"
              className="h-[60px] w-full"
              {...register('email')}
              id="user-input"
              data-testid="login-email-input"
            />
            {errors.email && (
              <p
                className="text-right text-sm text-red-500"
                data-testid="login-email-error"
              >
                * {errors.email.message}
              </p>
            )}
          </section>
          <section className="flex w-full flex-col items-start gap-2">
            <Input
              placeholder="Digite sua senha:"
              className="h-[60px] w-full"
              type="password"
              {...register('password')}
              data-testid="login-password-input"
            />
            {errors.password && (
              <p
                className="text-left text-sm text-red-500"
                data-testid="login-password-error"
              >
                * {errors.password.message}
              </p>
            )}
          </section>
          <Button
            className="h-[60px] bg-theme-primary hover:bg-orange-800/90"
            type="submit"
            data-testid="login-form-button"
            loading={isAuthenticating}
          >
            Continuar
          </Button>
          <Link to={home} active>
            Não possui uma conta? Clique aqui
          </Link>
        </form>
      </FormProvider>
    </section>
  )
}
