import Sidebar from "./sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-screen-xl">
      <div className="fixed hidden h-full w-[275px] flex-1 shrink-0 md:flex">
        <Sidebar />
      </div>
      <div className="flex h-screen flex-1 overflow-auto bg-background md:ml-[275px]">
        {children}
      </div>
    </div>
  );
}
