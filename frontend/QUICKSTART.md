# Quick Start Guide

## For Ebenezer's Product Launch Demo

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Opens at: http://localhost:3000

### 3. Test the App Flow

#### Step 1: Home Page (/)
- View landing page with features
- Click "Sign Up" button

#### Step 2: Sign Up (/signup)
- Email: `test@example.com`
- Password: `password123`
- Confirm password
- Click "Sign Up"
- **Bonus:** Get 100 free credits automatically!

#### Step 3: Dashboard (/dashboard)
- See your account with 100 credits
- Upload a product image (JPG/PNG)
- Select an AI model from dropdown:
  - Cinematic Pro
  - Product Showcase
  - Dynamic Spin
- Select object position (center/left/right/top/bottom)
- Click "Generate Video (25 credits)"
- Watch loading spinner while video is "processing"
- See video preview appear (using placeholder)
- Download button available

#### Step 4: Pricing Page (/pricing)
- Click "Buy Credits" from dashboard
- See 3 pricing tiers:
  - $9.99 → 250 credits
  - $39.99 → 1,250 credits (popular)
  - $99.99 → 3,500 credits
- Click any tier to "purchase"
- Credits added to account instantly
- See FAQ with common questions

#### Step 5: Gallery (/gallery)
- Click "Gallery" from dashboard
- Browse sample videos (6 examples)
- Click any video to see modal with player
- Shows model used and duration

#### Step 6: Logout
- Click "Logout" button
- Redirected to home page
- Session cleared from localStorage

### 4. Test Features

**✅ Authentication**
- Try logging in with: test@example.com / password123
- Signup creates new user with 100 credits
- Logout clears session

**✅ Image Upload**
- Upload any JPG/PNG image
- See preview before generation
- Image data stored as data URL

**✅ Model Selection**
- Dropdown with 3 AI models
- All cost 25 credits per generation

**✅ Video Generation**
- Requires image + model selection
- Simulates API call to backend
- Shows status polling feedback
- Displays video when "complete"

**✅ Credit System**
- Balance shown in header
- Deducts 25 credits per video (not implemented yet, ready for backend)
- Can buy more credits via pricing page

**✅ Mobile Responsive**
- Dashboard: 2-column on desktop, 1-column on mobile
- Pricing: 3 cards responsive grid
- Gallery: 3-column grid responsive
- All buttons and inputs mobile-friendly

### 5. Backend Integration

The app is **ready to connect to your Python backend**:

**Current Setup:**
- API endpoint: `http://localhost:8000/api/v1`
- Uses simple fetch calls (no Axios, minimal dependencies)

**What Needs Backend:**
1. POST `/api/v1/generate` - Actually processes the video
2. GET `/api/v1/jobs/{job_id}` - Check processing status
3. Store job history (optional)

**What Works Without Backend:**
- All UI/UX flows
- Auth system (localStorage)
- Navigation
- Form validation
- Credit tracking
- Placeholder video preview

### 6. Environment Variables

Edit `.env.local` to change backend API:
```
NEXT_PUBLIC_API_URL=http://your-backend-url/api/v1
```

### 7. Production Build

```bash
npm run build
npm start
```

Then deploy to Vercel:
1. Push to GitHub
2. Connect repo to Vercel
3. Add env var: `NEXT_PUBLIC_API_URL`
4. Deploy!

### 8. Key Files to Know

- `src/app/page.tsx` - Home landing page
- `src/app/dashboard/page.tsx` - Main app (most complex)
- `src/lib/auth.ts` - User auth logic
- `src/lib/api.ts` - Backend API calls
- `tailwind.config.ts` - Styling config

### 9. Customization Ideas

**Easy wins:**
- Change colors in `globals.css` or Tailwind config
- Add company logo to header
- Update pricing tiers in pricing page
- Change credit costs
- Add more AI models to dashboard

**Medium effort:**
- Add payment processing (Stripe)
- Connect real auth (Firebase)
- Add more gallery samples
- User profile page
- Video history

### 10. Demo Script for Ebenezer

1. **"This is the home page"** → Show landing page, click signup
2. **"Sign up is simple"** → Email + password, get 100 free credits
3. **"Main dashboard"** → Upload image, select model, generate
4. **"See pricing"** → 3 tiers, buy credits with one click
5. **"Check gallery"** → Browse samples of AI-generated videos
6. **"All mobile responsive"** → Show on mobile/tablet
7. **"Ready for Vercel"** → Ready to go live immediately

---

**Questions?** Check README.md for full docs.
