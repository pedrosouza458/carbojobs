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
import { getBusinessByProvider } from "@/http/get-business-by-provider";
import { DeleteBusinessButton } from "./delete-business-button";

export async function BusinessList() {
  const cookie = getCookies();
  const token = cookie.get("token");
  let user: any;
  let business: any;
  if (token) {
    user = await getProfile();
    business = await getBusinessByProvider(user.map((user: any) => user.id));
  }

  return (
    <div className="grid md:grid-cols-3 gap-10">
      {business &&
        business.map((business: any) => (
          <Card key={business.id}>
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-bold">{business.title}</h4>
                  <div className="flex items-center ml-auto">
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

                        {business.id ? (
                          <DeleteBusinessButton appointmentId={business.id} />
                        ) : (
                          ""
                        )}
                        {/* <ConfirmButton appointmentId={appointment.id} /> */}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <p className="text-secondary-foreground text-sm  dark:text-gray-400">
                  {business.description}
                </p>
                <p className="pb-2 text-[#53c37c] dark:text-[#22C55D] font-semibold">
                  R$ {business.price}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
