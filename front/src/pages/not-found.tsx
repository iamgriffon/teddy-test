import { Link } from 'react-router-dom'
import Layout from '../components/layout'
import { useEffect } from 'react'

export function NotFound() {
  useEffect(() => {
    window.location.href = '/'
  }, [])

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-theme-primary mb-4">404 - Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you are looking for could not be found.
        </p>
        <Link to="/" className="bg-theme-primary text-white font-semibold px-4 py-2 rounded hover:bg-theme-primary-dark">
          Go Home
        </Link>
      </div>
    </Layout>
  )
}
