import { Link } from 'react-router-dom'
import { Layout } from 'components/common'
import { useUserStore } from 'store/user/store'
import { links } from 'routes/links'
export function NotFound() {
  const { clearUser } = useUserStore()
  const { home, clients } = links
  return (
    <Layout className="h-screen">
      <div
        className="relative flex size-full flex-col items-center justify-center"
        data-testid="not-found-page"
      >
        <h1 className="mb-4 text-4xl font-bold text-theme-primary">
          404 - Página não encontrada
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          A página que você está procurando não foi encontrada.
        </p>
        <section className="flex flex-col gap-4">
          <Link
            to={home}
            onClick={() => clearUser()}
            //eslint-disable-next-line
            className="hover:bg-theme-primary-dark flex w-72 items-center justify-center rounded bg-theme-primary px-4 py-2 font-semibold text-white"
          >
            Voltar para a página inicial
          </Link>
          <Link
            to={clients}
            //eslint-disable-next-line
            className="hover:bg-theme-primary-dark flex w-72 items-center justify-center rounded border-2 border-theme-primary bg-white px-4 py-2 font-semibold text-theme-primary"
          >
            Voltar para a página de clientes
          </Link>
        </section>
      </div>
    </Layout>
  )
}
