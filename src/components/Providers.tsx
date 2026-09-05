import { AuthProvider } from "@/lib/auth-client";
import { SessionProvider as StoreHydrator } from "@/components/SessionProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <StoreHydrator>{children}</StoreHydrator>
    </AuthProvider>
  );
}
