import { Role } from '@saas/auth'

import { api } from './api-client'

interface GetMembersRequest {
  slug: string
}

interface GetMembersResponse {
  members: {
    id: string
    userId: string
    role: Role
    name: string | null
    email: string
    avatarUrl: string | null
  }[]
}

export async function getMembers({ slug }: GetMembersRequest) {
  const data = await api<GetMembersResponse>(
    `/organizations/${slug}/members`,
    undefined,
    `${slug}/members`,
  )

  return data
}
