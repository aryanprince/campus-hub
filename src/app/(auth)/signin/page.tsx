"use client";

import Image from "next/image";
import Link from "next/link";

import { ChevronLeft, Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default function SignIn() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-200 via-orange-200 to-zinc-200">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8",
        )}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center gap-2 text-center">
          <Image
            src="/logo.png"
            width={42}
            height={42}
            alt="Student Portal Logo"
          />
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm">Login with GitHub to enter your dashboard</p>
        </div>
        <Button variant={"default"} onClick={() => signIn("github")}>
          <Github size={18} className="mr-2" />
          Sign in with GitHub
        </Button>
      </div>
    </div>
  );
}
