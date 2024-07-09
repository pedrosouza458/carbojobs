import { CookiesProvider } from "next-client-cookies/server";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CookiesProvider>
      <div className="flex min-h-screen justify-center px-4">
        <div className="w-full max-w-xs">{children}</div>
      </div>
    </CookiesProvider>
  );
}
