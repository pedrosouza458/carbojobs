import { api } from "./api-client";

interface CreateAppointmentRequest {
  date: string;
  hour: string;
  name: string;
  phone: string;
  business_id: string;
  provider_id: string;
}

interface CreateAppointmentResponse {
  message: string;
}

export async function createAppointment({
  date,
  hour,
  name,
  phone,
  business_id,
  provider_id,
}: CreateAppointmentRequest) {
  const result = await api
    .post("appointments", {
      json: {
        date,
        hour,
        name,
        phone,
        business_id,
        provider_id
      },
    })
    .json<CreateAppointmentResponse>();
  return result;
}
