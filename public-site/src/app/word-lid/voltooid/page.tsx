"use client"

import { api } from '@/trpc/react';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation'
import { use, useEffect } from 'react';

export default function page() {
    const searchParams = useSearchParams()
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
    const paymentIntent = searchParams.get('payment_intent');
    const { isLoaded, userId, sessionId, getToken } = useAuth()
    const updatePaymentCompleted = api.user.setpaymentCompleted.useMutation(
        {
            onSuccess: () => {
                console.log('payment completed')
            },
            onError: (error) => {
                console.error(error)
            }
        }
    )

    console.log(userId);

    useEffect(() => {
        updatePaymentCompleted.mutate({ clerkId: userId || '' })
    }, [])

    if (!paymentIntent) {
        redirect("/word-lid")
    }

    return (
        <div>
            <Link href="http://localhost:3001/">Ga naar dashboard</Link>
        </div>
    )
}
