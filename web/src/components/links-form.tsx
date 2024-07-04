"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import githubIcon from "@/assets/github-icon.svg";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useFormState } from "@/hooks/use-form-state";

import { createBusinessAction } from "@/app/business/action";
import { createLinksAction } from "@/app/links/action";

export function LinksForm() {
  const router = useRouter();

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    createLinksAction,
    () => {
      router.push("/links");
    }
  );

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
      
        <div className="space-y-1">
          <Label htmlFor="title">Título</Label>
          <Input name="title" type="text" id="title" />

    
        </div>

        <div className="space-y-1">
          <Label htmlFor="url">Url</Label>
          <Input name="url" type="text" id="url" />
        </div>

  

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Criar link"
          )}
        </Button>

      </form>
    </div>
  );
}
