import { api } from './api-client'

interface CreateAccountRequest {
  name: string
  email: string
  password: string
}

export async function createAccount({
  name,
  email,
  password,
}: CreateAccountRequest) {
  await api('/users', {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })
}
