"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { deleteLink } from "@/http/delete-link";

export function DeleteLinkButton({linkId }: any) {
  const router = useRouter()
  function triggerConfirmButton() {
    deleteLink(linkId);
    router.push('/links')
  }
  return <Button onClick={triggerConfirmButton}>Deletar</Button>;
}
