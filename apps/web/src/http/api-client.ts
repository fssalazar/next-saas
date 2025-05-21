// lib/apiFetch.ts
import { env } from '@saas/env'
import { getCookie } from 'cookies-next'

export async function api<T>(
  path: string,
  options: RequestInit = {},
  tag?: string,
): Promise<T> {
  let headers: HeadersInit = {
    ...(options.headers || {}),
  }

  // Only set Content-Type for non-DELETE requests
  if (options.method !== 'DELETE') {
    headers = {
      'Content-Type': 'application/json',
      ...headers,
    }
  }

  let token: string | undefined

  if (typeof window === 'undefined') {
    // Server-side
    const { cookies } = await import('next/headers')
    const cookieStore = cookies()
    token = (await cookieStore).get('token')?.value
  } else {
    // Client-side
    token = getCookie('token') as string
  }
  if (token) {
    // Use array syntax to set headers since HeadersInit doesn't allow direct property assignment
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    }
  }

  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers,
    ...(tag ? { next: { tags: [tag] } } : {}),
  })

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }

  // Return null for 204 No Content responses
  if (res.status === 204) {
    return null as T
  }

  return res.json()
}
