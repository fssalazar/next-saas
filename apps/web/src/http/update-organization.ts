import { api } from './api-client'

interface UpdateOrganizationRequest {
  org: string
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

type UpdateOrganizationResponse = void

export async function updateOrganization({
  org,
  name,
  domain,
  shouldAttachUsersByDomain,
}: UpdateOrganizationRequest): Promise<UpdateOrganizationResponse> {
  await api(`/organizations/${org}`, {
    method: 'PUT',
    body: JSON.stringify({
      name,
      domain,
      shouldAttachUsersByDomain,
    }),
  })
}
