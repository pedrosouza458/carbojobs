import { api } from "./api-client";

export async function deleteBusiness(appointmentId: any) {
  const response = await api.delete(`business/${appointmentId}`).json<any>();

  return response;
}
