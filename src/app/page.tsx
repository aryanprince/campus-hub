import Link from "next/link";
import { redirect } from "next/navigation";
import { Footer } from "~/components/footer";

import { Button, buttonVariants } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-200 via-orange-200 to-zinc-200">
      {/* NAVBAR */}
      <div className="flex w-full items-center justify-between px-4 py-3">
        <h1 className="text-xl font-semibold">Student Portal</h1>
        <Link
          href="/auth/signin"
          className={`${buttonVariants()} rounded-full bg-blue-500 px-10 py-3 font-semibold text-white`}
        >
          Sign in
        </Link>
      </div>

      {/* MAIN CONTENT */}
      <div className="container flex flex-1 flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            Welcome to Student Portal
          </h1>
          <p className="mt-4 max-w-md text-balance text-center text-lg text-foreground">
            This is a place where you can find info and enrol in any of the
            courses we offer.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href={"/auth/signin"} className={buttonVariants()}>
              Sign up
            </Link>
            <Link
              href={"/"}
              className={buttonVariants({
                variant: "secondary",
                className: "bg-white/40 hover:bg-white/60",
              })}
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
