"use server";

import { z } from "zod";
import { createBusiness } from "@/http/create-business";
import { HTTPError } from "ky";
import { cookies } from "next/headers";
import { getProfile } from "@/http/get-profile";
import { createAppointment } from "@/http/create-appointment";

export async function createAppointmentAction(data: FormData) {
  const {business_id, provider_id, date, hour, name, phone} = {
    business_id: data.get("business_id")?.toString(),
    provider_id: data.get("provider_id")?.toString(),
    date: data.get("date")?.toString(),
    hour: data.get("hour")?.toString(),
    name: data.get("name")?.toString(),
    phone: data.get("phone")?.toString(),
  };

  const { message } = await createAppointment({
    business_id: business_id || "",
    provider_id: provider_id || '',
    date: date || '',
    hour: hour || '',
    name: name || '',
    phone: phone || '',
  });

  return { success: true, message: null, errors: null };
}
