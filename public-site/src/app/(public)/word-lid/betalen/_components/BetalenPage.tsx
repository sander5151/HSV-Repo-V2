"use client"
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import CheckoutPage from "./CheckoutPage"
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@clerk/nextjs';
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error('Missing Stripe public key')
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function BetalenPage() {
    const searchParams = useSearchParams()
    const amount = Number(searchParams.get('bedrag')) ?? 5;
    const { isLoaded, userId, sessionId, getToken } = useAuth()

    return (
        <main className='w-full h-full'>
            <Elements
                stripe={stripePromise}
                options={{
                    mode: "payment",
                    amount: convertToSubcurrency(amount),
                    currency: "eur",
                }}>
                <CheckoutPage amount={amount} />
            </Elements>
        </main>
    );
}