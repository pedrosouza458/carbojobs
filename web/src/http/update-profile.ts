import { api } from "./api-client";
import { getProfile } from "./get-profile";

interface updateProfileResponse {
  name?: string;
  description?: string;
  avatar_url?: string;
  phone?: string;
}

export async function updateUser({
  name,
  description,
  phone,
  avatar_url
}: updateProfileResponse) {
  const user = await getProfile();
  const userId: string = user.map((user: any) => user.id);
  const result = await api
    .put(`users/update/${userId}`, {
      json: {
        name,
        description,
        phone,
        avatar_url
      },
    })
    .json<any>();

  return result;
}
