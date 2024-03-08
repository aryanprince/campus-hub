"use client";

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
          <Input name="username" id="username" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" id="password" />
        </div>
      </div>
      <Button>Create account</Button>
    </form>
  );
};

export default SignupForm;
