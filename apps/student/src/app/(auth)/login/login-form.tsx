"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
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
      <Button>
        Log in
        <ArrowRight className="ml-2 size-4" />
      </Button>
    </form>
  );
}
