import { api } from './api-client'

export async function getLinksByProvider(id: string) {
  const result = await api.get(`links/providers/${id}`).json<any>()
  
  return result
}
