"use client";

import { SessionProvider as NextAuthSessionProvider } from "@/lib/auth-client";
import { SessionProvider as StoreHydrator } from "@/components/SessionProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider>
      <StoreHydrator>{children}</StoreHydrator>
    </NextAuthSessionProvider>
  );
}
