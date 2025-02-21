import axios, { InternalAxiosRequestConfig } from 'axios'
import cookies from 'js-cookie'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
})

api.interceptors.request.use(async (config) => {
  const token = cookies.get('session_token')
  const adjustedConfig: InternalAxiosRequestConfig = { ...config }

  if (token) {
    adjustedConfig.headers.Authorization = `Bearer ${token}`
  }

  return adjustedConfig
})
