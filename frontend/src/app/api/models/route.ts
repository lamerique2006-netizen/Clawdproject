import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    models: [
      {
        id: 'fashion_female_1',
        name: 'Elegant Female Model',
        description: 'Professional fashion model, studio lighting',
      },
      {
        id: 'fashion_male_1',
        name: 'Professional Male Model',
        description: 'Business casual, confident pose',
      },
      {
        id: 'lifestyle_casual',
        name: 'Casual Lifestyle',
        description: 'Relaxed, everyday setting',
      },
    ],
  })
}
