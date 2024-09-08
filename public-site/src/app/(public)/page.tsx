import Link from "next/link";

import { api, HydrateClient } from "@/trpc/server";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { BoxReveal } from "@/components/magicui/box-reveal";


export default async function Home() {
  void api.post.getLatest.prefetch();



  return (
    <HydrateClient>
      <main className="h-full w-full flex items-center justify-center">
      </main>
    </HydrateClient>
  );
}

