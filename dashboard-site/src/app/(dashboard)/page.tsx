import { api } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = auth()
  const getUserInfo = userId ? await api.user.getUserInfo({ clerkId: userId }) : null;
  return (
    <main>
      <h1>{getUserInfo?.firstName}</h1>
    </main>
  );
}
