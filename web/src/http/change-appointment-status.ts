import { api } from "./api-client";

export async function changeAppointmentStatus(appointmentId: any, status: any) {
  await api
    .put(`appointments/${appointmentId}/${status}`)
    .json<any>();
}
