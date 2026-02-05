# Deployment Guide

## Quick Deploy to Vercel (5 minutes)

Vercel is the **easiest way** to deploy a Next.js app.

### Step 1: Push to GitHub

```bash
cd saas-project/frontend

# Initialize git
git init
git add .
git commit -m "Initial AI Video SaaS frontend"

# Create repo on GitHub, then:
git branch -M main
git remote add origin https://github.com/yourusername/ai-video-saas-frontend.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Paste GitHub repo URL and import
5. Vercel auto-detects Next.js settings ✓

### Step 3: Environment Variables

In Vercel project settings:
1. Go to **Settings** → **Environment Variables**
2. Add:
   ```
   NEXT_PUBLIC_API_URL = https://your-backend-api.com/api/v1
   ```
   (Replace with your actual backend URL)

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for build
3. Get live URL: `https://your-project.vercel.app`

**Done!** Your app is live. 🎉

---

## Production Setup Checklist

- [ ] Backend API URL configured
- [ ] Auth system ready (or upgrade to Firebase)
- [ ] Payment processing tested (Stripe)
- [ ] Email notifications configured
- [ ] Error tracking (optional: Sentry)
- [ ] Analytics enabled (optional)
- [ ] Custom domain connected
- [ ] SSL certificate (auto with Vercel)

---

## Manual Build & Deploy

If you don't want to use Vercel:

### Build for Production

```bash
npm run build
npm start
```

Server runs on `http://localhost:3000`

### Deploy to Your Own Server

1. **Build:**
   ```bash
   npm run build
   ```

2. **Upload `.next/` folder to server**

3. **Install Node on server**

4. **Copy these files:**
   ```
   - .next/
   - public/
   - node_modules/
   - package.json
   - package-lock.json
   ```

5. **Run:**
   ```bash
   npm install
   npm start
   ```

6. **Use PM2 to keep it running:**
   ```bash
   npm install -g pm2
   pm2 start "npm start" --name "ai-video-saas"
   pm2 save
   pm2 startup
   ```

7. **Use Nginx as reverse proxy:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build & run:

```bash
docker build -t ai-video-saas .
docker run -p 3000:3000 ai-video-saas
```

---

## Environment Variables

### Development
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### Production
```bash
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1
```

---

## Monitoring & Maintenance

### Vercel Analytics
- Automatically enabled
- Dashboard shows traffic, errors, performance
- Free tier includes basic analytics

### Error Tracking (Optional)
Install Sentry:

```bash
npm install @sentry/nextjs
```

Add to `next.config.js`:
```javascript
const withSentry = require("@sentry/nextjs");

module.exports = withSentry({
  // your config...
});
```

### Performance Optimization

1. **Image Optimization**
   - Vercel CDN handles this automatically

2. **Code Splitting**
   - Next.js does this automatically

3. **Caching**
   - Vercel caches builds, static files

4. **Database Queries**
   - Add indexing when you add a database

---

## Scaling Considerations

### When Traffic Grows

1. **Database**: Add read replicas if needed
2. **API Server**: Horizontal scaling with load balancer
3. **CDN**: Vercel's Edge Network handles this
4. **Media Storage**: Use S3 for video storage
5. **Job Queue**: Add Redis for background jobs

---

## Troubleshooting

### Build fails with "Cannot find module"
```bash
npm install
npm run build
```

### Port already in use
```bash
# On macOS/Linux:
lsof -i :3000
kill -9 <PID>

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### CORS errors from backend API
Ensure backend has CORS headers:
```python
# Python/Flask example
from flask_cors import CORS
CORS(app)
```

### Environment variables not loading
- Make sure `.env.local` exists
- Restart dev server: `npm run dev`
- Vercel: Redeploy after adding env vars

---

## Pre-Launch Checklist

- [ ] All features tested locally
- [ ] Mobile responsive verified
- [ ] Backend API connected and tested
- [ ] Auth system works (signup/login/logout)
- [ ] Video generation tested
- [ ] Pricing page functional
- [ ] Error messages clear and helpful
- [ ] Loading states show while processing
- [ ] No console errors
- [ ] Performance acceptable (< 3s page load)
- [ ] SEO basics (meta tags, title, description)
- [ ] Privacy policy written
- [ ] Terms of service written

---

## After Launch

1. **Monitor errors** - Check Sentry/Vercel dashboard daily
2. **Track metrics** - User signups, video generations, credits
3. **Collect feedback** - Add feedback form or check support emails
4. **Update** - Fix bugs, add features based on feedback
5. **Security** - Keep dependencies updated: `npm update`

---

## Getting Help

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **React Docs**: https://react.dev

---

Ready to launch? 🚀
