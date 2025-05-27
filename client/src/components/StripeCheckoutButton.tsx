'use client';

import { stripePromise } from '@/lib/stripe';

export default function StripeCheckoutButton() {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stripe/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        items: [{ id: 'prod_123', quantity: 1 }] // Modify as per your item details
      }),
    });

    const session = await response.json();

    if (session.url) {
      stripe?.redirectToCheckout({ sessionId: session.id });
    }
  };

  return (
    <button
      className="bg-blue-500 text-white rounded px-4 py-2"
      onClick={handleCheckout}
    >
      Checkout
    </button>
  );
}
