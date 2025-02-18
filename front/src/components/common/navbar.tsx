import logo from '../../assets/logo.svg'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { breakpoints, cn } from 'utils'
import { Link, useLocation } from 'react-router-dom'
import { useClickAway, useMediaQuery } from '@uidotdev/usehooks'
import { HomeIcon } from '../icons/home-icon'
import { MobileMenuIcon } from '../icons/mobile-menu.icon'
import { UserIcon } from '../icons/user-icon'
import { useUserStore } from 'store/user/store'
import { BackArrowIcon } from '../icons/back-arrow-icon'
import { MenuIcon } from '../icons/menu-icon'
import { Overlay } from '../ui/overlay'

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
    [location.pathname, location.search]
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
          isMobile ? 'w-screen items-center' : 'w-auto pl-10 pr-20 items-start',
          'fixed bottom-0 left-0 z-11 h-[87.5%] py-12 bg-white flex flex-col gap-10 justify-start'
        ),
      [isMobile]
    )
    return (
      <>
        <Overlay />
        <aside
          className={cn(menuSize, 'z-10')}
          ref={ref as React.RefObject<HTMLDivElement>}
          data-testid="side-menu"
        >
          <button className="cursor-pointer flex items-center justify-center absolute -top-4 -right-4 w-10 h-10 p-0.5 rounded-full bg-black">
            <BackArrowIcon
              className="fill-white"
              width={16}
              height={16}
              fill=""
              onClick={() => setIsMenuOpen(false)}
              data-testid="side-menu-close-button"
            />
          </button>
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
              to="/clients"
              className={cn(
                baseMobileMenuStyle,
                linkStyle(location.pathname === '/clients' && !location.search)
              )}
            >
              <UserIcon
                className={cn(
                  linkStyle(
                    location.pathname === '/clients' && !location.search
                  )
                )}
                width={24}
                height={24}
                fill={location.pathname === '/clients' ? '#EE7D46' : '#141414'}
              />
              Clientes
            </Link>
            <Link
              to="/products"
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
              Produtos
            </Link>
          </section>
        </aside>
      </>
    )
  }, [isMobile, isMenuOpen, location])

  const DesktopMenu = useCallback(() => {
    return (
      <section className="flex items-center gap-10 pr-[50px]">
        <nav className="max-md:hidden">
          <ul className="flex items-center gap-10">
            <li>
              <Link
                to="/clients"
                className={linkStyle(
                  location.pathname === '/clients' && location.search === ''
                )}
                data-testid="link-to-clients"
              >
                Clientes
              </Link>
            </li>
            <li>
              <Link
                to="/clients?selected=true"
                className={linkStyle(
                  location.pathname === '/clients' &&
                    location.search === '?selected=true'
                )}
                data-testid="link-to-selected-clients"
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
                data-testid="link-to-logout"
              >
                Sair
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    )
  }, [location.pathname, location.search, isMobile, clearUser])

  return (
    <nav
      className="z-10 flex justify-between items-center w-full h-[100px] py-6 mb-5 shadow-sm bg-white"
      data-testid="navbar"
    >
      <section className="flex items-center gap-10 pl-[50px]">
        <MenuIcon
          width={24}
          height={24}
          fill="none"
          onClick={toggleSideMenu}
          className="cursor-pointer"
          data-testid="side-menu-icon"
        />
        <img src={logo} alt="Logo" />
      </section>
      <DesktopMenu />
      {isMenuOpen && <Sidemenu />}
      <section className="flex items-center gap-10 pr-[50px]">
        <span>
          Olá, <strong>{user}!</strong>
        </span>
      </section>
    </nav>
  )
}
