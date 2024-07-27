import Link from "next/link";

import { Button } from "@campus-hub/ui/components/ui/button";

export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/test/about">About</Link>
      <Button>Click me</Button>
    </div>
  );
}
