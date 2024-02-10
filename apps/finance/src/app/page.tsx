import { ArrowRight } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "~/components/footer";
import { buttonVariants } from "~/components/ui/button";

export default async function Home() {
  noStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-200 via-emerald-200 to-zinc-200 dark:from-zinc-950 dark:via-emerald-950 dark:to-zinc-950">
      {/* NAVBAR */}
      <div className="flex w-full items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            width={32}
            height={32}
            alt="Finance Portal Logo"
          />
          <h1 className="text-xl font-semibold">Finance Portal</h1>
        </div>
        <Link href="/signin" className={`${buttonVariants()}`}>
          Sign in
        </Link>
      </div>

      {/* MAIN CONTENT */}
      <div className="container flex flex-1 flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            Welcome to Finance Portal
          </h1>
          <p className="mt-4 max-w-lg text-balance text-center text-lg text-foreground">
            Manage your student finances in one place. Pay your tuition and view
            any library fines from here.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href={"/pay"} className={buttonVariants()}>
              <ArrowRight className="mr-2 size-4" />
              Pay an invoice
            </Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className={`mb-4`}>
        <Footer />
      </div>
    </main>
  );
}
