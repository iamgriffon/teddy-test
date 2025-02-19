import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Home, Clients, Login, NotFound } from 'pages'
import { Layout } from 'components/common'
import { cn } from 'utils'
import { links } from './links'

export default function Router() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout className={cn('h-screen')}>
          <Routes>
            <Route path={links.home} element={<Home />} />
            <Route path={links.clients} element={<Clients />} />
            <Route path={links.login} element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
