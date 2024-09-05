import { api } from '@/trpc/server';
import { auth } from '@clerk/nextjs/server';
import { ReactNode } from 'react'

export default async function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: ReactNode
}) {
    const { userId } = auth()
    const getUserInfo = userId ? await api.user.getUserInfo({ clerkId: userId }) : null;


    return (
        <section>
            {children}
        </section>
    )
}