import Image from "next/image";
import { redirect } from "next/navigation";

import { validateRequest } from "~/server/auth";
import SignupForm from "./signup-form";

export default async function SignupPage() {
  const { session } = await validateRequest();

  if (session) {
    return redirect("/dashboard/books");
  }

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
        {/* <SignupFormUpdated /> */}
      </div>
    </>
  );
}
