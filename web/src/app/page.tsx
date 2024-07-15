import { ProvidersList } from '@/components/providers-list';
import { Providers } from './providers/page';


export default async function Home() {

  return (
    <div className="py-4">
     <Providers/>
    </div>
  )
}
