# AI Video SaaS - Frontend

A Next.js 15 web application for generating product videos using AI.

## Features

✨ **Core Features:**
- User signup/login (simple localStorage-based auth for MVP)
- Product image upload with preview
- AI model selection (3 pre-built models)
- Video generation with backend API integration
- Real-time job status polling
- Generated video preview and download
- Credit/balance system
- Pricing page with 3 credit tiers ($9.99, $39.99, $99.99)
- Gallery of sample outputs
- Mobile responsive design

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Fetch API** - Backend API integration

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository
```bash
cd saas-project/frontend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and configure:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Global styles
│   ├── page.tsx            # Home page
│   ├── login/page.tsx      # Login page
│   ├── signup/page.tsx     # Signup page
│   ├── dashboard/page.tsx  # Main app (upload & generate)
│   ├── pricing/page.tsx    # Pricing page
│   └── gallery/page.tsx    # Sample gallery
├── lib/
│   ├── auth.ts             # Authentication logic
│   └── api.ts              # Backend API client
└── components/             # Reusable components (ready for expansion)
```

## Authentication

Uses simple localStorage-based auth for MVP. Users:
- Sign up with email/password (stored in localStorage)
- Get 100 free credits on signup
- Login persists across sessions
- Logout clears session

**Note:** This is for testing only. Upgrade to Firebase/Auth0 for production.

## API Integration

The app calls the Python backend at `{API_BASE_URL}/api/v1`:

### Generate Video
```
POST /api/v1/generate
Body: {
  product_image_url: string,
  model_type: string,
  position: string
}
Response: {
  job_id: string,
  status: string,
  video_url?: string
}
```

### Get Job Status
```
GET /api/v1/jobs/{job_id}
Response: {
  id: string,
  status: string,
  video_url?: string,
  created_at: string
}
```

## Deployment to Vercel

1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/ai-video-saas.git
git push -u origin main
```

2. Connect to Vercel
   - Go to [vercel.com](https://vercel.com)
   - Import project from GitHub
   - Add environment variables:
     - `NEXT_PUBLIC_API_URL` → Your backend API URL

3. Deploy
   - Click "Deploy"

## Building for Production

```bash
npm run build
npm start
```

## Features Implemented

✅ Home landing page with CTAs
✅ Signup/Login pages
✅ Dashboard with image upload
✅ Model selection dropdown
✅ Video generation with API calls
✅ Real-time job status polling
✅ Video preview and download
✅ Credit/balance display
✅ Pricing page (3 tiers)
✅ Sample gallery
✅ Mobile responsive design
✅ Error handling
✅ Loading states

## Future Enhancements

- [ ] Production auth (Firebase/Auth0)
- [ ] Payment processing (Stripe)
- [ ] User profile management
- [ ] Video history/favorites
- [ ] Advanced model customization
- [ ] Batch video generation
- [ ] Real-time notifications
- [ ] Team collaboration

## Credits System

- Users get 100 free credits on signup
- Each video generation costs 25 credits
- Can purchase credits:
  - $9.99 → 250 credits
  - $39.99 → 1,250 credits
  - $99.99 → 3,500 credits

## License

MIT
