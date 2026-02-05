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

    const apiToken = process.env.REPLICATE_API_TOKEN
    if (!apiToken) {
      return NextResponse.json(
        { error: 'REPLICATE_API_TOKEN not configured' },
        { status: 500 }
      )
    }

    console.log(`🎨 Generating AI model (${model_type})...`)

    // Call Replicate API directly
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'black-forest-labs/flux-schnell',
        input: {
          prompt: 'professional fashion model, elegant pose, studio lighting, white background, full body shot',
          num_outputs: 1,
          aspect_ratio: '9:16',
          output_format: 'png',
          output_quality: 90,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.detail || 'Generation failed' },
        { status: response.status }
      )
    }

    return NextResponse.json({
      status: 'success',
      job_id: `job_${Date.now()}`,
      model_url: data.output ? data.output[0] : null,
      product_url: product_image_url,
      message: 'Video generation started',
    })
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json(
      { error: error.message || 'Generation failed' },
      { status: 500 }
    )
  }
}
