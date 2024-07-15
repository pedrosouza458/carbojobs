import { api } from './api-client'

export async function getAppointmentsByDay() {
  const result = await api.get(`charts/appointments/days`).json<any>()
  
  return result
}
