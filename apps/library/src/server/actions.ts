"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateId, Scrypt } from "lucia";

import { db } from "~/server/db/index";
import { lucia } from "./auth";
import { user } from "./db/schema";

interface ActionResult {
  error: string;
}

export async function signup(formData: FormData): Promise<ActionResult> {
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

  await db.insert(user).values({
    id: userId,
    username: username,
    hashedPassword: hashedPassword,
  });

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
