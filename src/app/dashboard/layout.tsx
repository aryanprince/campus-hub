import { redirect } from "next/navigation";
import { DesktopNavbar } from "~/components/desktop-navbar";
import { Footer } from "~/components/footer";
import { ThemeToggle } from "~/components/theme-toggle";
import { getServerAuthSession } from "~/server/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className="flex justify-between border-b border-border px-4 py-3">
        <DesktopNavbar session={session} />
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
      <div className="flex items-center justify-center border-t border-border">
        <Footer />
        <div className="mr-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
