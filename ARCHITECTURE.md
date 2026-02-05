# Frontend Architecture

## Overview

Clean Next.js 15 App Router architecture with:
- File-based routing (pages in `src/app/`)
- Client-side state with React hooks
- Simple localStorage for auth (MVP)
- Fetch API for backend calls
- Tailwind CSS for styling
- TypeScript for type safety

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)             # Future: auth routes group
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Main app - upload & generate
│   │   ├── pricing/
│   │   │   └── page.tsx        # Buy credits page
│   │   ├── gallery/
│   │   │   └── page.tsx        # Sample videos
│   │   ├── layout.tsx          # Root layout wrapper
│   │   ├── page.tsx            # Home landing page
│   │   └── globals.css         # Global styles
│   │
│   └── lib/                    # Utilities & helpers
│       ├── auth.ts             # localStorage auth
│       └── api.ts              # Backend API client
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── vercel.json
├── .env.local                  # Local env (git ignored)
├── .env.example                # Template
├── .gitignore
├── README.md
├── QUICKSTART.md               # Testing guide
└── ARCHITECTURE.md             # This file

```

## Page Structure

### Home (`src/app/page.tsx`)
- Landing page with features
- Login/Signup CTAs
- Redirects logged-in users to `/dashboard`

### Auth Routes
- **`/login`** - Simple email/password form
- **`/signup`** - Create account, get 100 free credits

### Dashboard (`src/app/dashboard/page.tsx`)
Core app features:
- Image upload with preview
- AI model selector (dropdown)
- Position selector (5 options)
- Generate button
- Video preview & download
- Job status polling
- Credit balance display
- Navigation to pricing/gallery/logout

### Pricing (`src/app/pricing/page.tsx`)
- 3 credit tiers ($9.99, $39.99, $99.99)
- Purchase simulation (adds credits)
- FAQ section
- Plan comparison

### Gallery (`src/app/gallery/page.tsx`)
- 6 sample videos
- Click to play in modal
- Shows model used
- Stats (10K+ videos, 98% satisfaction)

## State Management

**No Redux/Zustand** - Using React hooks + localStorage:

```typescript
// Example: User state in component
const [user, setUser] = useState<User | null>(null)

useEffect(() => {
  const currentUser = getCurrentUser()
  setUser(currentUser)
}, [])
```

**Auth functions** (in `src/lib/auth.ts`):
- `signup(email, password)` - Create account
- `login(email, password)` - Login
- `logout()` - Clear session
- `getCurrentUser()` - Get current user
- `addCredits(userId, amount)` - Add credits
- `subtractCredits(userId, amount)` - Spend credits

## API Integration

**Backend URL** from env:
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'
```

**Functions in `src/lib/api.ts`**:

1. **`generateVideo(request)`**
   - POST to `/api/v1/generate`
   - Body: `{ product_image_url, model_type, position }`
   - Returns: `{ job_id, status, video_url? }`

2. **`getJobStatus(jobId)`**
   - GET `/api/v1/jobs/{jobId}`
   - Returns: `{ id, status, video_url?, created_at }`

3. **`pollJobStatus(jobId)`**
   - Helper: Polls until job completes
   - Max 120 attempts, 1s delay between attempts
   - Returns final status or throws timeout

## Styling

**Tailwind CSS** only - no component libraries:
- Utility classes for all styles
- Custom config in `tailwind.config.ts`
- Global styles in `src/app/globals.css`
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`

## Authentication Flow

```
1. User on home page
2. Click "Sign Up"
3. Fill form → submit
4. signup() function:
   - Store user in localStorage
   - Set current user
   - Return user object
5. Redirect to /dashboard
6. useEffect checks getCurrentUser()
7. User logged in!
```

**Logout:**
```
1. Click logout button
2. logout() clears localStorage
3. Redirect to home page
4. User must login again
```

## Video Generation Flow

```
1. User uploads image
   → Read file as data URL
   → Show preview

2. Select model + position

3. Click "Generate Video"
   → Disable button
   → Call generateVideo() API
   → Get job_id

4. Poll job status
   → Check every 1 second
   → Max 2 minutes

5. Job completed
   → Get video_url
   → Display video player
   → Show download button

6. User can:
   → Download video
   → Create another
```

## Error Handling

Each function catches errors:
```typescript
try {
  const user = login(email, password)
  if (user) {
    // Success
  } else {
    setError('Invalid credentials')
  }
} catch (err) {
  setError('An error occurred')
}
```

## Client-Side Validation

- Email format
- Password length (>= 6 chars)
- Password confirmation match
- Image upload required
- Credit balance check

## Mobile Responsiveness

- No fixed widths, use Tailwind responsive classes
- Dashboard grid: `grid md:grid-cols-2` (1 col on mobile)
- Pricing grid: `grid md:grid-cols-3`
- Gallery grid: `grid md:grid-cols-3`
- Touch-friendly button sizes (py-2, py-3)
- Proper spacing on mobile

## Performance Optimizations

1. **No unnecessary re-renders**
   - useEffect with proper dependencies
   - Memoization where needed

2. **Fast page loads**
   - No heavy libraries
   - Minimal bundle size

3. **Image handling**
   - FileReader API (client-side)
   - Data URL for preview
   - Efficient file upload

4. **API calls**
   - Simple fetch (no Axios)
   - Proper error handling
   - Job polling with backoff

## Deployment

**Vercel (recommended):**
1. Connect GitHub repo
2. Add env var: `NEXT_PUBLIC_API_URL`
3. Deploy (auto on push to main)

**Self-hosted:**
```bash
npm run build
npm start
```

Runs on port 3000 by default.

## Future Improvements

### Backend Integration
- Real payment processing (Stripe)
- Proper authentication (Firebase/Auth0)
- Database for user/job history
- Actual video processing

### Frontend Enhancements
- User profile page
- Video history/downloads
- Advanced model settings
- Batch processing
- Real-time notifications (WebSocket)
- Search/filter gallery

### Infrastructure
- CDN for media
- Image compression
- Video caching
- Analytics (Vercel/Mixpanel)
- Error tracking (Sentry)

## Key Dependencies

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "^15.0.0"
  },
  "devDependencies": {
    "typescript": "^5",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

Minimal dependencies = faster builds, smaller bundle, fewer security concerns.

## Testing

No test framework included (MVP). For future:
- Jest for unit tests
- React Testing Library for components
- Playwright for E2E tests

## Security Notes

⚠️ **MVP Auth:** localStorage is client-side only. Not secure for production.

For production:
- Use secure session storage
- Implement CSRF protection
- Use HTTPS only
- Add rate limiting
- Validate all inputs on backend

---

Questions? Read README.md or QUICKSTART.md
