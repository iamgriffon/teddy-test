import { Link } from 'react-router-dom'
import Layout from '../components/common/layout'
import { useUserStore } from 'store/user/store'

export function NotFound() {
  const { clearUser } = useUserStore()
  return (
    <Layout className="h-screen">
      <div className="relative flex flex-col items-center justify-center w-full h-full" data-testid="not-found-page">
        <h1 className="text-4xl font-bold text-theme-primary mb-4">
          404 - Página não encontrada
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A página que você está procurando não foi encontrada.
        </p>
        <section className="flex flex-col gap-4">
          <Link
            to="/"
            onClick={() => clearUser()}
            className="w-72 flex justify-center items-center bg-theme-primary text-white font-semibold px-4 py-2 rounded hover:bg-theme-primary-dark"
          >
            Voltar para a página inicial
          </Link>
          <Link
            to="/clients"
            className="w-72 flex justify-center items-center bg-white text-theme-primary font-semibold px-4 py-2 rounded hover:bg-theme-primary-dark border-2 border-theme-primary"
          >
            Voltar para a página de clientes
          </Link>
        </section>
      </div>
    </Layout>
  )
}
