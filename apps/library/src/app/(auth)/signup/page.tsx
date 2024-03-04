import { signup } from "~/server/actions";

export default async function Page() {
  return (
    <>
      <div className="flex flex-col gap-4 p-8">
        <h1 className="text-3xl font-semibold">Sign up</h1>
        <form action={signup} className="mt-4 flex w-fit flex-col gap-4">
          {/* <div className="flex flex-col gap-2">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="rounded-md border p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="rounded-md border p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="studentEmail">Student Email</label>
            <input
              type="email"
              name="studentEmail"
              id="studentEmail"
              className="rounded-md border p-2"
            />
          </div> */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
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
          <button
            type="submit"
            className="w-fit rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 active:bg-blue-700"
          >
            Sign up
          </button>
        </form>
        {/* <p>or </p>
        <a
          href="/login/github"
          className="w-fit rounded-md bg-neutral-950 px-4 py-2 text-neutral-50"
        >
          Sign up with GitHub
        </a> */}
      </div>
    </>
  );
}
