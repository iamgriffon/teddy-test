import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Home, Clients, Login, NotFound, About } from 'pages'
import { Layout } from 'components/common'
import { links } from '../consts'
import { RouteGuard } from 'components/common/auth-guard'
export default function Router() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path={links.home} element={<Home />} />
            <Route path={links.login} element={<Login />} />
            <Route path={links.about} element={<About />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path={links.clients}
              element={
                <RouteGuard>
                  <Clients />
                </RouteGuard>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
