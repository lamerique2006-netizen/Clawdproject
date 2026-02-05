import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { product_image_url, model_type = 'fashion_female_1' } = body

    if (!product_image_url) {
      return NextResponse.json(
        { error: 'product_image_url required' },
        { status: 400 }
      )
    }

    console.log(`🎨 Generating AI model (${model_type})...`)

    // Proxy to local Flask API
    const response = await fetch('http://localhost:5000/api/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_image_url,
        model_type,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json(
      { error: error.message || 'Generation failed' },
      { status: 500 }
    )
  }
}
