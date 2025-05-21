import { api } from './api-client'

interface SignInWithGithubRequest {
  code: string
}

interface SignInWithGithubResponse {
  token: string
}

export async function signInWithGithub({ code }: SignInWithGithubRequest) {
  const data = await api<SignInWithGithubResponse>('/sessions/github', {
    method: 'POST',
    body: JSON.stringify({
      code,
    }),
  })

  return data
}
