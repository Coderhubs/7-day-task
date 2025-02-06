import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formData, carDetails, totalAmount } = body;

    // Create a new rental record in Sanity
    const rental = await client.create({
      _type: "rental",
      car: {
        _type: "reference",
        _ref: carDetails._id
      },
      customer: formData.billingInfo,
      reservation: formData.reservation,
      paymentDetails: {
        method: formData.paymentMethod,
        amount: totalAmount,
        status: "pending"
      },
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true, rental });
  } catch (error) {
    console.error("Payment processing error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process payment" },
      { status: 500 }
    );
  }
} 