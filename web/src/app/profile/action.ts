"use server";

import { z } from "zod";
import { createBusiness } from "@/http/create-business";
import { HTTPError } from "ky";
import { cookies } from "next/headers";
import { getProfile } from "@/http/get-profile";
import { createAppointment } from "@/http/create-appointment";
import { updateUser } from "@/http/update-profile";
// const createAppointmentSchema = z.object({
//   business_id: z.string().nanoid(),
//   provider_id: z.string().nanoid(),
//   date: z.string(),
//   hour: z.string(),
//   name: z.string(),
//   phone: z.string()
// });


export async function updateUserAction(data: FormData) {
  const {name, description, phone} = {
    name: data.get("name")?.toString(),
    description: data.get("description")?.toString(),
    phone: data.get("phone")?.toString(),
  };

  const response = await updateUser({
    name: name || '',
    description: description || '',
    phone: phone || '',
  });

  return { success: true, message: null, errors: null };
}

export async function updateUserAvatarAction(data: FormData) {
  const avatarFile = data.get('avatar_img') as File | null;

  if (!avatarFile) {
    return { success: false, message: "No file provided", errors: null };
  }
  data.append('file', avatarFile);
  data.append('upload_preset', 'fys9zj8v');
  console.log('FormData prepared:', data);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/dyx21grtn/image/upload/w_500,h_300,c_fill/${avatarFile.name}`, {
      method: 'POST',
      body: data
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const result = await response.json();
    const newUrl = result.secure_url

    await updateUser({
      avatar_url: newUrl
    })

    return { success: true, message: "File uploaded successfully", errors: null, url: result.secure_url };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { success: false, message: 'Deu errado', errors: null };
  }
}
