'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState } from "@/hooks/use-form-state";
import { GenerateToken } from "@/http/generate-token";

import { sendCodeAction } from "./action";
import Link from "next/link";

export default function ForgotPasswordPage() {

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    sendCodeAction,
    (response) => {
      // Redirect to WhatsApp with the message body
      if (response && response.message) {
        const message = response.message;
        window.location.href = message;
      }
    }
  );

  return (
    <div>
      <h1 className="text-center mx-3 my-2">
        Gere um código que será enviado para seu telefone, depois volte e aperte
        em próximo.
      </h1>
      <form onSubmit={handleSubmit}>
        <h1>Digite seu telefone</h1>
        <Input name="phone" />
        <Button type="submit" className="w-full my-3">Gerar código</Button>
      </form>
      <Button className="w-full" variant="link" size="sm" asChild>
          <Link href="forgot-password/update-password">Próximo</Link>
        </Button>
    </div>
  );
}
