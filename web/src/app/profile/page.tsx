"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "@/hooks/use-form-state";
import { getProfile } from "@/http/get-profile";
import { useCookies } from "next-client-cookies";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateUserAction } from "./action";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import AvatarForm from "@/components/avatar-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeleteAccount } from "@/http/delete-account";
import { DeleteAccountButton } from "@/components/delete-account-button";

export default function ProfilePage() {
  const [user, setUser] = useState([]);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getProfile().then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  const router = useRouter();

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    updateUserAction,
    () => {
      toast({
        title: "Perfil alterado",
      });
      router.push("/profile");
    }
  );

  return (
    <div className="">
      {user.map((user: any) => (
        <div key={user.id}>
          <Button variant="outline" className="w-full">
            <Link className="text-center" href={`/providers/${user.id}`}>
              Visualizar seu perfil público
            </Link>
          </Button>
          <Separator className="mt-2" />
          <AvatarForm />
          <Separator className="my-3" />
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input name="name" type="text" defaultValue={user.name} />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Input
                name="description"
                type="text"
                defaultValue={user.description}
              />
            </div>
            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input name="phone" defaultValue={user.phone} />
            </div>
            <div className="pt-2">
              <Button className="w-full">Alterar</Button>
            </div>
          </form>
        </div>
      ))}

      <Dialog>
        <DialogTrigger>
          <Button className="w-full bg-red-500">Deletar Conta</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tem certeza que deseja deletar sua conta?</DialogTitle>
            <DialogDescription>
              Essa ação não pode ser desfeita e você perderá todos os dados do
              seus agendamentos. (as mensagens do Whatsapp ainda estarão
              disponíveis)
            </DialogDescription>
            <DeleteAccountButton />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
}
