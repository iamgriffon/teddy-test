import { zodResolver } from '@hookform/resolvers/zod'
import Layout from 'components/common/layout'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { useState } from 'react'
import { HomePageSchema } from 'schemas/home-page-schema'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { HomePageSchemaType } from 'schemas/home-page-schema'
import { useUserStore } from 'store/user/store'

export default function Home() {
  const { setUser } = useUserStore()
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const handleLogin = (data: HomePageSchemaType) => {
    setUser(data.name)
    navigate('/clients')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const form = useForm<HomePageSchemaType>({
    resolver: zodResolver(HomePageSchema)
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = form

  return (
    <Layout className="h-screen">
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex h-full w-[512px] flex-col items-center justify-center gap-5"
          data-testid="homepage-form"
        >
          <h1 className="font-sans text-4xl" data-testid="homepage-title">
            Olá, seja bem-vindo!{' '}
          </h1>
          <section className="flex flex-col gap-2 w-full items-start">
            <Input
              placeholder="Digite seu nome:"
              className="h-[60px] w-full"
              {...register('name')}
              id="user-input"
              data-testid="homepage-input"
            />
            {errors.name && (
              <p
                className="text-red-500 text-right text-sm"
                data-testid="homepage-error"
              >
                * {errors.name.message}
              </p>
            )}
          </section>
          <Button
            className="h-[60px] bg-theme-primary hover:bg-orange-800/90"
            type="submit"
            data-testid="homepage-button"
          >
            Entrar
          </Button>
        </form>
      </FormProvider>
    </Layout>
  )
}
