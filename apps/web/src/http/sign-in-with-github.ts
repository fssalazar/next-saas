import { api } from './api-client'

interface SignInWithGithubRequest {
  code: string
}

interface SignInWithGithubResponse {
  token: string
}

export async function signInWithGithub({ code }: SignInWithGithubRequest) {
  const { data } = await api.post<SignInWithGithubResponse>('sessions/github', {
    code,
  })

  return data
}
