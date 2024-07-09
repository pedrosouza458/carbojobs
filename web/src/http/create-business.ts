import { api } from "./api-client";

interface CreateBusinessRequest {
  title: string;
  description?: string;
  price?: number;
}

interface CreateBusinessResponse {
  message: string;
}

export async function createBusiness({
  title,
  description,
  price,
}: CreateBusinessRequest) {
  
  const result = await api
    .post('business', {
      json: {
        title,
        description,
        price,
      },
    })
    .json<CreateBusinessResponse>();
  return result;
}
