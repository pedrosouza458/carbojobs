import { api } from "./api-client";
import { getProfile } from "./get-profile";

interface updateProfileResponse {
  hours?: FormDataEntryValue[];
  days?: FormDataEntryValue[];
}

export async function updateSchedule({
  hours,
  days
}: updateProfileResponse) {
  const user = await getProfile();
  const userId: string = user.map((user: any) => user.id);
  const result = await api
    .put(`users/update/${userId}`, {
      json: {
        hours,
        days
      },
    })
    .json<any>();

  return result;
}
