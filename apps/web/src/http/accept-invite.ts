import { api } from './api-client'

export async function acceptInvite(inviteId: string) {
  await api(`/invites/${inviteId}/accept`, {
    method: 'POST',
  })
}
