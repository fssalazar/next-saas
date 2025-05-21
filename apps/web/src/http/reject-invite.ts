import { api } from './api-client'

export async function rejectInvite(inviteId: string) {
  await api(`invites/${inviteId}/reject`, {
    method: 'POST',
  })
}
