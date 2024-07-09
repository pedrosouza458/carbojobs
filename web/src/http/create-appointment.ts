import { api } from "./api-client";

interface CreateAppointmentRequest {
  date: string;
  hour: string;
  name: string;
  phone: string;
  description: string;
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
  description,
  business_id,
  provider_id,
}: CreateAppointmentRequest) {
  const result = await api
    .post(`appointments/${business_id}`, {
      json: {
        date,
        hour,
        name,
        phone,
        description,
        business_id,
        provider_id
      },
    })
    .json<CreateAppointmentResponse>();
  return result;
}
