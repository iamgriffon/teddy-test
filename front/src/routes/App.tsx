import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from 'pages/home'
import Clients from 'pages/clients'
import Layout from '../components/common/layout'
import { NotFound } from 'pages/not-found'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  )
}

export default App
