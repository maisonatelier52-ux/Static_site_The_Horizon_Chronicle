import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[65vh] w-[min(calc(100%-26px),1280px)] place-content-center justify-items-center text-center sm:w-[min(calc(100%-40px),1280px)]">
      <span className="font-serif text-[90px] leading-none text-brand-gold">404</span>
      <h1 className="my-[5px] font-serif text-4xl sm:text-[45px]">This page is beyond the horizon.</h1>
      <p className="text-muted">The address may have changed, or the story may no longer be available.</p>
      <div className="flex gap-2.5">
        <Link
          className="inline-flex min-h-[34px] items-center justify-center border border-brand-green bg-brand-green px-4 text-[11px] font-bold tracking-[.02em] text-cream transition-colors hover:bg-brand-green-2"
          href="/"
        >
          Return home
        </Link>
        <Link
          className="inline-flex min-h-[34px] items-center justify-center border border-brand-green bg-transparent px-4 text-[11px] font-bold tracking-[.02em] transition-colors hover:bg-brand-green hover:text-cream"
          href="/search"
        >
          Search stories
        </Link>
      </div>
    </main>
  );
}
