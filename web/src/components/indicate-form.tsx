'use client'

import { indicateProvider } from "@/http/indicate-provider";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog } from "./ui/dialog";

export function IndicateForm({ providerId }: any) {

  async function indicateClient() {
    try {
      const { message } = await indicateProvider(providerId);
      alert(message)
    } catch (error) {
      alert('Você já indicou esse prestador.')
      console.error("Error indicating provider:", error);
    }
  }

  return (
    <Dialog>
      <h1>Deseja indicar esse prestador?</h1>
      <Button onClick={indicateClient}>Indicar</Button>
    </Dialog>
  );
}