import { redirect } from "next/navigation";

import { logout } from "~/server/actions";
import { validateRequest } from "~/server/auth";

export default async function ProtectedPage() {
  const { session, user } = await validateRequest();

  if (!session || !user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-4 p-8">
      <h1 className="text-3xl font-semibold">Protected Page</h1>
      <div className="w-fit rounded-md border border-neutral-200 px-12 py-6">
        <h2 className="text-xl font-medium">Session Details</h2>
        <p>ID: {session?.id}</p>
        <p>User ID: {session?.userId}</p>
      </div>
      <div className="w-fit rounded-md border border-neutral-200 px-12 py-6">
        <h2 className="text-xl font-medium">User Details</h2>
        <p>ID: {user?.id}</p>
        <p>Username: {user?.username}</p>
      </div>
      <form action={logout}>
        <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
          Sign out
        </button>
      </form>
    </div>
  );
}
