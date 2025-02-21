import { create } from 'zustand'
import { ClientStore } from './types'

export const useClientStore = create<ClientStore>((set) => ({
  list: {
    data: [],
    total: 0,
    total_pages: 0
  },
  updateList: (list) => set({ list }),
  clients: []
}))
