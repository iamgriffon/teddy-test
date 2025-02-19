export type Client = {
  id: number
  name: string
  sallary: number
  company_sallary: number
}

export type ClientStore = {
  clients: Client[]
  selectedClients: Client[]
  setClients: (clients: Client[]) => void
  selectClient: (client: Client) => void
  editClient: (client: Client) => void
}
