import { ClientDTO } from 'dtos'

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

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  status: number
  name: string
  token: string
}

export type RegisterRequest = {
  email: string
  name: string
  password: string
}

export type RegisterResponse = {
  id: number
  name: string
  email: string 
  created_at: string
  updated_at: string
}

export type BodylessResponse = {
  status: number
  message: string
} 
