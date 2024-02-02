import { getServerAuthSession } from "~/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();
  const userFirstName = session?.user.name?.split(" ")[0];

  return (
    <div className="space-y-4 px-12 py-8">
      <div className="flex flex-col gap-4 rounded-lg bg-zinc-50 p-4">
        <p className="text-2xl font-semibold">👋 Hello, {userFirstName}!</p>
        <p>Welcome to your portal.</p>
        <p>
          Here, you can find information about, and enrol in, any of the courses
          we offer.
        </p>
        <p>
          Once you have registered as a student, which happens automatically
          upon enrolling in your first course, you will be able to access and
          edit your student profile.
        </p>
        <p>You will also be able to see the courses you are enrolled in.</p>
        <p>
          Use the navigation bar above to access the different features of your
          portal.
        </p>
      </div>

      <p>{session ? "You are signed in" : "You are signed out"}</p>
    </div>
  );
}
