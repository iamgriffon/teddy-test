import menuLogo from '../assets/menu-icon.svg'
import logo from '../assets/logo.svg'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { breakpoints, cn } from 'utils'
import { Link, useLocation } from 'react-router-dom'
import { useClickAway, useMediaQuery } from '@uidotdev/usehooks'
import { HomeIcon } from './icons/home-icon'
import { MobileMenuIcon } from './icons/mobile-menu.icon'
import { UserIcon } from './icons/user-icon'
import { useUserStore } from 'store/user/store'
import { CloseIcon } from './icons/close-icon'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, clearUser } = useUserStore()
  const location = useLocation()
  const isMobile = useMediaQuery(breakpoints.mobile)
  const linkStyle = useCallback(
    (condition: boolean) =>
      cn(
        condition
          ? 'text-base text-theme-primary underline stroke-theme-primary fill-theme-primary'
          : 'text-base'
      ),
    []
  )

  const baseMobileMenuStyle = useMemo(
    () => cn('flex gap-4 items-center py-[14px] px-3 font-semibold'),
    []
  )

  const toggleSideMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen)
  }, [isMenuOpen])

  const ref = useClickAway(() => {
    setIsMenuOpen(false)
  })

  useEffect(() => {
    if (isMobile) {
      setIsMenuOpen(false)
    }
  }, [isMobile])

  const Sidemenu = useCallback(() => {
    const menuSize = useMemo(
      () =>
        cn(
          isMobile ? 'w-screen' : 'w-1/3',
          'fixed bottom-0 left-0 z-10 w-full h-[87.5%] py-12 bg-white flex flex-col gap-10 justify-start items-center',
          'transition-transform duration-300 ease-in-out',
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        ),
      [isMobile, isMenuOpen]
    )

    return (
      <div className="h-screen w-screen fixed top-0 left-0 z-10 bg-theme-black/90">
        <aside
          className={cn(menuSize)}
          ref={ref as React.RefObject<HTMLDivElement>}
        >
          <CloseIcon
            className="cursor-pointer absolute top-4 right-4"
            width={16}
            height={16}
            fill="white"
            onClick={() => setIsMenuOpen(false)}
          />
          <section className="flex flex-col gap-10">
            <Link
              to="/"
              className={cn(
                baseMobileMenuStyle,
                linkStyle(location.pathname === '/')
              )}
            >
              <HomeIcon
                className={cn(
                  location.pathname === '/' &&
                    'stroke-theme-primary stroke-0.5',
                  'w-6 h-6'
                )}
                stroke="none"
              />
              Home
            </Link>
            <Link
              to="/users"
              className={cn(
                baseMobileMenuStyle,
                linkStyle(location.pathname === '/users')
              )}
            >
              <UserIcon
                className={cn(linkStyle(location.pathname === '/users'))}
                width={24}
                height={24}
                fill={location.pathname === '/users' ? '#EE7D46' : '#141414'}
              />
              Usuários selecionados
            </Link>
            <Link
              to="/products"
              onClick={() => clearUser()}
              className={cn(
                baseMobileMenuStyle,
                linkStyle(location.pathname === '/products')
              )}
            >
              <MobileMenuIcon
                width={24}
                height={24}
                fill={
                  location.pathname === '/products'
                    ? 'text-theme-primary'
                    : 'stroke-theme-primary'
                }
              />
              Sair
            </Link>
          </section>
        </aside>
      </div>
    )
  }, [isMobile, isMenuOpen, location.pathname])

  const DesktopMenu = useCallback(() => {
    return (
      <section className="flex items-center gap-10 pr-[50px]">
        <nav>
          <ul className="flex items-center gap-10">
            <li>
              <Link
                to="/users"
                className={linkStyle(location.pathname === '/users')}
              >
                Clientes
              </Link>
            </li>
            <li>
              <Link
                to="/selected-users"
                className={linkStyle(location.pathname === '/selected-users')}
              >
                Clientes selecionados
              </Link>
            </li>
            <li>
              <Link
                onClick={() => clearUser()}
                to="/"
                className={cn(
                  'text-base hover:text-theme-primary hover:underline'
                )}
              >
                Sair
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    )
  }, [location.pathname])

  return (
    <nav className="fixed top-0 left-0 flex justify-between items-center w-full h-[100px] py-6 shadow-sm">
      <section className="flex items-center gap-10 pl-[50px]">
        <img
          src={menuLogo}
          alt="Logo"
          onClick={toggleSideMenu}
          className="cursor-pointer"
        />
        <img src={logo} alt="Logo" />
      </section>
      {!isMobile && <DesktopMenu />}
      {isMenuOpen && <Sidemenu />}
      <section className="flex items-center gap-10 pr-[50px]">
        <span>
          Olá, <strong>{user}!</strong>
        </span>
      </section>
    </nav>
  )
}
