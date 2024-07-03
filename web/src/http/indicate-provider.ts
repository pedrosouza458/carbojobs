import { api } from "./api-client";

interface IndicateProviderResponse {
  message: string;
}

export async function indicateProvider(
  providerId: string
): Promise<IndicateProviderResponse> {
  const result = await api
    .post(`indicate/${providerId}`)
    .json<IndicateProviderResponse>();

  return result;
}