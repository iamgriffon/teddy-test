export type Client = {
  id: number
  name: string
  sallary: number
  company_sallary: number
}

export type ClientStore = {
  list: {
    data: Client[]
    total: number
    total_pages: number
  }

  updateList: (list: {
    data: Client[]
    total: number
    total_pages: number
  }) => void

  clients: Client[]
  selectedClients: Client[]
  setClients: (clients: Client[]) => void
  selectClient: (client: Client) => void
  editClient: (client: Client) => void
  deleteSelectedClients: (clients: string[]) => void
  deleteSelectedClient: (client: string) => void
}
