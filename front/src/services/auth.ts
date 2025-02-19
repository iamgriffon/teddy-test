import { api } from './api'
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  BodylessResponse
} from './types'

export const login = async (body: LoginRequest): Promise<LoginResponse> => {
  const { data } = await api.post('/login', body)
  return data
}

export const logout = async () => {
  const { data } = await api.post('/logout')
  return data
}

export const register = async (
  body: RegisterRequest
): Promise<BodylessResponse> => {
  const { data } = await api.post('/register', body)
  return data
}

export const getUser = async () => {
  const response = await api.get('/me')
  return response.data
}
