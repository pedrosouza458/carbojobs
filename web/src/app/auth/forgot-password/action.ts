import { GenerateToken } from "../../../http/generate-token";

export async function sendCodeAction(data: FormData) {
  const { phone } = {
    phone: data.get("phone")?.toString(),
  };

  const code = await GenerateToken();

  const message = `*Código de Confirmação \n\n
   seu código é ${code}, volte para o formulário ou acesse
   http://localhost:3000/auth/forgot-password
  *`;
  return {
    success: true,
    message: `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    errors: null,
  };

}
