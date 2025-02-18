import { create } from 'zustand'
import { ClientStore } from './types'
import { ClientDTO } from 'dtos'

export const useClientStore = create<ClientStore>((set) => ({
  list: {
    data: [],
    total: 0,
    total_pages: 0
  },

  updateList: (list) => set({ list }),

  clients: [],
  selectedClients: JSON.parse(
    localStorage.getItem('selectedClients') || '[]'
  ) as ClientDTO[],
  setClients: (clients) => set({ clients }),

  deleteSelectedClients: (clients: string[]) => {
    const parsedClients = JSON.parse(
      localStorage.getItem('selectedClients') || '[]'
    ) as ClientDTO[]
    const storedClients = parsedClients.filter(
      (c) => !clients.includes(c.id.toString())
    )
    return localStorage.setItem(
      'selectedClients',
      JSON.stringify(storedClients)
    )
  },

  deleteSelectedClient: (client: string) => {
    const parsedClients = JSON.parse(
      localStorage.getItem('selectedClients') || '[]'
    ) as ClientDTO[]
    const storedClients = parsedClients.filter(
      (c) => c.id !== parseInt(client)
    )
    return localStorage.setItem(
      'selectedClients',
      JSON.stringify(storedClients)
    )
  },

  selectClient: (client) =>
    set((state) => {
      if (state.selectedClients.includes(client)) {
        return {
          selectedClients: state.selectedClients.filter((c) => c !== client)
        }
      }
      localStorage.setItem(
        'selectedClients',
        JSON.stringify([...state.selectedClients, client])
      )
      return {
        selectedClients: [...state.selectedClients, client]
      }
    }),

  editClient: (updatedClient) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === updatedClient.id
          ? { ...client, ...updatedClient }
          : client
      )
    }))
}))
