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
          ? 'text-base text-theme-primary underline stroke-theme-primary fill-theme-primary hover:text-orange-800/80 hover:fill-orange-800/80'
          : 'text-base hover:text-theme-primary/80 hover:fill-theme-primary/80'
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
    const menuSize = cn(
      isMobile ? 'w-screen items-center' : 'w-auto pl-10 pr-20 items-start',
      'fixed bottom-0 left-0 z-11 h-[87.5%] py-12 bg-white flex flex-col gap-10 justify-start'
    )

    return (
      <>
        <Overlay />
        <aside
          className={cn(menuSize, 'z-10')}
          ref={ref as React.RefObject<HTMLDivElement>}
          data-testid="side-menu"
        >
          <button className="absolute -right-4 -top-4 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black p-0.5">
            <BackArrowIcon
              className="fill-white"
              width={16}
              height={16}
              fill=""
              onClick={() => setIsMenuOpen(false)}
              data-testid="side-menu-close-button"
            />
          </button>
          <section className="flex flex-col gap-5">
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
                linkStyle(
                  location.pathname.includes('/clients') ||
                    location.search.includes('selected=true')
                )
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
  }, [location, ref, baseMobileMenuStyle, linkStyle, isMobile])

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
  }, [location.pathname, location.search, clearUser, linkStyle])

  return (
    <nav
      className="z-10 mb-5 flex h-[100px] w-full items-center justify-between bg-white py-6 shadow-sm"
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
          Olá, <strong>{user?.name}!</strong>
        </span>
      </section>
    </nav>
  )
}
