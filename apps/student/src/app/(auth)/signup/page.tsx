import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";

import { Button } from "@campus-hub/ui/components/ui/button";
import { Separator } from "@campus-hub/ui/components/ui/separator";

import SignupForm from "./signup-form";

export default async function Page() {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <Image src="/logo.png" width={42} height={42} alt={"Logo"} />
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            Create an account
          </h1>
          <Link href="/login" className="text-muted-foreground">
            Already have an account?{" "}
            <span className="text-blue-500 underline underline-offset-4">
              Sign in
            </span>
          </Link>
        </div>
      </div>

      <div className="w-full">
        <SignupForm />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex min-w-full items-center gap-2">
          <Separator orientation="horizontal" className="shrink" />
          <p className="shrink-0 text-xs uppercase text-muted-foreground">
            or continue with
          </p>
          <Separator orientation="horizontal" className="shrink" />
        </div>
        <Button className="w-full" variant={"secondary"}>
          <Github className="mr-2 size-5" />
          GitHub
        </Button>
      </div>
    </>
  );
}
