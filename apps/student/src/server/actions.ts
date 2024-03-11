"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { generateId, Scrypt } from "lucia";
import { z } from "zod";

import { lucia, validateRequest } from "~/server/auth";
import { db } from "~/server/db";
import { student, user } from "./db/schema";

interface ActionResult {
  error: string;
}

export async function signup(formData: FormData) {
  // Zod schema for signup form data validation
  const signupSchema = z.object({
    username: z.string(),
    password: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
  });

  // Parsing and validating form data with zod schema
  const parsedData = signupSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
  });

  // If zod schema validation fails, log error and return
  if (!parsedData.success) {
    console.error("Error during zod schema validation!");
  } else {
    const hashedPassword = await new Scrypt().hash(parsedData.data.password);
    const userId = generateId(15);

    // Creates a new user and student in a single SQL transaction (to ensure data integrity)
    // TODO: check if username is already used
    await db.transaction(async (tx) => {
      await tx.insert(user).values({
        id: userId,
        username: parsedData.data.username,
        hashedPassword: hashedPassword,
      });
      await tx.insert(student).values({
        studentNumber: generateId(10),
        firstName: parsedData.data.firstName,
        lastName: parsedData.data.lastName,
        studentEmail: parsedData.data.email,
        userId: userId,
      });
    });

    // Setting session cookies
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    // Redirecting to dashboard after successful signup
    return redirect("/dashboard");
  }
}

export async function login(formData: FormData): Promise<ActionResult> {
  const username = formData.get("username");
  if (typeof username !== "string") {
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (typeof password !== "string") {
    return {
      error: "Invalid password",
    };
  }

  const existingUser = await db.query.user.findFirst({
    where: eq(user.username, username.toLowerCase()),
  });

  console.log("existingUser 👉", existingUser);

  if (!existingUser?.hashedPassword) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid usernames from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid usernames.
    // However, valid usernames can be already be revealed with the signup page among other methods.
    // It will also be much more resource intensive.
    // Since protecting against this is none-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
    // If usernames are public, you may outright tell the user that the username is invalid.
    return {
      error: "Incorrect username or password",
    };
  }

  const validPassword = await new Scrypt().verify(
    existingUser.hashedPassword,
    password,
  );

  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/dashboard");
}

export async function logout(): Promise<ActionResult> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}
