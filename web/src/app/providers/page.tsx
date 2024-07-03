"use client";

import { ProvidersList } from "@/components/providers-list";
import { FiltersSkeleton } from "@/components/skeletons/filters-skeleton";
import { ProvidersSkeleton } from "@/components/skeletons/providers-skeleton";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Cities } from "@/enums/citites";
import { Services } from "@/enums/services";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Suspense, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Filter } from "lucide-react";

export function Providers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [name, setName] = useState("");

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(event: any) {
    event.preventDefault();
    const form = event.target; // Get the form element from the event
    const data = new FormData(form); // Create a FormData object from the form element
    const parse = Object.fromEntries(data);
    const { city, service, name }: any = parse;

    setCurrentPage(1);
    setCity(city);
    setService(service);
    setName(name);
  }

  function resetFilters() {
    setCurrentPage(1);
    setCity("");
    setService("");
    setName("");
  }

  const onPageChange = (newPage: number) => {
    startTransition(() => {
      setCurrentPage(newPage);
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center md:hidden lg:hidden">
        <Drawer>
          <DrawerTrigger>
            <div className="flex items-center justify-center gap-2 font-medium text-lg">
              <div>
                {" "}
                <Filter className="size-5" />
              </div>
              <div>Filtrar</div>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-5"
              >
                <Select name="city">
                  <SelectTrigger className="w-[14rem]">
                    <SelectValue placeholder="Selecione cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Cities).map((city, index) => (
                      <SelectItem key={index} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select name="service">
                  <SelectTrigger className="w-[14rem]">
                    <SelectValue placeholder="Selecione serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Services).map((service, index) => (
                      <SelectItem key={index} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  name="name"
                  placeholder="Digite nome"
                  className="w-[14rem]"
                ></Input>
                <Button type="submit" className="w-[14rem]">
                  Filtrar Resultados
                </Button>
              </form>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <Button onClick={resetFilters} variant="ghost">
                  Resetar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="gap-12 hidden flex-row lg:flex md:flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <Select name="city">
            <SelectTrigger className="w-[14rem]">
              <SelectValue placeholder="Selecione cidade" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Cities).map((city, index) => (
                <SelectItem key={index} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select name="service">
            <SelectTrigger className="w-[14rem]">
              <SelectValue placeholder="Selecione serviço" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Services).map((service, index) => (
                <SelectItem key={index} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            name="name"
            placeholder="Digite nome"
            className="w-[14rem]"
          ></Input>
          <Button type="submit" className="w-[14rem]">
            Filtrar Resultados
          </Button>
        </form>
        <Button onClick={resetFilters} variant="ghost">
          Resetar
        </Button>
      </div>
      <Suspense
        fallback={
          <div>
            <ProvidersSkeleton />
          </div>
        }
      >
        <ProvidersList
          page={currentPage}
          city={city}
          service={service}
          providerName={name}
        />
      </Suspense>

      <Pagination className="pt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={currentPage <= 1 ? "hidden" : undefined}
              href="#"
              onClick={() => setCurrentPage(currentPage - 1)}
            ></PaginationPrevious>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#"> {currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              <button onClick={() => setCurrentPage(currentPage + 1)}>
                {currentPage + 1}
              </button>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              <button onClick={() => setCurrentPage(currentPage + 2)}>
                {currentPage + 2}
              </button>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => setCurrentPage(currentPage + 1)}
            ></PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
