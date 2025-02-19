import { FormProvider, useForm } from 'react-hook-form'
import { Button, Input, Link } from 'components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { type LoginPageProps, LoginPageSchema } from 'schemas'
import { links } from 'routes/links'
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
    setUser({ name: data.name })
    Cookies.set('token', data.token)
    navigate('/clients')
  }

  const { mutate: authenticate } = useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (data) => {
      if (data.status === 200) {
        toast.success('Login realizado com sucesso!')
        handleSetUser(data)
        navigate('/clients')
      }
    }
  })

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = loginForm

  const handleLogin = (data: LoginPageProps) => {
    handleSetUser({
      name: 'Gustavo',
      token: '1234567890',
      status: 200
    })
    // authenticate(data)
  }

  return (
    <FormProvider {...loginForm}>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex h-full w-[512px] flex-col items-center justify-center gap-5"
        data-testid="homepage-form"
      >
        <h1 className="font-sans text-4xl" data-testid="homepage-title">
          Bem-vindo(a) de volta!
        </h1>
        <section className="flex w-full flex-col items-start gap-2">
          <Input
            placeholder="Digite seu email:"
            className="h-[60px] w-full"
            {...register('email')}
            id="user-input"
            data-testid="homepage-input"
          />
          {errors.email && (
            <p
              className="text-right text-sm text-red-500"
              data-testid="homepage-error"
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
          />
          {errors.password && (
            <p
              className="text-left text-sm text-red-500"
              data-testid="homepage-error"
            >
              * {errors.password.message}
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
        <Link to={home} active>
          Não possui uma conta? Clique aqui
        </Link>
      </form>
    </FormProvider>
  )
}
