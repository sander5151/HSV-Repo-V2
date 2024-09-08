import { redirect } from 'next/navigation';
import { ReactNode } from 'react'
import { auth } from '@clerk/nextjs/server';
import { api } from '@/trpc/server';
import Sidebar from './_components/Sidebar';
import Navbar from './_components/Navbar';

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
        <div className='w-full h-full bg-neutral-200 flex p-4'>
            <div className='h-full w-20'>
                <Sidebar />
            </div>

            <div className='w-full  h-full flex flex-1 flex-col'>
                <div className='h-16 w-full'>
                    <Navbar />
                </div>

                <div className='w-full h-full rounded-2xl bg-white p-4'>
                    {children}
                </div>

            </div>

        </div>
    )
}