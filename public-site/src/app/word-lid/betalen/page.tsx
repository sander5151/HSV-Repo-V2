import { Suspense } from "react";
import BetalenPage from "./_components/BetalenPage";
import { currentUser } from "@clerk/nextjs/server";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

function BetalenPageFallback() {
    return <>placeholder</>
}

export default async function WordLidPublic() {
    const user = await currentUser()
    const profileComplete = await api.user.checkIfProfileComplete({ clerkId: user?.id ?? '' })


    return (
        <main className='w-full h-full'>
            <Suspense fallback={<BetalenPageFallback />}>
                <BetalenPage />
            </Suspense>

        </main>
    );
}
