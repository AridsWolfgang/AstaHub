import { Navigate, useLocation } from "react-router-dom";
import { useSession } from "@/lib/auth-client";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const loc = useLocation();
  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-gray-500">
        Loading…
      </div>
    );
  }
  if (status !== "authenticated") {
    return <Navigate to={`/signin?callbackUrl=${encodeURIComponent(loc.pathname)}`} replace />;
  }
  return <>{children}</>;
}
