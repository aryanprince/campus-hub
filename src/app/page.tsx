import Link from "next/link";
import { redirect } from "next/navigation";

import { buttonVariants } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {/* NAVBAR */}
      <div className="flex w-full items-center justify-between border-b border-border p-4">
        <h1 className="text-2xl font-bold">Student Portal</h1>
        <Link
          href="/auth/signin"
          className={`${buttonVariants()} rounded-full bg-blue-500 px-10 py-3 font-semibold text-white`}
        >
          Sign in
        </Link>
      </div>

      {/* MAIN CONTENT */}
      <div className="container flex flex-1 flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex flex-col items-center gap-2">Hello World</div>
      </div>

      {/* FOOTER */}
      <div className="pb-2 text-sm">
        <p>Made by Aryan.</p>
      </div>
    </main>
  );
}
