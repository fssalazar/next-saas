import { env } from '@saas/env'
import axios from 'axios'
import { getCookie } from 'cookies-next'

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(async (config) => {
  let token: string | undefined

  if (typeof window === 'undefined') {
    // Server-side
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    token = cookieStore.get('token')?.value
  } else {
    // Client-side
    token = getCookie('token') as string
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
