import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6">
        <span className="font-display text-8xl font-black text-cyber-cyan opacity-20">
          404
        </span>
      </div>
      <h1 className="font-display text-3xl font-bold text-white mb-3">
        Page not found
      </h1>
      <p className="text-gray-400 font-mono text-sm mb-2 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <p className="text-gray-500 font-mono text-xs mb-8 max-w-md">
        Try searching the <Link to="/tracks" className="underline hover:text-white">tracks</Link> or <Link to="/curriculum" className="underline hover:text-white">curriculum</Link>.
      </p>
      <div className="flex gap-3">
        <Link to="/" className="btn-primary !px-6">
          Home
        </Link>
        <Link to="/dashboard" className="rounded-lg border border-white/10 px-6 py-2 text-sm text-gray-400 hover:text-white">
          Dashboard
        </Link>
      </div>
    </div>
  );
}
