"use server";

import { createlinks } from "@/http/create-links";

export async function createLinksAction(data: FormData) {
  const {title, url} = {
    title: data.get("title")?.toString(),
    url: data.get("url")?.toString(),
  };

  const result = await createlinks({
    title: title || "",
    url: url || "",
  });

  return { success: true, message: null, errors: null };
}
