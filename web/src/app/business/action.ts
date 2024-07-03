"use server";

import { z } from "zod";
import { createBusiness } from "@/http/create-business";
import { HTTPError } from "ky";
import { cookies } from "next/headers";
import { getProfile } from "@/http/get-profile";

const createBusinessSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
});

export async function createBusinessAction(data: FormData) {
  const {title, description, price} = {
    title: data.get("title")?.toString(),
    description: data.get("description")?.toString(),
    price: data.get("price")?.toString(),
  };

  const { message } = await createBusiness({
    title: title || "",
    description: description,
    price: Number(price),
  });

  return { success: true, message: null, errors: null };
}
