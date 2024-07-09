"use client";
import { Button } from "./ui/button";
import ky from "ky";
import { api } from "@/http/api-client";
import { useRouter } from "next/navigation";
import { changeAppointmentStatus } from "@/http/change-appointment-status";
import { deleteAppointment } from "@/http/delete-appointment";

export function DeleteAppointmentButton({appointmentId }: any) {
  const router = useRouter()
  function triggerConfirmButton() {
    deleteAppointment(appointmentId);
    router.push('/appointments')
  }
  return <Button onClick={triggerConfirmButton}>Deletar</Button>;
}
