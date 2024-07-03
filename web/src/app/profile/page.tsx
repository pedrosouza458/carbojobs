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
        title: "Perfil alterado"
      });
      router.push("/profile");
    }
  );

  
  return (
    <div className="">
      {user.map((user: any) => (
        <>
          {user.role === "Prestador" ? (
            <div key={user.id}>
              <Button variant="outline" className="w-full">
                <Link className="text-center" href={`/providers/${user.id}`}>
                  Visualizar seu perfil público
                </Link>
              </Button>
              <Separator className="mt-2" />
            <AvatarForm/>
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
          ) : (
            <div key={user.id}>
                     <AvatarForm/>
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input defaultValue={user.name} />
              </div>
              <div className="space-y-2">
                <Label>Descrição</Label>
                <Input defaultValue={user.name} />
              </div>
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input defaultValue={user.name} />
              </div>
            </div>
          )}
        </>
      ))}
      <Button variant="destructive" className="mt-4 w-full">
        Deletar conta
      </Button>
      <Toaster />
    </div>
  );
}
