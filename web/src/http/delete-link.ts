import { api } from "./api-client";

export async function deleteLink(linkId: any) {
  const response = await api
    .delete(`link/${linkId}`)
    .json<any>();

    return response
}
