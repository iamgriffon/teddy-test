import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllIds, getUser, isAuthenticated } from 'services'
import { useQuery } from '@tanstack/react-query'
import { useLocalStorage } from '@uidotdev/usehooks'
import { ClientDTO } from 'dtos'
import { useUserStore } from 'store'
import { paths } from 'consts'

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const { user, setUser } = useUserStore()
  const isUserAuthenticated = isAuthenticated()
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setClients] = useLocalStorage<ClientDTO[]>('clients', [])
  const whiteListedRoutes = useMemo(() => [paths.home, paths.login], [])

  const isLoggedIn = useMemo(() => {
    return isUserAuthenticated && user
  }, [isUserAuthenticated, user])

  const { data: ids } = useQuery({
    queryKey: ['allIds'],
    queryFn: () => getAllIds(),
    enabled: !!isLoggedIn
  })

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    enabled: isAuthenticated(),
    refetchInterval: 1000 * 60 * 5
  })

  useEffect(() => {
    if (userData) {
      setUser(userData)
    }
  }, [userData, setUser])

  useEffect(() => {
    if (!isLoggedIn && !whiteListedRoutes.includes(window.location.pathname)) {
      navigate('/')
    }
  }, [isLoggedIn, navigate, whiteListedRoutes])

  useEffect(() => {
    if (ids) {
      setClients((prev) => prev.filter((client) => ids.includes(client.id)))
    }
  }, [ids, setClients])

  return <>{children}</>
}
