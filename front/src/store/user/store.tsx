import { create } from 'zustand'
import { UserStore } from './types'
import { UserDTO } from 'dtos/userDTO'
import Cookies from 'js-cookie'

export const useUserStore = create<UserStore>((set) => ({
  user: {
    id: 0,
    name: '',
  },
  setUser: (user: UserDTO) => {
    set({ user })
  },
  clearUser: () => {
    set({ user: undefined })
    Cookies.remove('session_token')
    Cookies.remove('session_token_expiry')
  }
}))
