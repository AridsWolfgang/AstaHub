import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, BadgeCheck, Loader2, ShieldX } from "lucide-react";
import Logo from "@/components/Logo";
import { parseCertificateId } from "@/lib/certificate";

interface Verified {
  certificate: {
    id: string;
    track: string;
    title: string;
    day: number;
    xp: number;
    issuedAt: string;
  };
  earner: { name: string };
}

const TRACK_LABEL: Record<string, string> = {
  c: "C / Assembly",
  python: "Python",
  cpp: "C++",
  js: "JavaScript / TypeScript",
  sql: "SQL & Databases",
  bash: "Bash / Linux / Git",
};

export default function CertificateVerifyPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Verified | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const parsed = parseCertificateId(id);
    if (!parsed.ok) {
      setError(parsed.error);
      setLoading(false);
      return;
    }
    fetch(`/api/certificates/${encodeURIComponent(parsed.id)}/verify`, { cache: "no-store" })
      .then(async (res) => {
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(body.error ?? "Verification is temporarily unavailable. Try again shortly.");
          return;
        }
        setData(body);
      })
      .catch(() => setError("Verification is temporarily unavailable. Try again shortly."))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:py-24">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500">
        AstaHub · Certificate verification
      </p>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : error || !data ? (
        <div className="mt-10 text-center">
          <ShieldX className="mx-auto h-10 w-10 text-gray-600" strokeWidth={1.5} />
          <h1 className="mt-6 font-serif text-3xl leading-tight text-white sm:text-4xl">
            We can&apos;t confirm this one.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-gray-400">
            {error ?? "No certificate exists with this code."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/certificates/verify" className="btn text-base">
              Try another code
            </Link>
            <Link to="/tracks" className="btn-primary text-base">
              Earn a real one
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.04] to-transparent p-8 text-center sm:p-12">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-gray-400">
            <BadgeCheck className="h-4 w-4 text-success" />
            Verified · genuine AstaHub credential
          </p>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500">
            Presented to
          </p>
          <p className="mt-2 font-serif text-4xl tracking-tight text-white sm:text-5xl">
            {data.earner.name}
          </p>
          <p className="mx-auto mt-6 max-w-md font-serif text-xl italic leading-relaxed text-gray-300">
            {data.certificate.title}
          </p>
          <p className="mt-4 text-sm text-gray-400">
            {TRACK_LABEL[data.certificate.track] ?? data.certificate.track} ·
            all {data.certificate.day} days · {data.certificate.xp} XP earned
          </p>
          <p className="mt-2 font-mono text-[11px] text-gray-500">
            Issued {new Date(data.certificate.issuedAt).toLocaleDateString()} ·
            code {data.certificate.id}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 border-t border-white/5 pt-8">
            <Link to="/signin" className="btn-primary text-base">
              Start your own — free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/tracks" className="btn text-base">
              See the paths
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
