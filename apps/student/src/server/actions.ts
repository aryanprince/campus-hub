"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateId, Scrypt } from "lucia";

import { lucia } from "~/server/auth";
import { db } from "~/server/db/index";
import { user } from "./db/schema";

interface ActionResult {
  error: string;
}

export async function signup(formData: FormData): Promise<ActionResult> {
  const username = formData.get("username");
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
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

  const hashedPassword = await new Scrypt().hash(password);
  const userId = generateId(15);

  // TODO: check if username is already used
  await db.insert(user).values({
    id: userId,
    username,
    hashedPassword,
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/dashboard");
}
