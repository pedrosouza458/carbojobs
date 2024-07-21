import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1 className='text-center'>Página em construção.</h1>
      <Button><Link href='/auth/sign-in'>Voltar</Link></Button>
    </div>
  )
}
