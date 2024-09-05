import { api } from '@/trpc/server';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react'

export default async function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: ReactNode
}) {
    const { userId } = auth()
    if (!userId) {
        redirect("https://public.sandervddussen.nl/word-lid/aanmelden")
    }
    const getUserInfo = userId ? await api.user.getUserInfo({ clerkId: userId }) : null;
    if (!getUserInfo) {
        redirect("https://public.sandervddussen.nl/word-lid/profiel")
    }


    return (
        <section>
            {children}
        </section>
    )
}