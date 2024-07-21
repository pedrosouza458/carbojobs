"use client";

import { Button } from "./ui/button";
import ky from "ky";
import { api } from "@/http/api-client";
import { useRouter } from "next/navigation";
import { changeAppointmentStatus } from "@/http/change-appointment-status";
import { deleteAppointment } from "@/http/delete-appointment";
import { deleteBusiness } from "@/http/delete-business";
import { deleteLink } from "@/http/delete-link";
import { DeleteAccount } from "@/http/delete-account";

export function DeleteAccountButton() {
  const router = useRouter()
  function triggerDeleteButton() {
    DeleteAccount()
    router.push('/api/auth/sign-out')
    router.refresh()
  }
  return <Button onClick={triggerDeleteButton}>Deletar</Button>;
}
