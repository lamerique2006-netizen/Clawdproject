import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BrainAI - AI Video Creator',
  description: 'Transform your product images into stunning AI-generated videos in seconds. Premium AI video generation for e-commerce.',
  keywords: 'AI video, product videos, video generation, e-commerce',
  authors: [{ name: 'BrainAI Team' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-dark-bg text-white">{children}</body>
    </html>
  )
}
