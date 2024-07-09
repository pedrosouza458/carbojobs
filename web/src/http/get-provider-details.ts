import { api } from "./api-client";
/* 
"id": "jLxf6XEF_sR_hkRPWB0lD",
    "name": "Denise Alessandra",
    "avatar_url": "https://images.unsplash.com/photo-1484863137850-59afcfe05386?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "service": "Limpeza",
    "city": "Cristal",
    "description": "Sou a Denise",
    "indicated": 61
*/

export interface GetProviderDetailsReponse {
    id: string;
    name: string;
    avatar_url: string;
    service: string;
    city: string;
    description: string;
    indicated: number;
}

export async function getProviderDetails(id: string) {
  const user = await api
    .get(`providers/${id}`)
    .json<GetProviderDetailsReponse>();

  return user;
}
