"use client";
import { Button } from "./ui/button";
import ky from "ky";
import { api } from "@/http/api-client";
import { useRouter } from "next/navigation";
import { changeAppointmentStatus } from "@/http/change-appointment-status";

export function ChangeStatusButton({ type, appointmentId, status }: any) {
  const router = useRouter()
  function triggerConfirmButton() {
    // console.log(appointmentId, status)
    changeAppointmentStatus(appointmentId, status);
    router.push('/appointments')
  }
  return <Button onClick={triggerConfirmButton}>{type}</Button>;
}
