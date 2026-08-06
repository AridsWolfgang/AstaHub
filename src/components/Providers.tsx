"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { SessionProvider as StoreHydrator } from "@/components/SessionProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider>
      <StoreHydrator>{children}</StoreHydrator>
    </NextAuthSessionProvider>
  );
}
