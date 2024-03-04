export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-200 via-indigo-200 to-zinc-200 dark:from-zinc-950 dark:via-indigo-950 dark:to-zinc-950">
      {children}
    </div>
  );
}
