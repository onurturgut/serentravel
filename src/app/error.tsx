"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Bir şeyler ters gitti</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sayfayı yenilemeyi deneyin.
        </p>
        <button
          onClick={() => reset()}
          className="mt-6 inline-flex h-11 items-center rounded-full bg-navy px-5 text-sm text-white"
        >
          Tekrar dene
        </button>
      </div>
    </div>
  );
}
