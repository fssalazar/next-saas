import { api } from './api-client'

interface CreateOrganizationRequest {
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

type CreateOrganizationResponse = void

export async function createOrganization({
  name,
  domain,
  shouldAttachUsersByDomain,
}: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
  await api('/organizations', {
    method: 'POST',
    body: JSON.stringify({
      name,
      domain,
      shouldAttachUsersByDomain,
    }),
  })
}
