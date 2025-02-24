import logo from '../../assets/logo.svg'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { breakpoints, cn } from 'utils'
import { useLocation } from 'react-router-dom'
import { useClickAway, useMediaQuery } from '@uidotdev/usehooks'
import {
  HomeIcon,
  UserIcon,
  MobileMenuIcon,
  BackArrowIcon,
  MenuIcon
} from 'components/icons'
import { useUserStore } from 'store/user/store'
import { Overlay, Link } from 'components/ui'
import { links } from 'consts'
import Cookies from 'js-cookie'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useUserStore()
  const location = useLocation()
  const isMobile = useMediaQuery(breakpoints.mobile)
  const { home, clients, selectedClients, about } = links

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

  const currentUrl = useMemo(() => {
    return window.location
  }, [])

  const Sidemenu = useCallback(() => {
    const menuSize = cn(
      isMobile ? 'w-screen items-center' : 'w-auto pl-10 pr-20 items-start',
      'fixed bottom-0 left-0 z-11 h-[87.5%] py-12 bg-white flex flex-col gap-10 justify-start'
    )

    return (
      <>
        <Overlay />
        <aside
          className={cn(menuSize, 'z-30')}
          ref={ref as React.RefObject<HTMLDivElement>}
          data-testid="side-menu"
        >
          <button className="absolute -right-0 -top-4 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black p-0.5">
            <BackArrowIcon
              className="fill-white"
              width={16}
              height={16}
              onClick={() => setIsMenuOpen(false)}
              data-testid="side-menu-close-button"
            />
          </button>
          <section className="flex flex-col gap-5">
            <Link
              to={home}
              active={location.pathname === home}
              className={cn(baseMobileMenuStyle)}
            >
              <HomeIcon
                className={cn(
                  location.pathname === home &&
                    'stroke-theme-primary stroke-0.5',
                  'w-6 h-6'
                )}
                stroke="none"
              />
              Home
            </Link>
            <Link
              to={clients}
              active={
                location.pathname.includes('/clients') ||
                location.search.includes('selected')
              }
              className={cn('group', baseMobileMenuStyle)}
            >
              <UserIcon
                className={cn(
                  location.pathname === clients &&
                    !location.search &&
                    'fill-theme-primary',
                  'w-6 h-6'
                )}
                width={24}
                height={24}
              />
              Clientes
            </Link>
            <Link
              to={selectedClients}
              active={location.pathname === selectedClients}
              className={cn(baseMobileMenuStyle)}
            >
              <MobileMenuIcon
                width={24}
                height={24}
                fill={
                  location.pathname === selectedClients
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
  }, [
    location,
    ref,
    baseMobileMenuStyle,
    isMobile,
    clients,
    home,
    selectedClients
  ])

  const handleLogout = useCallback(() => {
    Cookies.remove('session_token')
    Cookies.remove('session_token_expiry')
  }, [])

  const DesktopMenu = useCallback(() => {
    return (
      <section className="flex items-center gap-10 pr-[50px]">
        <nav className="max-md:hidden">
          <ul className="flex items-center gap-10">
            <li>
              <Link
                to={clients}
                active={location.pathname === clients && location.search === ''}
                data-testid="link-to-clients"
              >
                Clientes
              </Link>
            </li>
            <li>
              <Link
                to={selectedClients}
                active={currentUrl.toString().includes('selected')}
                data-testid="link-to-selected-clients"
              >
                Clientes selecionados
              </Link>
            </li>
            <li>
              <Link
                to={about}
                active={location.pathname === about}
                data-testid="link-to-about"
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link
                onClick={handleLogout}
                to={home}
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
  }, [
    location.pathname,
    location.search,
    currentUrl,
    clients,
    about,
    home,
    selectedClients,
    handleLogout
  ])

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
        <img src={logo} alt="Logo" data-testid="logo" />
      </section>
      <DesktopMenu />
      {isMenuOpen && <Sidemenu />}
      <section className="flex items-center gap-10 pr-[50px]">
        <span data-testid="user-name">
          Olá, <strong>{user?.name}!</strong>
        </span>
      </section>
    </nav>
  )
}
