import LoginForm from "./login-form";

export default async function LoginPage() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <h1 className="text-3xl font-semibold">Login</h1>
      <LoginForm />
      {/* <p>or </p>
      <a
        href="/login/github"
        className="w-fit rounded-md bg-neutral-950 px-4 py-2 text-neutral-50"
      >
        Login with GitHub
      </a> */}
    </div>
  );
}
