import { PageTitle } from "~/components/page-title";
import { CreateProfileForm } from "./create-profile-form";

export default function Profile() {
  return (
    <div className="mx-8 my-4 flex flex-col gap-4">
      <PageTitle
        title="Create Profile"
        description="Create a new student profile."
      />

      <div className="w-full max-w-xs">
        <CreateProfileForm />
      </div>
    </div>
  );
}
