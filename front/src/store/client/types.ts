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
}
