"use server";

import { createAppointment } from "@/http/create-appointment";
import { getBusinessDetails } from "@/http/get-business-details";
import { getProviderDetails } from "@/http/get-provider-details";

export async function createAppointmentAction(data: FormData) {
  const { business_id, provider_id, date, hour, name, description } = {
    business_id: data.get("business_id")?.toString(),
    provider_id: data.get("provider_id")?.toString(),
    date: data.get("date")?.toString(),
    hour: data.get("hour")?.toString(),
    description: data.get("description")?.toString(),
    name: data.get("name")?.toString(),
  };

  let businessName: any;
  if (business_id) {
    const array = await getBusinessDetails(business_id);
    businessName = array.map((business: any) => business.title);
  }

  let providerPhone: any;
  if(provider_id){
    const arrayProvider = await getProviderDetails(provider_id)
    providerPhone = arrayProvider.map((provider: any) => provider.phone);
    // console.log(providerPhone)
  }

  const { message } = await createAppointment({
    business_id: business_id || "",
    provider_id: provider_id || "",
    description: description || "",
    date: date || "",
    hour: hour || "",
    name: name || "",
  });

  const messageBody = `*Agendamento*\n\n${
    description ? `*Descrição*: ${description}` : "Sem descrição."
  }\n\n*Nome:* ${name}\n*Serviço:* ${businessName}\n*Dia:* ${date}\n*Hora:* ${hour}`
  return {
    success: true,
    message: `https://wa.me/${providerPhone}?text=${encodeURIComponent(messageBody)}`,
    errors: null,
  };
}
