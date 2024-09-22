import { updatePassword } from "@/http/update-password";

export async function updatePasswordAction(data: FormData) {
  const { code, phone, email, password } = {
    code: data.get("code")?.toString(),
    phone: data.get("phone")?.toString(),
    email: data.get("email")?.toString(),
    password: data.get("password")?.toString(),
  };

  await updatePassword({
    code: code || "",
    phone: phone || "",
    email: email || "",
    password: password || "",
  });

  return {
    success: true,
    message: `Senha atualizada`,
    errors: null,
  };
}
