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
  const { data } = await api.post<SignInWithPasswordResponse>(
    'sessions/password',
    {
      email,
      password,
    },
  )

  return data
}
