import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import SignupForm from "./signup-form";

export default async function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex max-w-sm flex-col gap-8">
        <div className="flex flex-col items-center gap-4">
          <Image src="/logo.png" width={42} height={42} alt={"Logo"} />
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-3xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-muted-foreground">
              Enter a username to create your account
            </p>
          </div>
        </div>
        <div className="w-full">
          <SignupForm />
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-1 items-center gap-2">
            <Separator orientation="horizontal" className="w-[70px]" />
            <p className="shrink-0 text-xs uppercase text-muted-foreground">
              or continue with
            </p>
            <Separator orientation="horizontal" className="w-[70px]" />
          </div>
          <Button className="w-full" variant={"secondary"}>
            <Github className="mr-2 size-5" />
            GitHub
          </Button>
        </div>
        <div className="flex justify-center">
          <Link href="/login" className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <span className="underline underline-offset-4">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
