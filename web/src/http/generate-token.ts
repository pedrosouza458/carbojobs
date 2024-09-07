import { api } from "./api-client";

interface GenerateTokenResponse {
  code: string;
}
export async function GenerateToken(){
  const {code} = await api.get('token').json<GenerateTokenResponse>();
  return code;
}