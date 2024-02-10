import Link from "next/link";
import { Badge } from "~/components/ui/badge";

export default function Graduation() {
  // TODO: Fetch graduation eligibility from the server, temporarily hardcoded
  const eligible = false;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col items-center justify-between">
        {/* PAGE TITLE */}
        <div className="flex w-full flex-col justify-start px-12 pt-6">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Graduation
          </h1>
          <p className="text-muted-foreground">Graduation Eligibility</p>
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-44 flex max-w-md flex-1 flex-col items-center justify-center gap-8">
          {eligible ? (
            <div className="flex flex-col gap-8 rounded-md border p-8">
              <div className="flex flex-col gap-6">
                <Badge className="w-fit bg-emerald-900 text-emerald-400">
                  Eligibility Success
                </Badge>
                <p>You are eligible to graduate. Congratulations!</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8 rounded-md border p-8">
              <div className="flex flex-col gap-6">
                <Badge className="w-fit bg-red-900 text-red-200">
                  Eligibility Failed
                </Badge>
                <div className="space-y-2">
                  <p>You are currently not eligible to graduate.</p>
                  <p>
                    Please pay all due fees from the{" "}
                    <Link
                      href={
                        process.env.NODE_ENV === "development"
                          ? "http://localhost:3003/"
                          : "https://campus-hub-finance.vercel.app/"
                      }
                      className="underline underline-offset-4"
                    >
                      Finance Portal
                    </Link>{" "}
                    to be eligible to graduate.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
