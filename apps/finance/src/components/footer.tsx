import Link from "next/link";

export function Footer() {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-2 p-2 text-sm md:flex-row md:gap-1">
      <p>
        Built by{" "}
        <Link
          href="https://github.com/aryanprince"
          className="underline underline-offset-4"
        >
          @aryanprince
        </Link>
        .
      </p>
      <p>Using Next.js, React, Tailwind CSS, TypeScript. Hosted on Vercel.</p>
    </div>
  );
}
