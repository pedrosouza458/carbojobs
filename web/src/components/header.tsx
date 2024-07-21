import { Menu, Slash } from "lucide-react";
import Image from "next/image";

import rocketseatIcon from "@/assets/rocketseat-icon.svg";

import { ProfileButton } from "./profile-button";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { Separator } from "./ui/separator";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "ky";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "./ui/sheet";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { cookies } from "next/headers";
import { getProfile } from "@/http/get-profile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { TutorialText } from "./tutorial-text";
export async function Header() {
  const token = cookies().get("token")?.value;

  let user: any;
  if (token) {
    user = await getProfile();
  }

  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="mg:pl-4 lg:pl-4 flex items-center gap-5">
        <Link href={"/"} className="flex gap-2">
          <h1 className="font-semibold hidden md:block lg:block">
            Carbo <span className="text-green-500">Jobs</span>
          </h1>
          <Badge variant="outline" className="hidden md:block lg:block">
            Beta
          </Badge>
        </Link>
        <Slash className="size-3 -rotate-[24deg] text-border hidden md:block lg:block" />
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="h-5 block md:hidden lg:hidden" />
            {/* <Button className='block md:hidden lg:hidden' variant="outline">Open</Button> */}
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <Link href={"/"} className="flex gap-2">
                  <h1 className="font-semibold">
                    Carbo<span className="text-green-500">Jobs</span>
                  </h1>
                  <Badge variant="outline" className="">
                    Beta
                  </Badge>
                </Link>
              </SheetTitle>
              <Separator />

              <Link className="text-base text-primary font-semibold" href={"/"}>
                Home
              </Link>

              {token && (
                <Link
                  className=" text-base text-primary font-semibold"
                  href={"/schedules"}
                >
                  Horários
                </Link>
              )}

              {token && (
                <Link
                  className=" text-base text-primary font-semibold"
                  href={"/appointments"}
                >
                  Agendamentos
                </Link>
              )}

              {token && (
                <Link
                  className=" text-base text-primary font-semibold"
                  href={`/business`}
                >
                  Trabalhos
                </Link>
              )}

              {token && (
                <Link
                  className=" text-base text-primary font-semibold"
                  href={`/links`}
                >
                  Links
                </Link>
              )}

              {token && (
                <Link
                  className=" text-base text-primary font-semibold"
                  href={`/reports`}
                >
                  Relatórios
                </Link>
              )}
            </SheetHeader>
            {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
          </SheetContent>
        </Sheet>
        <Link className=" text-sm hidden md:block lg:block" href={"/"}>
          Home
        </Link>

        {token && (
          <Link
            className=" text-sm hidden md:block lg:block"
            href={`/business`}
          >
            Trabalhos
          </Link>
        )}

        {token && (
          <Link
            className=" text-sm hidden md:block lg:block"
            href={"/schedules"}
          >
            Horários
          </Link>
        )}

        {token && (
          <Link
            className=" text-sm hidden md:block lg:block"
            href={"/appointments"}
          >
            Agendamentos
          </Link>
        )}

        {token && (
          <Link className=" text-sm hidden md:block lg:block" href={"/links"}>
            Links
          </Link>
        )}

{token && (
          <Link className=" text-sm hidden md:block lg:block" href={"/reports"}>
            Relatórios
          </Link>
        )}
      </div>
      <div className="flex items-center lg:gap-4 md:gap-4 pr-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Tutorial</Button>
          </DialogTrigger>
          <DialogContent>
            <TutorialText />
          </DialogContent>
        </Dialog>
        <ThemeSwitcher />
        <ProfileButton />
      </div>
    </div>
  );
}
