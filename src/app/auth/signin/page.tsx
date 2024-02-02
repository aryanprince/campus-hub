"use client";

import Link from "next/link";

import { ChevronLeft, Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8",
        )}
      >
        <>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center gap-2 text-center">
          {/* <Image src="/logo.png" width={40} height={40} alt="UniTrack Logo" /> */}
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Login with GitHub to enter your dashboard
          </p>
        </div>
        <Button
          variant={"secondary"}
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
        >
          <Github size={18} className="mr-2" />
          Sign in with GitHub
        </Button>
      </div>
    </div>
  );
}
