import Link from "next/link";
import { DesktopNavbar } from "~/components/desktop-navbar";
import { buttonVariants } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <div className="">
      <div className="flex justify-between border-b border-border px-4 py-3">
        <DesktopNavbar session={session} />
        {/* <Link className={buttonVariants()} href={"/api/auth/signout"}>
          Sign Out
        </Link> */}
      </div>
      <div>{children}</div>
    </div>
  );
}
