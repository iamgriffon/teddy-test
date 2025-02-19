import { ClientDTO } from 'dtos/clientDTO'

export type GetClientsResponse = {
  clients: ClientDTO[]
  total: number
  total_pages: number
  page: number
}

export type CreateClientRequest = {
  name: string
  sallary: number
  company_sallary: number
}

export type CreateClientResponse = {
  id: number
  name: string
  sallary: number
  company_sallary: number
}
