import { redirect } from "next/navigation";
import { DesktopNavbar } from "~/components/desktop-navbar";
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
    <div className="flex flex-col">
      <div className="flex justify-between border-b border-border px-4 py-3">
        <DesktopNavbar session={session} />
      </div>
      <div>{children}</div>
    </div>
  );
}
