import { create } from 'zustand'
import { ClientStore } from './types'
import { ClientDTO } from 'dtos/clientDTO'

export const useClientStore = create<ClientStore>((set) => ({
  clients: [],
  selectedClients: JSON.parse(
    localStorage.getItem('selectedClients') || '[]'
  ) as ClientDTO[],
  setClients: (clients) => set({ clients }),

  setSelectedClients: (selectedClients: ClientDTO[]) =>
    localStorage.setItem('selectedClients', JSON.stringify(selectedClients)),

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
