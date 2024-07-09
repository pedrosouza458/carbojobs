"use client";

import { useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

export function TutorialText() {
  const [step, setStep] = useState(0);
  return (
    <DialogHeader>
      {step === 0 && (
        <>
          Escolha qual tutorial deseja:
          <div className="">
            <Button variant="ghost" onClick={() => setStep(1)}>
              Cliente
            </Button>
            <Button variant="ghost" onClick={() => setStep(2)}>
              Prestador
            </Button>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <h1>Cliente</h1>
        </>
      )}

      {step === 2 && (
        <div className="text-base space-y-2 text-muted-foreground">
          <h1 className="text-primary text-lg">Prestador</h1>
          <p>
            Após se cadastrar, siga esse tutorial:
          </p>
          <h2 className="text-primary">Etapas:</h2>
          <p>
            1 - Adicione uma foto de perfil clicando no seu ícone no canto superior direito e em
            <span className="font-semibold"> perfil</span>
          </p>
          <p>
            2 - Adicionar seus horários na aba
            <span className="font-semibold"> Horários</span>
          </p>
          <p>
            3 - Criar seus trabalhos na aba
            <span className="font-semibold"> Trabalhos</span>
          </p>
          <p>
            4 - Na aba{" "}
            <span className="font-semibold"> perfil</span> clique
            em    <span className="font-semibold"> Visualizar seu perfil</span> e compartilhe seu qrcode em
            <span className="font-semibold"> compartilhar perfil</span>
          </p>
          <h2 className="text-primary">Opcional:</h2>
          <p>
            5 - Se desejar, coloque links para suas redes sociais na aba
            <span className="font-semibold"> Links</span>
          </p>
        </div>
      )}
    </DialogHeader>
  );
}
