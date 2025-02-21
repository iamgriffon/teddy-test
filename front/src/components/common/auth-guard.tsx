import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllIds, isAuthenticated } from 'services'
import { useQuery } from '@tanstack/react-query'
import { useLocalStorage } from '@uidotdev/usehooks'
import { ClientDTO } from 'dtos'

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const isUserAuthenticated = isAuthenticated()
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setClients] = useLocalStorage<ClientDTO[]>('clients', [])

  useEffect(() => {
    if (!isUserAuthenticated) {
      navigate('/')
    }
  }, [isUserAuthenticated, navigate])

  const { data: ids } = useQuery({
    queryKey: ['allIds'],
    queryFn: () => getAllIds(),
    enabled: isUserAuthenticated
  })

  console.log(ids)

  useEffect(() => {
    if (ids) {
      setClients((prev) => prev.filter((client) => ids.includes(client.id)))
    }
  }, [ids, setClients])

  return isUserAuthenticated ? <>{children}</> : null
}
