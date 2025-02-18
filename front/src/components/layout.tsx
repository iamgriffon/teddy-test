import { useMediaQuery } from '@uidotdev/usehooks'
import { Navbar } from './navbar'
import { breakpoints, cn } from 'utils'
import { useLocation } from 'react-router-dom'

interface LayoutProps {
  children?: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()  
  return (
    <main className="flex flex-col items-center h-screen w-full">
      <section className={cn('flex flex-col items-center h-full w-full')}>
        {location.pathname !== '/' && <Navbar /> }
        <div className="flex flex-col items-center min-h-full justify-center px-4">
          {children}
        </div>
      </section>
    </main>
  )
}
