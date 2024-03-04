"use client";

import { useFormState, useFormStatus } from "react-dom";

import { login } from "~/server/actions";

const initialState = {
  error: "",
};

export default function LoginForm() {
  const [formState, formAction] = useFormState(login, initialState);

  return (
    <form action={formAction} className="mt-4 flex w-fit flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="username">Username</label>
        <input
          name="username"
          id="username"
          className="rounded-md border p-2"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="rounded-md border p-2"
        />
      </div>
      <p className="text-red-500">{formState?.error}</p>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="w-fit rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-300"
    >
      Continue
    </button>
  );
}
