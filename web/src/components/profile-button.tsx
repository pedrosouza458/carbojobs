import { ChevronDown, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cookies } from "next/headers";
import { getProfile } from "@/http/get-profile";
import { getInitials } from "@/utils/get-initials";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export async function ProfileButton() {
  const token = cookies().get("token")?.value;
 
  let user: any;
  if (token) {
    user = await getProfile();
  }

  return (
    <DropdownMenu>
      {user ? (
        <p></p>
      ) : (
        <Link href={"/auth/sign-in"}>
          <p>Fazer login</p>
        </Link>
      )}
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
        {user && (
          <>
            {user.map((user: any) => (
              <div key={user.id} className="flex flex-row items-center">
                <div className="flex flex-col items-end pr-2">
                  <span className="text-sm font-medium hidden md:block lg:block">
                    {user.name}
                  </span>
                  <span className="text-xs text-muted-foreground hidden md:block lg:block">
                    {user?.role}
                  </span>
                </div>
                <Avatar>
                  {user?.avatarUrl && <AvatarImage src={user?.avatarUrl} />}
                  {user?.name && (
                    <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                  )}
                </Avatar>
              </div>
            ))}
          </>
        )}
        <ChevronDown className="size-4 text-muted-foreground hidden md:block lg:block" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="align-end">
        <DropdownMenuItem asChild>
          <Link href={"/profile"}>
            <User className="mr-2 size-4" />
            Perfil
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a className="" href="/api/auth/sign-out">
            <LogOut className="mr-2 size-4" />
            Deslogar
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
