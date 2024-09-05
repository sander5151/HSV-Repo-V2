import { api } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = auth()
  const getUserInfo = userId ? await api.user.getUserInfo({ clerkId: userId }) : null;
  if (!getUserInfo) {
    redirect("https://public.sandervddussen.nl/word-lid/profiel")
  }
  console.log(getUserInfo);

  return (
    <main>
      <h1>{getUserInfo?.firstName}</h1>
    </main>
  );
}
