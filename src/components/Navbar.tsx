import { Link } from "react-router-dom";
import { useSession, signOut } from "@/lib/auth-client";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";

export default function Navbar() {
  const { status } = useSession();
  const authed = status === "authenticated";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-white/[0.02] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo tagline="" taglineClassName="hidden lg:inline" />

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {authed ? (
            <button
              type="button"
              onClick={() => signOut()}
              className="btn !px-4 !py-2 text-sm"
            >
              Sign out
            </button>
          ) : (
            <Link to="/signin" className="btn-primary !px-4 !py-2 text-sm">
              Start free
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
