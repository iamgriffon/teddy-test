import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { useState } from 'react'
import { useUserStore } from 'store/user/store'

export default function Home() {
  const { setUser } = useUserStore()
  const [input, setInput] = useState('')

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setUser(input)
    window.location.href = '/users'
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col items-center justify-center gap-5 w-[512px]"
      data-testid="homepage-form"
    >
      <h1 className="text-4xl font-sans" data-testid="homepage-title">Olá, seja bem-vindo! </h1>
      <Input
        placeholder="Digite seu nome:"
        className="w-full h-[60px]"
        value={input}
        onChange={handleChange}
        id="user-input"
        data-testid="homepage-input"
      />
      <Button className="bg-theme-primary h-[60px]" type="submit" data-testid="homepage-button">
        Entrar
      </Button>
    </form>
  )
}
