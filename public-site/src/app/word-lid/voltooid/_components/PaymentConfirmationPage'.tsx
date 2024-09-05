"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStripe } from '@stripe/react-stripe-js';
import { api } from '@/trpc/react'; // Veronderstellend dat dit de locatie is waar je TRPC api wordt geëxporteerd

const PaymentConfirmationPage = ({ clerkId }: { clerkId: string }) => {
    const stripe = useStripe();
    const searchParams = useSearchParams(); // Haal de query parameters op
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Haal de nodige query parameters op uit de URL
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
    const paymentIntent = searchParams.get('payment_intent');

    // Gebruik TRPC mutation om betaling als voltooid te markeren
    const completePayment = api.user.setpaymentCompleted.useMutation({
        onSuccess: () => {
            console.log('Betaling voltooid');
        },
        onError: (error) => {
            console.error(error);
            setPaymentStatus('Fout bij het markeren van de betaling als voltooid.');
        },
    });

    useEffect(() => {
        const verifyPayment = async () => {
            if (!stripe || !paymentIntentClientSecret) {
                setLoading(false);
                return;
            }

            try {
                // Stripe API-aanroep om de betaling intent op te halen
                const { paymentIntent } = await stripe.retrievePaymentIntent(paymentIntentClientSecret as string);

                // Controleer de status van de betaling
                if (paymentIntent && paymentIntent.status === 'succeeded') {
                    setPaymentStatus('Betaling succesvol!');
                    // Roep de TRPC mutation aan om betaling als voltooid te markeren
                    completePayment.mutate({ clerkId });
                } else {
                    setPaymentStatus('Betaling niet geslaagd.');
                }
            } catch (error) {
                console.error('Fout bij het verifiëren van betaling:', error);
                setPaymentStatus('Er is een fout opgetreden bij het verifiëren van de betaling.');
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
    }, [stripe, paymentIntentClientSecret, completePayment]);

    if (loading) {
        return <div>Bezig met verificatie...</div>;
    }

    return (
        <div>
            {paymentStatus ? <h2>{paymentStatus}</h2> : <h2>Geen betaling informatie beschikbaar</h2>}
        </div>
    );
};

export default PaymentConfirmationPage;
