import { api } from './api-client'

interface SignInWithPasswordRequest {
  email: string
  password: string
}

interface SignInWithPasswordResponse {
  token: string
}

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest) {
  const data = await api<SignInWithPasswordResponse>('/sessions/password', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  })

  return data
}
