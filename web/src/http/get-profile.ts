import { api } from './api-client'

interface GetProfileResponse {
  user: {
    id: string
    name: string | null
    email: string
    avatar_url: string | null
  }
}

export async function getProfile() {
  const result = await api.get('users/profile').json<any>()
  
  return result
}
