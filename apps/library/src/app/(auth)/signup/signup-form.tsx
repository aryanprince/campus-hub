"use client";

import { Loader2 } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@campus-hub/ui/button";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { signup } from "~/server/actions";

export default function SignupForm() {
  const [formState, formAction] = useFormState(signup, null);

  return (
    <form
      action={formAction}
      className="mt-4 flex w-[275px] flex-col items-center gap-4"
    >
      <div className="flex w-full flex-col gap-2">
        <Label htmlFor="username">Username</Label>
        <Input type="text" name="username" id="username" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" id="password" />
      </div>
      {formState && <p className="text-sm text-red-500">{formState.error}</p>}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" className="mt-4 w-full">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Sign up
    </Button>
  );
}
