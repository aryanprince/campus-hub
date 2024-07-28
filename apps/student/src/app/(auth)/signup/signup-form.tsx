"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@campus-hub/ui/components/ui/button";
import { Input } from "@campus-hub/ui/components/ui/input";
import { Label } from "@campus-hub/ui/components/ui/label";

export const SignupForm = () => {
  const { pending } = useFormStatus();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="space-y-1 md:flex-1">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              name="firstName"
              id="firstName"
              placeholder="John"
              required
              disabled={pending}
            />
          </div>
          <div className="space-y-1 md:flex-1">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              name="lastName"
              id="lastName"
              placeholder="Doe"
              required
              disabled={pending}
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input
            name="username"
            id="username"
            placeholder="johndoe69"
            required
            disabled={pending}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="realjohndoe@gmail.com"
            required
            disabled={pending}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="∙∙∙∙∙∙∙∙"
            className="text-lg"
            required
            disabled={pending}
          />
        </div>
      </div>

      <Button className="w-full" type="submit" disabled={pending}>
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
    </div>
  );
};
