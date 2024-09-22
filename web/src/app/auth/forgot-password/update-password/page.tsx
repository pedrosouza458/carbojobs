"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState } from "@/hooks/use-form-state";
import { GenerateToken } from "@/http/generate-token";
import { updatePasswordAction } from "./action";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    updatePasswordAction,
    (response) => {
      router.push("/");
      toast({
        title: "Perfil alterado",
      });
    }
  );

  return (
    <div>
      <h1 className="text-center">
        Gere um código que será enviado para seu telefone, depois volte e aperte
        em continuar ou acesse .
      </h1>
      <form onSubmit={handleSubmit}>
        <h1>Digite o Código que recebeu</h1>
        <Input type="text" name="code" />
        <h1>Digite seu telefone sem espaços</h1>
        <Input type="text" name="phone" />
        <h1>Digite seu email</h1>
        <Input type="email" name="email" />
        <h1>Digite sua nova senha</h1>
        <Input type="password" name="password" />
        <Button type="submit" className="w-full my-3">
          Atualizar conta
        </Button>
      </form>
      <Button className="w-full" variant="link" size="sm" asChild>
        <Link href="/auth/forgot-password">Voltar</Link>
      </Button>
      <Toaster />
    </div>
  );
}
