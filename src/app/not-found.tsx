import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6">
        <span className="font-display text-8xl font-black text-cyber-cyan opacity-20">
          404
        </span>
      </div>
      <h1 className="font-display text-3xl font-bold text-white mb-3">
        Segmentation Fault
      </h1>
      <p className="text-gray-400 font-mono text-sm mb-8 max-w-md">
        The page you&apos;re looking for has been paged out. It doesn&apos;t
        exist in any memory segment.
      </p>
      <Link href="/dashboard" className="btn-cyber-solid">
        Return to Command Center
      </Link>
    </div>
  );
}
