import { api } from './api-client'

interface GetBillingRequest {
  slug: string
}

interface GetBillingResponse {
  billing: {
    seats: {
      amount: number
      unit: number
      price: number
    }
    projects: {
      amount: number
      unit: number
      price: number
    }
    total: number
  }
}

export async function getBilling({ slug }: GetBillingRequest) {
  const data = await api<GetBillingResponse>(`/organizations/${slug}/billing`)

  return data
}
