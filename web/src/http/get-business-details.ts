import { api } from './api-client'

export async function getBusinessDetails(id: string) {
  const result = await api.get(`business/${id}`).json<any>()
  
  return result
}
