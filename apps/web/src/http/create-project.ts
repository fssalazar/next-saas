import { api } from './api-client'

interface CreateProjectRequest {
  org: string
  name: string
  description: string
}

type CreateProjectResponse = void

export async function createProject({
  org,
  name,
  description,
}: CreateProjectRequest): Promise<CreateProjectResponse> {
  await api(`/organizations/${org}/projects`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      description,
    }),
  })
}
