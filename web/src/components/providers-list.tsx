import { getProviders } from "@/http/get-providers";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export async function ProvidersList({
  page,
  city,
  service,
  providerName,
}: {
  page: number;
  city: string;
  service: string;
  providerName: string;
}) {
  const providers: any = await getProviders(page, city, service, providerName);

  return (
    <div>
      <div className="px-10 lg:px-20 pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {providers.map((provider: any) => (
          <Card key={provider.id}>
            <CardHeader>
              {provider.avatar_url ? (
                <Image
                  width={300}
                  height={500}
                  sizes="100vw"
                  className="rounded-md object-cover w-full h-44 md:w-96 md:h-52"
                  src={provider.avatar_url}
                  alt={provider.name}
                />
              ) : (
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="rounded-md object-cover w-full h-44 md:w-96 md:h-52"
                  src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                  alt={provider.name}
                />
              )}
              <CardTitle className="pt-2 text-xl">{provider.name}</CardTitle>
              {provider.indicated != null && <></>}
              <p className="text-green-500 text-sm font-medium">
                {provider.indicated} cliente(s) indicaram esse prestador
              </p>
              <CardDescription className="text-sm">
                {provider.service} - {provider.city}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">
                <Link href={`/providers/${provider.id}`}>Ver detalhes</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
