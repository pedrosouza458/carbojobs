"use server";

import { z } from "zod";
import { createBusiness } from "@/http/create-business";
import { HTTPError } from "ky";
import { cookies } from "next/headers";
import { getProfile } from "@/http/get-profile";
import { createAppointment } from "@/http/create-appointment";
import { getBusinessDetails } from "@/http/get-business-details";

export async function createAppointmentAction(data: FormData) {

  const { business_id, provider_id, date, hour, name, phone, description } = {
    business_id: data.get("business_id")?.toString(),
    provider_id: data.get("provider_id")?.toString(),
    date: data.get("date")?.toString(),
    hour: data.get("hour")?.toString(),
    description: data.get("description")?.toString(),
    name: data.get("name")?.toString(),
    phone: data.get("phone")?.toString(),
  };

  let businessName: any;
  if (business_id) {
    const array = await getBusinessDetails(business_id);
    businessName = array.map((business: any) => business.title);
  }

  const { message } = await createAppointment({
    business_id: business_id || "",
    provider_id: provider_id || "",
    description: description || "",
    date: date || "",
    hour: hour || "",
    name: name || "",
    phone: phone || "",
  });

  const redirectUrl = `https://wa.me/5551997000856?text=Olá, me chamo ${name} e gostaria de agendar o serviço ${businessName} no dia ${date} e hora ${hour}</p>`;

  return { success: true, message: null, errors: null, redirectUrl };
}
