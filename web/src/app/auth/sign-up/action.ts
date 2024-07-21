"use server";

import { HTTPError } from "ky";
import { nativeEnum, z } from "zod";

import { signUp } from "@/http/sign-up";
import { Cities } from "@/enums/citites";
import { Roles } from "@/enums/roles";

const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(" ").length > 1, {
      message: "Digite seu nome e sobrenome.",
    }),
    email: z.string().email({ message: "Digite seu email" }),
    password: z
      .string()
      .min(6, { message: "Sua senha deve ter no mínimo 6 caractéres." }),
    password_confirmation: z.string(),
    phone: z.string({ message: "Digite seu telefone" }),
    city: nativeEnum(Cities),
    service: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Senhas não batem",
    path: ["password_confirmation"],
  });

export async function signUpAction(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return { success: false, message: null, errors };
  }

  const { name, email, password, city, phone, service } =
    result.data;

  try {
    await signUp({
      name,
      email,
      password,
      city,
      phone,
      service: service ? service : "",
    })

  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();

      return { success: false, message, errors: null };
    }

    console.error(err);

    return {
      success: false,
      message: "Erro insesperado, tente novamente em alguns minutos.",
      errors: null,
    };
  }

  return { success: true, message: null, errors: null };
}
