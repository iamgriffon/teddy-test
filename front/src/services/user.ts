import { api } from './'
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  BodylessResponse,
  GetUserResponse
} from './types'
import Cookies from 'js-cookie'
import { isBefore, parseISO } from 'date-fns'
const prefix = 'users'
export const login = async (body: LoginRequest): Promise<LoginResponse> => {
  const { data } = await api.post(`/${prefix}/login`, body)
  return data
}

export const logout = async () => {
  const { data } = await api.post(`/${prefix}/logout`)
  return data
}

export const register = async (
  body: RegisterRequest
): Promise<BodylessResponse> => {
  const { data } = await api.post(`/${prefix}/register`, body)
  return data
}

export const isAuthenticated = () => {
  const sessionToken = Cookies.get('session_token')
  const sessionTokenExpiry = Cookies.get('session_token_expiry')
  if (!sessionToken || !sessionTokenExpiry) {
    return false
  }
  if (isBefore(parseISO(sessionTokenExpiry), new Date())) {
    Cookies.remove('session_token')
    Cookies.remove('session_token_expiry')
    return false
  }
  return true
}
export const getUser = async (): Promise<GetUserResponse> => {
  const { data } = await api.get(`/users/me`)
  if (data.session_token) {
    refreshToken({
      token: data.session_token,
      tokenExpiry: data.session_token_expiry
    })
  }
  return data
}

const refreshToken = async ({
  token,
  tokenExpiry
}: {
  token: string
  tokenExpiry: string
}) => {
  Cookies.set('session_token', token)
  Cookies.set('session_token_expiry', parseISO(tokenExpiry).toISOString())
  return true
}
