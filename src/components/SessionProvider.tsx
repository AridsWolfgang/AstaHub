"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { hydrateFromServer, markUnsynced } from "@/lib/store";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      hydrateFromServer().catch(() => markUnsynced());
    }
  }, [status]);

  return <>{children}</>;
}
