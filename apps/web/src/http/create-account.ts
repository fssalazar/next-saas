import { api } from './api-client'

interface CreateAccountRequest {
  name: string
  email: string
  password: string
}

type CreateAccountResponse = void

export async function CreateAccount({
  name,
  email,
  password,
}: CreateAccountRequest) {
  await api.post<CreateAccountResponse>('/users', {
    name,
    email,
    password,
  })
}
