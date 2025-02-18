import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from 'pages/Home'
import Users from 'pages/Users'
import Layout from '../components/layout'
import SelectedUsers from 'pages/SelectedUsers'
import { NotFound } from '../pages/not-found'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/selected-users" element={<SelectedUsers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
    </QueryClientProvider>
  )
}

export default App
