import { create } from "zustand";
import { UserStore } from "./types";

export const useUserStore = create<UserStore>((set) => ({
  user: localStorage.getItem('user') || '',
  setUser: (user: string) => {
    localStorage.setItem('user', user)
    set({ user })
  },
  clearUser: () => {
    localStorage.removeItem('user')
    set({ user: '' })
  },
}))
