import Link from "next/link";

export function Footer() {
  return (
    <div className="pb-2 text-sm">
      <p>
        <Link
          href="https://github.com/aryanprince"
          className="underline underline-offset-4"
        >
          Aryan
        </Link>
      </p>
    </div>
  );
}
