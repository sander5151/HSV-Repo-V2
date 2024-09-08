import { api } from '@/trpc/server';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react'
import Navbar from './_components/navbar';

export default async function PublicLayout({
    children, // will be a page or nested layout
}: {
    children: ReactNode
}) {
    const { userId } = auth()
    const getUserInfo = userId ? api.user.getUserInfo({ clerkId: userId }) : null

    return (
        <section className='w-full h-full flex flex-col'>
            <Navbar isLoggedIn={getUserInfo !== null} />
            {children}
        </section>
    )
}