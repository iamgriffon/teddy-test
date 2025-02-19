import { api } from './api'
import { ClientDTO } from 'dtos'
import { GetClientsResponse, CreateClientRequest } from './types'

export const getClient = async (id: number) => {
  const { data } = await api.get<ClientDTO>(`/clients/${id}`)
  return data
}

export const getClients = async (page: number, size: number) => {
  const { data } = await api.get<GetClientsResponse>(
    `/clients?page=${page}&size=${size}`
  )
  return data
}

export const createClient = async (params: CreateClientRequest) => {
  const { data } = await api.post('/clients', params)
  return data
}

export const deleteClient = async (id: number) => {
  const { data } = await api.delete(`/clients/${id}`)
  return data
}

export const updateClient = async (id: number, params: ClientDTO) => {
  const { data } = await api.put(`/clients/${id}`, params)
  return data
}
