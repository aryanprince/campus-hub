"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { signup } from "~/server/actions";

const SignupForm = () => {
  return (
    <form action={signup} className="flex flex-col gap-8">
      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input name="username" id="username" placeholder="johndoe69" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="∙∙∙∙∙∙∙∙"
            className="text-lg"
          />
        </div>
      </div>
      <SignupButton />
    </form>
  );
};

const SignupButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {/* When button is not loading */}
      {!pending && (
        <>
          Sign up
          <ArrowRight className="ml-2 size-4" />
        </>
      )}

      {/* When button is loading */}
      {!!pending && (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Signing up...
        </>
      )}
    </Button>
  );
};

export default SignupForm;
