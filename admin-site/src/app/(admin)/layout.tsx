import { redirect } from 'next/navigation';
import { ReactNode } from 'react'
import { auth } from '@clerk/nextjs/server';
import { api } from '@/trpc/server';

export default async function AdminLayout({
    children, // will be a page or nested layout
}: {
    children: ReactNode
}) {
    const { userId } = auth()
    const isUserAdmin = userId ? await api.user.isUserAdmin({ clerkId: userId }) : null;
    if (!isUserAdmin) {
        redirect("https://dashboard.sandervddussen.nl/")
    }

    return (
        <section>
            {children}
        </section>
    )
}