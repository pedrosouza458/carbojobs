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

export function BusinessForm() {
  const router = useRouter();

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    createBusinessAction,
    () => {
      router.push("/business");
    }
  );

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
      
        <div className="space-y-1">
          <Label htmlFor="title">Título</Label>
          <Input name="title" type="text" id="title" />

          {errors?.title && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.title[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Descrição</Label>
          <Input name="description" type="text" id="description" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="price">Preço</Label>
          <Input name="price" type="number" id="price" />

        </div>

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Criar trabalhos"
          )}
        </Button>

      </form>
    </div>
  );
}
