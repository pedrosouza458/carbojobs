import { api } from './api-client'

export async function getBusinessByProvider(id: string) {
  const result = await api.get(`business/providers/${id}`).json<any>()
  
  return result
}
