import { Navbar } from './navbar'
import { cn } from 'utils'
import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { Bounce, ToastContainer } from 'react-toastify'

interface LayoutProps {
  children?: React.ReactNode
  className?: string
}

export function Layout({ children, className }: LayoutProps) {
  const location = useLocation()
  const shouldHideNavbar = useMemo(() => {
    return (
      !location.pathname.includes('clients') &&
      !location.pathname.includes('about')
    )
  }, [location.pathname])

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
