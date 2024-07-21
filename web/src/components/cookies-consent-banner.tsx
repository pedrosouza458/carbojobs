"use client";

import { useEffect, useState } from "react";

export function cookieConsentGiven() {
  const consent = localStorage.getItem("cookie_consent");
  return consent ? consent : "undecided";
}

export function Banner() {
  const [consentGiven, setConsentGiven] = useState("");

  useEffect(() => {
    // We want this to only run once the client loads
    // or else it causes a hydration error
    setConsentGiven(cookieConsentGiven());
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookie_consent", "yes");
    setConsentGiven("yes");
  };

  const handleDeclineCookies = () => {
    localStorage.setItem("cookie_consent", "no");
    setConsentGiven("no");
  };
  return (
    consentGiven === "undecided" && (
      <div className="w-full py-4 bg-[#FF3D6D] text-white text-sm font-semibold">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-center">
            Essa aplicação utiliza cookies para armazenar dados, aceite o
            consentimento.
          </p>
          <div>
          <button
            type="button"
            onClick={handleAcceptCookies}
          >
            Aceitar
          </button>
          <button
            type="button"
            onClick={handleDeclineCookies}
            className="ml-4"
          >
            Recusar
          </button>
          </div>
    
        </div>
      </div>
    )
  );
}
