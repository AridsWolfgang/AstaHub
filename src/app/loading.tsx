export default function Loading() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-ping rounded-full border-2 border-cyber-cyan opacity-20" />
          <div className="absolute inset-2 animate-spin rounded-full border-t-2 border-cyber-cyan" />
          <div className="absolute inset-4 animate-pulse rounded-full bg-cyber-cyan/10" />
        </div>
        <p className="font-mono text-sm text-gray-500 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
