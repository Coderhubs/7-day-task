import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia' as const
});

// Helper function to handle CORS
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*', // In production, replace with your specific domain
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(req: Request) {
  try {
    const { amount, carName } = await req.json();

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // This will now use the dynamic amount passed from the frontend
      currency: 'usd',
      metadata: {
        carName: carName,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return response with CORS headers
    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      { headers: corsHeaders() }
    );
  } catch (err: any) {
    console.error('Error creating payment intent:', err);
    return NextResponse.json(
      { error: err.message },
      { status: 500, headers: corsHeaders() }
    );
  }
}