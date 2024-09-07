import { api } from "./api-client";

interface updatePasswordRequest {
  phone: string;
  code: string;
  password: string;
  email: string;
}

export async function updatePassword({
  phone,
  code,
  password,
  email,
}: updatePasswordRequest) {
  const result = await api
    .put(`forgot-password`, {
      json: {
        phone,
        code,
        password,
        email,
      },
    })
    .json<any>();

  return result;
}
