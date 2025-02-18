import Layout from 'components/common/layout'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from 'store/user/store'

export default function Home() {
  const { setUser } = useUserStore()
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setUser(input)
    navigate('/clients')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  return (
    <Layout className="h-screen">
      <form
        onSubmit={handleLogin}
        className="flex h-full w-[512px] flex-col items-center justify-center gap-5"
        data-testid="homepage-form"
      >
        <h1 className="font-sans text-4xl" data-testid="homepage-title">
          Olá, seja bem-vindo!{' '}
        </h1>
        <Input
          placeholder="Digite seu nome:"
          className="h-[60px] w-full"
          value={input}
          onChange={handleChange}
          id="user-input"
          data-testid="homepage-input"
        />
        <Button
          className="h-[60px] bg-theme-primary hover:bg-orange-800/90"
          type="submit"
          data-testid="homepage-button"
        >
          Entrar
        </Button>
      </form>
    </Layout>
  )
}
