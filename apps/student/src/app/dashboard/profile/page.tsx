import Link from "next/link";

import { PageTitle } from "~/components/page-title";

export default function Profile() {
  return (
    <div className="mx-8 my-4 flex flex-col gap-4">
      <PageTitle
        title="View Profile"
        description="View your current student profile."
      />

      <div>
        No profile found. Please create a profile{" "}
        <Link
          href="/dashboard/profile/create"
          className="underline underline-offset-4"
        >
          here
        </Link>
        .
      </div>
    </div>
  );
}
