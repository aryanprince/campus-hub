"use client";

import { useState } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateId, Scrypt } from "lucia";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { lucia } from "~/server/auth";
import { db } from "~/server/db/index";
import { user } from "~/server/db/schema/main-schema";

const formSchema = z.object({
  username: z.string().min(8, "Username too short").max(50),
  password: z.string().min(8, "Password too short").max(100),
});

export type FormFields = z.infer<typeof formSchema>;

export default function SignupFormUpdated() {
  const [errors, setErrors] = useState("");

  // 1. Define your form.
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   console.log(values);
  // }

  // const [formState, formAction] = useFormState(signup, null);

  async function handleFormAction(data: FormFields) {
    const { error } = await signup(data);
    if (error) {
      setErrors(error);
    }
    console.log(error);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => handleFormAction(data))}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              {errors && <FormMessage>{errors}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Sign up
    </Button>
  );
}

interface ActionResult {
  error: string;
}

/**
 * Creates a user, and then sets a new cookie for the user.
 * @returns An error message, if any
 */
export async function signup(
  formData: FormFields,
  _initialState?: unknown,
): Promise<ActionResult> {
  "use server";
  console.log("Signing up...");

  const username = formData.username;
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
  // if (
  //   typeof username !== "string" ||
  //   username.length < 3 ||
  //   username.length > 31 ||
  //   !/^[a-z0-9_-]+$/.test(username)
  // ) {
  //   return {
  //     error: "Invalid username",
  //   };
  // }
  const password = formData.password;
  // if (
  //   typeof password !== "string" ||
  //   password.length < 6 ||
  //   password.length > 255
  // ) {
  //   return {
  //     error: "Invalid password",
  //   };
  // }

  const hashedPassword = await new Scrypt().hash(password);
  const userId = generateId(15);

  // TODO: check if username is already used

  try {
    await db.insert(user).values({
      id: userId,
      username: username,
      hashedPassword: hashedPassword,
    });
  } catch (e) {
    console.log("Error adding to DB, user already exists...", e);
    return {
      error: "User already exists",
    };
  }

  console.log("Added to DB...");

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  console.log("Finished signing up...");

  return redirect("/protected");
}
