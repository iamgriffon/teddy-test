import { create } from 'zustand'
import { UserStore } from './types'
import { UserDTO } from 'dtos/userDTO'
export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user: UserDTO) => {
    set({ user })
  },
  clearUser: () => {
    set({ user: undefined })
  }
}))
