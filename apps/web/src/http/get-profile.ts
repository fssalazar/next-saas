import { api } from './api-client'

interface GetProfileResponse {
  user: {
    id: string
    name: string
    email: string
    avatarUrl: string
  }
}

export async function getProfile() {
  const { data } = await api.get<GetProfileResponse>('profile')

  return data
}
