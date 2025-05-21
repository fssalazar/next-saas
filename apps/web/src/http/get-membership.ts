import { Role } from '@saas/auth'

import { api } from './api-client'

interface GetMembershipRequest {
  slug: string
}

interface GetMembershipResponse {
  membership: {
    id: string
    role: Role
    organizationId: string
    userId: string
  }
}

export async function getMembership({ slug }: GetMembershipRequest) {
  const data = await api<GetMembershipResponse>(
    `/organizations/${slug}/membership`,
  )

  return data
}
