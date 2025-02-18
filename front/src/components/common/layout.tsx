import { Navbar } from './navbar'
import { cn } from 'utils'
import { useLocation } from 'react-router-dom'
import { useUserStore } from 'store/user'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
interface LayoutProps {
  children?: React.ReactNode
  className?: string
}

export default function Layout({ children, className }: LayoutProps) {
  const location = useLocation()
  const { user } = useUserStore()
  const navigate = useNavigate()

  const isHome = location.pathname === '/'
  const shouldHideNavbar = useMemo(() => {
    return !location.pathname.includes('clients')
  }, [location.pathname])

  useEffect(() => {
    if (user && isHome) {
      navigate('/clients')
    }
  }, [])

  return (
    <main
      className={cn(
        'flex flex-col items-center min-h-[100vh] w-full',
        shouldHideNavbar ? 'bg-white' : 'bg-background-primary'
      )}
    >
      <section className={cn('flex flex-col items-center h-full w-full')}>
        {!shouldHideNavbar && <Navbar />}
        <div
          className={cn(
            !className && 'justify-center',
            'flex flex-col items-center min-h-full px-4',
            className
          )}
        >
          {children}
        </div>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </section>
    </main>
  )
}
