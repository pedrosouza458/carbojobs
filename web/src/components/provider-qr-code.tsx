"use client";

import { useRef } from "react";
import Image from "next/image";
import { useQRCode } from "next-qrcode";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
// leaving these here you know you can tweak stuff further
const options = {
  allowTaint: true,
  useCORS: true,
  backgroundColor: "rgba(0,0,0,0)",
  removeContainer: true,
};

export function ProviderQRCode({
  providerId,
  providerName,
  providerService,
}: any) {
  const { resolvedTheme } = useTheme();
  const cardRef = useRef<HTMLElement>(null);
  const { Canvas } = useQRCode();
  const prepareURL = async () => {
    const cardElement = cardRef.current;

    if (!cardElement) return;

    try {
      // lazy load this package
      const html2canvas = await import(
        /* webpackPrefetch: true */ "html2canvas"
      );

      const result = await html2canvas.default(cardElement, options);

      const asURL = result.toDataURL("image/jpeg");
      // as far as I know this is a quick and dirty solution
      const anchor = document.createElement("a");
      anchor.href = asURL;
      anchor.download = `${providerName}-qrcode.jpeg`;
      anchor.click();
      anchor.remove();
      // maybe this part should set state with `setURLData(asURL)`
      // and when that's set to something you show the download button
      // which has `href=URLData`, so that people can click on it
    } catch (reason) {
      console.log(reason);
    }
  };

  return (
    <div className="m-auto">
      <article ref={cardRef} className="">
        <h1 className="pb-4 bg-white dark:bg-black text-center font-semibold">
          Carbo<span className="text-green-500">Jobs</span>
        </h1>
  
          <Canvas
            text={`https://carbojobs.com/providers/${providerId}`}
            options={{
              errorCorrectionLevel: "M",
              margin: 3,
              scale: 1,
              width: 200,
              color: {
                dark: "#000000",
                light: "#FFFF",
              },
            }}
          />
  
      </article>
      <h1>https://carbojobs.vercel.app/providers/{providerId}</h1>
      <Button className=" w-full" onClick={prepareURL}>
        Baixar
      </Button>
    </div>
  );
}
