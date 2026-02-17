import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-brand-400">404</h1>
      <p className="mt-4 text-xl text-neutral-300">Page not found</p>
      <p className="mt-2 text-neutral-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
      >
        Back to Home
      </Link>
    </section>
  );
}
