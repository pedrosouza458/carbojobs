import { api } from "./api-client";

export async function DeleteAccount() {
  const result = await api.delete(`users/delete`).json();
  return result;
}
