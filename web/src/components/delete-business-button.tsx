"use client";
import { Button } from "./ui/button";
import ky from "ky";
import { api } from "@/http/api-client";
import { useRouter } from "next/navigation";
import { changeAppointmentStatus } from "@/http/change-appointment-status";
import { deleteAppointment } from "@/http/delete-appointment";
import { deleteBusiness } from "@/http/delete-business";

export function DeleteBusinessButton({appointmentId }: any) {
  const router = useRouter()
  function triggerConfirmButton() {
    deleteBusiness(appointmentId);
    router.push('/business')
  }
  return <Button onClick={triggerConfirmButton}>Deletar</Button>;
}
