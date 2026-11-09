import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-gutter flex min-h-svh flex-col justify-end bg-ink pb-16">
      <p className="eyebrow text-mist">Error 404 — Frame not found</p>
      <h1 className="display-xl mt-6 uppercase">
        Out of <em>focus.</em>
      </h1>
      <div className="mt-10 border-t border-line pt-6">
        <Link href="/" className="link-underline pb-0.5 text-sm">
          Return to the homepage
        </Link>
      </div>
    </main>
  );
}
