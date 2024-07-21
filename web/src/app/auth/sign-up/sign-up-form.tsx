"use client";

import { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "@/hooks/use-form-state";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Roles } from "@/enums/roles";
import { Cities } from "@/enums/citites";
import { Services } from "@/enums/services";
import { signUpAction } from "./action";
import { track } from "@vercel/analytics/react";

export function SignUpForm() {
  const router = useRouter();
  const [phone, setPhone] = useState<string>("55");

  const formatPhoneNumber = (input: string): string => {
    // Remove any non-digit characters
    input = input.replace(/\D/g, "");
    // Ensure it starts with "55"
    if (!input.startsWith("55")) {
      input = "55" + input;
    }
    // Ensure total length is 13 characters
    // If the length is less than 4 (55 + 2 blank spaces), pad with spaces
    if (input.length < 4) {
      input = input.padEnd(4, " ");
    }
    // If the length is less than 13, pad with spaces
    if (input.length < 13) {
      input = input.padEnd(13, " ");
    }
    // Truncate to 13 characters if longer
    return input.slice(0, 13);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    service: "",
    phone: "5551",
    password: "",
    password_confirmation: "",
  });

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    async (data: FormData) => {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });

      // Call signUpAction and return its result
      const result = await signUpAction(form);
      if (result.success) {
        track(`${formData.name} se cadastrou`, {}, { flags: ["cadastro"] });
        router.push("/auth/sign-in");
      }
      return result;
    }
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Cadastro falhou!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}
        <div>
          <h1 className="text-center">Criar conta</h1>
          <div className="space-y-1">
            <Label htmlFor="name">Nome</Label>
            <Input
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />

            {errors?.name && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.name[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input
              name="email"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors?.email && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.email[0]}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="city">Cidade</Label>
            <Select
              name="city"
              value={formData.city}
              onValueChange={(value) => handleSelectChange("city", value)}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Selecione sua cidade" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Cities).map((city, index) => (
                  <SelectItem key={index} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="service">Serviço</Label>
            <Select
              name="service"
              value={formData.service}
              onValueChange={(value) => handleSelectChange("service", value)}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Selecione seu cargo" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Services).map((service, index) => (
                  <SelectItem key={index} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              name="phone"
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Senha</Label>
            <Input
              name="password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />

            {errors?.password && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.password[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password_confirmation">Confirme sua senha</Label>
            <Input
              name="password_confirmation"
              type="password"
              id="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
            />

            {errors?.password_confirmation && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.password_confirmation[0]}
              </p>
            )}
          </div>
        </div>
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Criar conta"
          )}
        </Button>

        <Button variant="link" className="w-full" size="sm" asChild>
          <Link href="/auth/sign-in">Já tem conta? faça login</Link>
        </Button>
      </form>
    </div>
  );
}
