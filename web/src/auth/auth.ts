import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/get-profile'

export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

// export function getCurrentOrg() {
//   return cookies().get('org')?.value ?? null
// }

// export async function getCurrentMembership() {
//   const org = getCurrentOrg()

//   if (!org) {
//     return null
//   }

//   const { membership } = await getMembership(org)

//   return membership
// }

// export async function ability() {
//   const membership = await getCurrentMembership()

//   if (!membership) {
//     return null
//   }

//   const ability = defineAbilityFor({
//     id: membership.id,
//     role: membership.role,
//   })

//   return ability
// }

export async function auth() {
  // const token = cookies().get('token')?.value

  // if (!token) {
    
  // }

  // try {
  //   const { user } = await getProfile()

  //   return { user }
  // } catch {
  //   return {user: null}
  // }


  // redirect('/api/auth/sign-out')
}
