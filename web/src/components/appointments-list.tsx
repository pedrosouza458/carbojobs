import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getAppointments } from "@/http/get-appointments";
import { getProfile } from "@/http/get-profile";
import { Badge } from "./ui/badge";
import { getCookies } from "next-client-cookies/server";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { ChangeStatusButton } from "./change-status-button";
import { Trash } from "lucide-react";
import { DeleteAppointmentButton } from "./delete-appointment-button";

export async function AppointmentList() {
  const cookie = getCookies();
  const token = cookie.get("token");
  let user: any;
  let appointments: any;
  if (token) {
    user = await getProfile();
    appointments = await getAppointments(user.id);
  }

  return (
    <div className="grid md:grid-cols-3 gap-10">
      {appointments &&
        appointments.map((appointment: any) => (
          <Card key={appointment.id} className="py-4 max-h-[11.5rem] w-full">
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold">{appointment.name}</h1>
                  <div className="flex items-center ml-auto">
                    <Badge variant="outline">{appointment.status}</Badge>
                    <Dialog>
                      <DialogTrigger asChild className="w-full">
                        <Trash className="size-5 ml-2 cursor-pointer" />
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Deletar Agendamento</DialogTitle>
                          <DialogDescription>
                            Deseja deletar esse agendamento? essa ação não pode
                            ser desfeita.
                          </DialogDescription>
                        </DialogHeader>

                        {appointment.id ? (
                          <DeleteAppointmentButton appointmentId={appointment.id} />
                        ) : (
                          ""
                        )}
                        {/* <ConfirmButton appointmentId={appointment.id} /> */}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <p>
                  {appointment.date} - {appointment.hour}
                </p>
                <p className="text-sm text-secondary-foreground">
                  {appointment.description}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-row gap-4">
              {appointment.status === "Pendente" && (
                <>
                  <Dialog>
                    <DialogTrigger asChild className="w-full">
                      <Button>Confirmar</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Confirmar Agendamento</DialogTitle>
                        <DialogDescription>
                          Deseja confirmar esse agendamento?
                        </DialogDescription>
                      </DialogHeader>

                      {appointment.id ? (
                        <ChangeStatusButton
                          type="Aceitar"
                          appointmentId={appointment.id}
                          status="Aceito"
                        />
                      ) : (
                        ""
                      )}
                      {/* <ConfirmButton appointmentId={appointment.id} /> */}
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Rejeitar</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Rejeitar Agendamento</DialogTitle>
                        <DialogDescription>
                          Deseja rejeitar esse agendamento?
                        </DialogDescription>
                      </DialogHeader>

                      {appointment.id ? (
                        <ChangeStatusButton
                          type="Rejeitar"
                          appointmentId={appointment.id}
                          status="Rejeitado"
                        />
                      ) : (
                        ""
                      )}
                      {/* <ConfirmButton appointmentId={appointment.id} /> */}
                    </DialogContent>
                  </Dialog>
                </>
              )}
              {appointment.status === "Aceito" && (
                <>
                  <Dialog>
                    <DialogTrigger asChild className="w-full">
                      <Button variant="outline">Confirmado</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                      <DialogDescription className="text-justify pt-4">
                          Deseja tirar a confirmação do agendamento? o
                          agendamento ficará como pendente e seu cliente vai
                          receber uma mensagem avisando a desconfirmação.
                        </DialogDescription>
                      </DialogHeader>

                      {appointment.id ? (
                        <ChangeStatusButton
                          type="Retirar Confirmação"
                          appointmentId={appointment.id}
                          status="Pendente"
                        />
                      ) : (
                        ""
                      )}
                    </DialogContent>
                  </Dialog>
                </>
              )}
              {appointment.status === "Rejeitado" && (
                <>
                  <Dialog>
                    <DialogTrigger asChild className="w-full">
                      <Button variant="outline">Rejeitado</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogDescription className="text-justify pt-4">
                          Deseja tirar a rejeição do agendamento? o agendamento
                          ficará como pendente e seu cliente vai receber uma
                          mensagem avisando a desrejeição.
                        </DialogDescription>
                      </DialogHeader>
                  
                          {appointment.id ? (
                            <ChangeStatusButton
                              type="Retirar Rejeição"
                              appointmentId={appointment.id}
                              status="Pendente"
                            />
                          ) : (
                            ""
                          )}
                     
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
