"use client";

import "react-day-picker/dist/style.css";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DayPicker, DayOfWeek } from "react-day-picker";
import { Calendar } from "./ui/calendar";
import { Badge } from "./ui/badge";
import { Hours } from "@/enums/hours";
import { ptBR } from "date-fns/locale";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Cities } from "@/enums/citites";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useFormState } from "@/hooks/use-form-state";
import { createAppointmentAction } from "@/app/appointments/action";
import { getProfile } from "@/http/get-profile";
import moment from "moment";

interface AppointmentFormProps {
  business_id: string;
  provider_id: string;
  title: string;
  description: string;
  price: number;
  hours: string[];
  days: number[];
}

export function AppointmentForm({
  business_id,
  provider_id,
  hours,
  days,
  title,
  description,
  price,
}: AppointmentFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    createAppointmentAction,
    (response) => {
      // Redirect to WhatsApp with the message body
      if (response && response.message) {
        const messageBody = response.message;
        window.location.href = messageBody;
      }
    }
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <>
          <Input name="business_id" value={business_id} className="hidden" />
          <Input name="provider_id" value={provider_id} className="hidden" />
          <div className="">
            {selectedDate?.toDateString()}
            <Calendar
              locale={ptBR}
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={{ dayOfWeek: days }}
            />
            {selectedDate ? (
              <Input
                name="date"
                className="hidden"
                value={format(selectedDate, "dd/MM/yyyy")}
              />
            ) : (
              <Input value="" className="hidden" />
            )}
          </div>
          <div className="">
            <div className="space-y-3">
              <Label htmlFor="city">Horário</Label>
              <Select name="hour">
                <SelectTrigger className="w-[90%]">
                  <SelectValue placeholder="Selecione o horário" />
                </SelectTrigger>
                <SelectContent>
                  {hours.map((hour: any) => (
                    <SelectItem key={hour} value={hour}>
                      {hour}
                    </SelectItem>
                  ))}
                  {/* {Object.values(Cities).map((city, index) => (
                    <SelectItem key={index} value={city}>
                      {city}
                    </SelectItem>
                  ))} */}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="name">Descrição (opcional)</Label>
              <Input
                type="text"
                name="description"
                placeholder="Digite seu nome"
                className="w-[90%]"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="name">Nome</Label>
              <Input
                type="text"
                name="name"
                placeholder="'"
                className="w-[90%]"
              />
            </div>
          </div>
        </>
        <Button type="submit" className="w-[90%]">
          Agendar
        </Button>
      </form>
    </div>
  );
}
