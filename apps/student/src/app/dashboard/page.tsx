import { validateRequest } from "~/server/auth";

export default async function Page() {
  const session = await validateRequest();

  return (
    <div className="flex flex-1 flex-col gap-8 px-12 py-8">
      <div className="flex flex-col gap-1">
        <p className="text-muted-foreground">
          Good morning, @{session.user?.username}!
        </p>
        <p className="text-3xl font-semibold">Welcome to your portal</p>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="flex max-w-xl flex-col justify-center gap-4 rounded-lg border bg-card p-12 text-foreground">
          <h1 className="text-center text-2xl font-semibold tracking-tight">
            👋 Welcome to your portal
          </h1>
          <p>
            → Here, you can find information about, and enrol in, any of the
            courses we offer.
          </p>
          <p>
            → Once you have registered as a student, which happens automatically
            upon enrolling in your first course, you will be able to access and
            edit your student profile.
          </p>
          <p>→ You will also be able to see the courses you are enrolled in.</p>
          <p>
            → Use the navigation bar above to access the different features of
            your portal.
          </p>
        </div>
      </div>
    </div>
  );
}
