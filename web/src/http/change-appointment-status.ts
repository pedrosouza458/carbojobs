import { api } from "./api-client";

export async function changeAppointmentStatus(appointmentId: any, status: any) {
  await api
    .get(`appointments/${appointmentId}/${status}`)
    .json<any>();
}
