import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    currency: 'USD',
    plans: [
      {
        name: 'Starter',
        credits: 10,
        price: 9.99,
        price_per_video: 0.99,
      },
      {
        name: 'Pro',
        credits: 50,
        price: 39.99,
        price_per_video: 0.79,
      },
      {
        name: 'Business',
        credits: 200,
        price: 99.99,
        price_per_video: 0.49,
      },
    ],
  })
}
