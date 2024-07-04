import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/http/api-client";
import { cookies } from "next/headers";
import { getProviderDetails } from "@/http/get-provider-details";
import { getInitials } from "@/utils/get-initials";
import Image from "next/image";
import { LinkIcon, Share, Smile, Star, StarHalf, Trash } from "lucide-react";
import { getBusinessByProvider } from "@/http/get-business-by-provider";
import { Button } from "@/components/ui/button";
import { getLinksByProvider } from "@/http/get-links-by-provider";
import { ProviderQRCode } from "@/components/provider-qr-code";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AppointmentForm } from "@/components/appointment-form";
import { getDayNumbers } from "@/utils/get-day-numbers";
import { IndicateForm } from "@/components/indicate-form";

export default async function ProviderDetails() {
  const providerId = cookies().get("provider")?.value;

  let provider: any;
  let business: any;
  let links: any;

  if (providerId) {
    provider = await getProviderDetails(providerId);
    business = await getBusinessByProvider(providerId);
    links = await getLinksByProvider(providerId);
  }

  return (
    <div className="px-12 max-w-6xl mx-auto md:px-6 py-4 md:py-10">
      {provider.map((provider: any) => (
        <div key={provider.id} className="">
          <div className="flex  items-center justify-center">
            <div className="lg:flex md:flex items-center justify-center gap-6 mb-4">
              <div>
                {provider.avatar_url != null ? (
                  <img
                    className="max-h-72 w-full md:h-52 rounded-md "
                    alt={`Perfil de ${provider.name}`}
                    src={provider.avatar_url}
                  />
                ) : (
                  <img
                    className="h-full w-full md:h-52 rounded-md "
                    alt={`Perfil de ${provider.name}`}
                    src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                  />
                )}
              </div>
              <div className="space-y-2 pt-2">
                <h2 className="text-2xl font-bold">{provider.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {provider.service} - {provider.city}
                </p>
                {provider.indicated != null && <></>}
                <p className="text-green-500 text-sm font-medium">
                  {provider.indicated} cliente(s) indicaram esse prestador
                </p>
                <div className="flex gap-2 w-full">
                  <Dialog>
                    <DialogTrigger asChild className="w-full flex gap-3">
                      <div>
                        <Button className="flex flex-row gap-2">
                          <Smile className="size-4" /> Indicar
                        </Button>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <IndicateForm providerId={provider.id}/>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild className="w-full flex gap-3">
                      <div>
                        <Button className="flex flex-row gap-2">
                          <Share className="size-4" /> Compartilhar
                        </Button>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <ProviderQRCode
                        providerId={provider.id}
                        providerName={provider.name}
                        providerService={provider.service}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">Descrição</h3>
          <div className="pb-2 pt-2 text-secondary-foreground text-sm">
            <p>{provider.description}</p>
          </div>
          <Separator className="my-2" />
          <h3 className="text-xl font-bold mb-4 my-6">Links</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
            {links.map((link: any) => (
              <Card key={links.id} className="w-40 h-10 lg:w-60">
                <Link href={link.url}>
                  <CardContent className="flex gap-3 my-2 items-stretch">
                    <LinkIcon className="size-5" />
                    {link.title}
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      ))}

      <Separator className="my-6 md:my-10" />
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-bold mb-4">Trabalhos</h3>
          <div className="grid grid-cols-1 gap-4">
            {business.map((business: any) => (
              <Card key={business.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-start gap-2">
                    <h4 className="text-lg font-bold">{business.title}</h4>
                    <p className="text-secondary-foreground text-sm  dark:text-gray-400">
                      {business.description}
                    </p>
                    <p className="pb-2 text-[#53c37c] dark:text-[#22C55D] font-semibold">
                      R$ {business.price}
                    </p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild className="flex gap-2">
                      <Button className="h-full w-full">Agendar agora</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>{business.title}</DialogTitle>
                      </DialogHeader>
                      {business.days && business.hours ? (
                        <AppointmentForm
                          key={business.id}
                          business_id={business.id}
                          provider_id={business.provider_id}
                          title={business.title}
                          price={business.price}
                          description={business.description}
                          days={getDayNumbers(business.days)}
                          hours={business.hours.map((hour: any) => hour)}
                        />
                      ) : (
                        <p>Esse prestador não adicionou horas e dias.</p>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
          {business === null && <p>Esse prestador não possui serviços.</p>}
        </div>
        {/* <div>
          <h3 className="text-xl font-bold mb-4">Comentários</h3>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JR</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium ">Jane Roe</h4>

                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        1 week ago
                      </span>
                    </div>
                    <div className="star-rating flex items-center">
                      <Star className="size-5" fill="#FD3D6D" strokeWidth={0} />
                      <Star className="size-5" fill="#FD3D6D" strokeWidth={0} />
                      <Star className="size-5" fill="#FD3D6D" strokeWidth={0} />
                      <Star className="size-5" fill="#FD3D6D" strokeWidth={0} />
                      <Star className="size-5" fill="#FD3D6D" strokeWidth={0} />
                    </div>
                    <p>
                      Impressive portfolio, Jared. I can't wait to see what you
                      create next!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div> */}
      </div>
    </div>
  );
}
