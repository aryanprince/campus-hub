import { validateRequest } from "~/server/auth";
import DesktopSidebar from "./sidebar-desktop";
import MobileSidebar from "./sidebar-mobile";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  return (
    <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col md:flex-row">
      <div className="fixed hidden h-full w-[275px] flex-1 shrink-0 md:flex">
        <DesktopSidebar session={session} />
      </div>
      <div className="md:hidden">
        <MobileSidebar />
      </div>
      <div className="flex h-screen flex-1 overflow-auto bg-background md:ml-[275px]">
        {children}
      </div>
    </div>
  );
}
