import Image from "next/image";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { signup } from "~/server/actions";
import SignupForm from "./signup-form";

export default async function Page() {
  return (
    <>
      <div className="flex flex-col items-center gap-4 p-8">
        <div className="flex flex-col items-center gap-2 ">
          <Image
            src="/logo.png"
            width={42}
            height={42}
            alt="Student Portal Logo"
          />
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
            Create an account
          </h1>
          <p className="text-sm text-foreground">
            Sign up to start borrowing books.
          </p>
        </div>
        <SignupForm />
      </div>
    </>
  );
}
