"use server";

import { updateSchedule } from "@/http/update-schedule";

export async function updateScheduleAction(data: FormData) {
  const { hours, days } = {
    hours: data.getAll("hours"),
    days: data.getAll("days"),
  };
  // console.log(hours, days);

  const response = await updateSchedule({
    hours: hours || "",
    days: days || "",
  });

  return { success: true, message: null, errors: null };
}
