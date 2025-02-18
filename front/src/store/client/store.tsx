import { create } from 'zustand'
import { ClientStore } from './types'

export const useClientStore = create<ClientStore>((set) => ({
  clients: [],
  selectedClients: [],

  setClients: (clients) => set({ clients }),

  selectClient: (client) =>
    set((state) => {
      if (state.selectedClients.includes(client)) {
        return {
          selectedClients: state.selectedClients.filter((c) => c !== client)
        }
      }
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
