import { Roles } from '@/enums/roles'
import { api } from './api-client'
import { Cities } from '@/enums/citites'
import { Services } from '@/enums/services'

interface SignUpRequest {
  name: string
  email: string
  password: string,
  phone: string,
  city: Cities | null,
  service: string,
}

type SignUpResponse = void

export async function signUp({
  name,
  email,
  password,
  city,
  phone,
  service,
}: SignUpRequest): Promise<SignUpResponse> {
  await api
    .post('users', {
      json: {
        name,
        email,
        password,
        city,
        phone,
        service,
      },
    })
    .json<SignUpResponse>()
}
