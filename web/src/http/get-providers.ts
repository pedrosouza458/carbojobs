import { api } from "./api-client";

interface GetProvidersResponse {
  providers: {
    id: string;
    name: string | null;
    city: string;
    service: string;
    avatarUrl: string | null;
  }[];
}

export async function getProviders(
  page: number,
  city: string,
  service: string,
  providerName: string
) {
  const result = await api
    .get(
      `providers?page=${page}&city=${city}&service=${service}&name=${providerName}`
    )
    .json();

  return result;
}
