import { api } from "./api-client";

export async function deleteAppointment(appointmentId: any) {
  const response = await api
    .delete(`appointments/${appointmentId}`)
    .json<any>();

    return response
}
