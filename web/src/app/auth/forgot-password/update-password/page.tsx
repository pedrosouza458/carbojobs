"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState } from "@/hooks/use-form-state";
import { GenerateToken } from "@/http/generate-token";
import { updatePasswordAction } from "./action";
import { useRouter } from "next/router";

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    updatePasswordAction,
    (response) => {
      // Redirect to WhatsApp with the message body
      router.push('')
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
        <Input name="code" />
        <h1>Digite seu telefone</h1>
        <Input name="phone" />
        <h1>Digite seu email</h1>
        <Input name="email" />
        <h1>Digite sua nova senha</h1>
        <Input name="password" />
        <Button type="submit">Atualizar conta</Button>
      </form>
      <div className="flex items-center">
        <Button>Próximo</Button>
      </div>
    </div>
  );
}
