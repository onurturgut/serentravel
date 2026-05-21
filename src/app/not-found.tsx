import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl">404</h1>
        <p className="mt-3 text-muted-foreground">
          Aradığınız sayfa bulunamadı.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center rounded-full bg-navy px-5 text-sm text-white"
        >
          Anasayfaya dön
        </Link>
      </div>
    </div>
  );
}
