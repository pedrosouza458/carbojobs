import { api } from "./api-client";

interface CreatelinksRequest {
  title: string;
  url: string;
}

export async function createlinks({
  title,
  url,
}: CreatelinksRequest) {
  
  const result = await api
    .post('links', {
      json: {
        title,
        url
      },
    })
    .json();
  return result;
}
