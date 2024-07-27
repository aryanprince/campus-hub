"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@campus-hub/ui/components/ui/button";
import { Input } from "@campus-hub/ui/components/ui/input";
import { Label } from "@campus-hub/ui/components/ui/label";

import { login } from "~/server/actions";

export default function LoginForm() {
  return (
    <form action={login} className="flex flex-col gap-8">
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
      <LoginButton />
    </form>
  );
}

const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {/* When button is not loading */}
      {!pending && (
        <>
          Log in
          <ArrowRight className="ml-2 size-4" />
        </>
      )}

      {/* When button is loading */}
      {!!pending && (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Logging in...
        </>
      )}
    </Button>
  );
};
