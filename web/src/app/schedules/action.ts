"use server";

import { z } from "zod";
import { createBusiness } from "@/http/create-business";
import { HTTPError } from "ky";
import { cookies } from "next/headers";
import { getProfile } from "@/http/get-profile";
import { createAppointment } from "@/http/create-appointment";
import { updateUser } from "@/http/update-profile";
import { updateSchedule } from "@/http/update-schedule";

export async function updateScheduleAction(data: FormData) {
  const { hours, days } = {
    hours: data.getAll("hours"),
    days: data.getAll("days"),
  };
  console.log(hours, days);

  const response = await updateSchedule({
    hours: hours || "",
    days: days || "",
  });

  return { success: true, message: null, errors: null };
}
