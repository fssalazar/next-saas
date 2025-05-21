import { api } from './api-client'

interface GetOrganizationRequest {
  org: string
}

interface GetOrganizationResponse {
  organization: {
    id: string
    name: string
    slug: string
    domain: string | null
    shouldAttachUsersByDomain: boolean
    avatarUrl: string | null
    createdAt: string
    updatedAt: string
    ownerId: string
  }
}

export async function getOrganization({
  org,
}: GetOrganizationRequest): Promise<GetOrganizationResponse> {
  const data = await api<GetOrganizationResponse>(`/organizations/${org}`, {
    next: {
      tags: ['organizations'],
    },
  })

  return data
}
