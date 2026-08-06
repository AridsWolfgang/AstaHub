"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
  loading: () => null,
});

function runWhenIdle(cb: () => void) {
  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(cb, { timeout: 2000 });
  } else {
    setTimeout(cb, 1000);
  }
}

export default function LazyScene3D({
  className,
  interactive,
}: {
  className?: string;
  interactive?: boolean;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const start = () => runWhenIdle(() => !cancelled && setReady(true));
    const fallback = setTimeout(start, 3500);

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
      clearTimeout(fallback);
    };
  }, []);

  if (!ready) return null;

  return <Scene3D className={className} interactive={interactive} />;
}
