import { api } from './api-client'

export async function getAppointmentsByService() {
  const result = await api.get(`charts/appointments/services`).json<any>()
  
  return result
}
