import Link from "next/link";

export function Footer() {
  return (
    <div className="my-4 flex w-full items-center justify-center text-sm">
      <p>
        Built by{" "}
        <Link
          href="https://github.com/aryanprince"
          className="underline underline-offset-4"
        >
          @aryanprince
        </Link>
        . Using Next.js, React, Tailwind CSS, TypeScript. Hosted on Vercel.
      </p>
    </div>
  );
}
