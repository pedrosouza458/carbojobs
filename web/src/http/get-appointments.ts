import { api } from './api-client'

export async function getAppointments(providerId: string) {
  const result = await api.get(`appointments`).json<any>()
  
  return result
}
