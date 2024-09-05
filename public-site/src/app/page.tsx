import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();
  const { userId } = auth()
  const getUserInfo = userId ? await api.user.getUserInfo({ clerkId: userId }) : null;
  if (!getUserInfo) {
    redirect("https://public.sandervddussen.nl/word-lid/profiel")
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <UserButton />
      </main>
    </HydrateClient>
  );
}
