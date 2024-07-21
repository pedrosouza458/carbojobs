"use server";

import { z } from "zod";
import { createBusiness } from "@/http/create-business";
import { HTTPError } from "ky";
import { cookies } from "next/headers";
import { getProfile } from "@/http/get-profile";
import { createAppointment } from "@/http/create-appointment";
import { updateUser } from "@/http/update-profile";
import crypto from "crypto";

export async function updateUserAction(data: FormData) {
  const { name, description, phone } = {
    name: data.get("name")?.toString(),
    description: data.get("description")?.toString(),
    phone: data.get("phone")?.toString(),
  };

  const response = await updateUser({
    name: name || "",
    description: description || "",
    phone: phone || "",
  });

  return { success: true, message: null, errors: null };
}

export async function updateUserAvatarAction(data: FormData) {
  const searchUserAvatarUrl = await getProfile();

  const url = searchUserAvatarUrl.map((user: any) => user.avatar_url)[0];

  if (url !== null) {
    // Data to be sent in the request
    // Step 2: Get the last segment
    const segments = url.split("/");

    // Step 2: Get the last segment
    const lastSegment = segments[segments.length - 1];

    // Step 3: Split the last segment by the dot to separate the name and the extension
    const [fileName] = lastSegment.split(".");
    const timestamp = Math.floor(Date.now() / 1000).toString(); // Current timestamp
    const apiKey = "151953218958187"; // Replace with your actual API key
    const apiSecret = "9RrXcs4fV4fKLZsHaWINpSbwN4w"; // Replace with your actual API secret

    // Calculate the signature
    const signature = crypto
      .createHash("sha1")
      .update(`public_id=${fileName}&timestamp=${timestamp}${apiSecret}`)
      .digest("hex");

    const deleteData = new URLSearchParams({
      public_id: fileName,
      api_key: apiKey,
      timestamp: timestamp,
      signature: signature,
    });
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dyx21grtn/image/destroy",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: deleteData,
        }
      );

    } catch (error) {
      console.error(error);
    }
  }

  const avatarFile = data.get("avatar_img") as File | null;

  if (!avatarFile) {
    return { success: false, message: "No file provided", errors: null };
  }
  data.append("file", avatarFile);
  data.append("upload_preset", "fys9zj8v");
  // console.log('FormData prepared:', data);

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dyx21grtn/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const result = await response.json();
    const newUrl = result.secure_url;
    console.log(result.original_filename);

    await updateUser({
      avatar_url: newUrl,
    });

    return {
      success: true,
      message: "File uploaded successfully",
      errors: null,
      url: result.secure_url,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, message: "Deu errado", errors: null };
  }
}

export async function DeletePreviousUserAvatar(url: any) {
  alert("teste");
  const segments = url.split("/");

  // Step 2: Get the last segment
  const lastSegment = segments[segments.length - 1];

  // Step 3: Split the last segment by the dot to separate the name and the extension
  const [fileName] = lastSegment.split(".");
  const data = {
    public_id: fileName,
  };

  // Step 4: Output the result
  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dyx21grtn/image/destroy",
    {
      method: "POST",
      body: fileName,
    }
  );
  return { success: true, message: "File uploaded successfully", errors: null };
}
