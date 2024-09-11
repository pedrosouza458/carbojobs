import { GenerateToken } from "../../../http/generate-token";

export async function sendCodeAction(data: FormData) {
  const { phone } = {
    phone: data.get("phone")?.toString(),
  };

  const code = await GenerateToken();

  const message = `*Código de Confirmação* \n\n
   seu código é ${code}, guarde ele, volte para o formulário e clique em próximo \n
   ou acesse: https://carbojobs.com/auth/forgot-password/update-password
  `;
  return {
    success: true,
    message: `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    errors: null,
  };
}
