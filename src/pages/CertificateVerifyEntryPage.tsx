import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { parseCertificateId } from "@/lib/certificate";

/**
 * Public entry to verification — paste a certificate code.
 * No account needed; this page is the shop window for credentials.
 */
export default function CertificateVerifyEntryPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseCertificateId(code);
    if (!parsed.ok) {
      setError(parsed.error);
      return;
    }
    navigate(`/certificates/${encodeURIComponent(parsed.id)}/verify`);
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:py-24">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500">
        AstaHub · Certificate verification
      </p>
      <h1 className="mt-5 text-center font-serif text-4xl leading-tight tracking-tight text-white sm:text-5xl">
        Check a credential.
      </h1>
      <p className="mx-auto mt-5 max-w-md text-center text-base leading-relaxed text-gray-400">
        Every AstaHub certificate carries a code. Paste it below to confirm
        it&apos;s genuine — no account needed.
      </p>

      <form onSubmit={submit} className="mt-10">
        <label
          htmlFor="cert-code"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500"
        >
          Certificate code
        </label>
        <input
          id="cert-code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError(null);
          }}
          placeholder="paste the code here"
          autoComplete="off"
          spellCheck={false}
          className="input mt-3 !py-3 text-center font-mono"
        />
        {error && <p className="mt-3 text-center text-sm text-red-400">{error}</p>}
        <button type="submit" className="btn-primary mt-5 w-full !py-3 text-base">
          Verify
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Finishing a track earns one of these.{" "}
        <Link to="/tracks" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
          Start your first day
        </Link>
        .
      </p>
    </div>
  );
}
