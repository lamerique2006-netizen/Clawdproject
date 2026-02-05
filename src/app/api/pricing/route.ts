import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Proxy to local Flask API
    const response = await fetch('http://localhost:5000/api/v1/pricing')
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching pricing:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pricing' },
      { status: 500 }
    )
  }
}
