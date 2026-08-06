"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6">
        <span className="font-display text-8xl font-black text-cyber-red opacity-20">
          !
        </span>
      </div>
      <h1 className="font-display text-3xl font-bold text-white mb-3">
        Something went wrong
      </h1>
      <p className="text-gray-400 font-mono text-sm mb-8 max-w-md">
        An unexpected error occurred while rendering this page.
        <br />
        <code className="mt-2 block text-cyber-red text-[10px]">
          {error.message}
        </code>
      </p>
      <button onClick={reset} className="btn-cyber-solid">
        Try again
      </button>
    </div>
  );
}
