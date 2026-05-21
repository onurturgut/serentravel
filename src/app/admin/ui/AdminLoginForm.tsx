"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      setError(data.error || "Giris yapilamadi.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-navy-deep px-5 py-12 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center">
        <form
          onSubmit={onSubmit}
          className="w-full rounded-lg border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold text-navy-deep">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="mt-6 font-display text-4xl">Admin Panel</h1>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            Icerik yonetimi icin admin sifrenizle giris yapin.
          </p>

          <label className="mt-8 block text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Sifre
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-3 h-12 w-full rounded-lg border border-white/10 bg-white/10 px-4 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-gold"
            placeholder="Admin sifresi"
            autoFocus
          />

          {error && (
            <div className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 h-12 w-full rounded-full bg-gold text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Giris yapiliyor..." : "Giris Yap"}
          </button>
        </form>
      </div>
    </main>
  );
}
