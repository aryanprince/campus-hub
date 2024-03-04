"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { generateId, Scrypt } from "lucia";

import { lucia, validateRequest } from "~/server/auth";
import { db } from "~/server/db/index";
import { user } from "./db/schema/main-schema";

interface ActionResult {
  error: string;
}

/**
 * Creates a user, and then sets a new cookie for the user.
 * @returns An error message, if any
 */
export async function signup(
  _initialState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  console.log("Signing up...");

  const username = formData.get("username");
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

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

/**
 * Logs in a user by setting a new randomly generated cookie
 * @returns An error message, if any
 */
export async function login(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  "use server";
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
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
  return redirect("/protected");
}

/**
 * Logs out a user by removing any cookies set by Lucia auth
 * @returns An error message, if any
 */
export async function logout(): Promise<ActionResult> {
  "use server";
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
  return redirect("/login");
}
