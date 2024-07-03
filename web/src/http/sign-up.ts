import { Roles } from '@/enums/roles'
import { api } from './api-client'
import { Cities } from '@/enums/citites'
import { Services } from '@/enums/services'

interface SignUpRequest {
  name: string
  email: string
  password: string,
  phone: string,
  role: Roles,
  city: Cities | null,
  service: string,
  code: string
}

type SignUpResponse = void

export async function signUp({
  name,
  email,
  password,
  city,
  role,
  phone,
  service,
  code
}: SignUpRequest): Promise<SignUpResponse> {
  await api
    .post('users', {
      json: {
        name,
        email,
        password,
        city,
        phone,
        role,
        service,
        code
      },
    })
    .json<SignUpResponse>()
}
