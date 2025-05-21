import { Role } from '@saas/auth'

import { api } from './api-client'

interface UpdateMemberRequest {
  org: string
  memberId: string
  role: Role
}

type UpdateMemberResponse = void

export async function updateMember({
  org,
  memberId,
  role,
}: UpdateMemberRequest): Promise<UpdateMemberResponse> {
  await api(`/organizations/${org}/members/${memberId}`, {
    method: 'PUT',
    body: JSON.stringify({
      role,
    }),
  })
}
