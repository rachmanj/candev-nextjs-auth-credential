import Link from "next/link";
import { getServerSession } from "next-auth";

import User from "@/components/User";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1 className="text-4xl">HOME</h1>
      <Link href="/admin" className={buttonVariants()}>
        Open my admin
      </Link>

      <h2>Client Session</h2>
      <User />
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
