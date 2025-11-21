# QuickStay Deployment Guide for Render

This guide will walk you through deploying both the frontend and backend of QuickStay on Render.

## Prerequisites

- GitHub account
- Render account (sign up at https://render.com)
- All your environment variables ready (from .env files)

## Step 1: Push Code to GitHub

1. **Initialize Git (if not already done):**
   ```bash
   cd /Users/dakshjain/Downloads/QuickStay-FullStack
   git add .
   git commit -m "Prepare for Render deployment"
   ```

2. **Create a new GitHub repository:**
   - Go to https://github.com/new
   - Name: `quickstay-fullstack` (or any name you prefer)
   - Make it Public or Private
   - Don't initialize with README (you already have code)

3. **Push your code:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/quickstay-fullstack.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy Backend on Render

### Method 1: Using render.yaml (Recommended - Deploys Both Services)

1. **Go to Render Dashboard:**
   - Visit https://dashboard.render.com/

2. **Create New Blueprint:**
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`
   - Click "Apply"

3. **Configure Environment Variables:**
   - Render will create both services (backend and frontend)
   - For `quickstay-backend`, copy values from your `server/.env` file and add:
     ```
     MONGODB_URI=<your_mongodb_uri>
     CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
     CLOUDINARY_API_KEY=<your_cloudinary_api_key>
     CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
     CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
     CLERK_SECRET_KEY=<your_clerk_secret_key>
     CLERK_WEBHOOK_SECRET=<your_clerk_webhook_secret>
     RAZORPAY_KEY_ID=<your_razorpay_key_id>
     RAZORPAY_KEY_SECRET=<your_razorpay_key_secret>
     SENDER_EMAIL=<your_email>
     SMTP_USER=<your_smtp_user>
     SMTP_PASS=<your_smtp_password>
     NODE_ENV=production
     ```

   - For `quickstay-frontend`, add:
     ```
     VITE_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
     ```
     (VITE_BACKEND_URL will be automatically set from backend service)

4. **Wait for Deployment:**
   - Backend will deploy first
   - Frontend will automatically use the backend URL
   - Takes about 5-10 minutes

### Method 2: Manual Deployment (Alternative)

If you prefer to deploy services individually:

#### Backend:

1. **New Web Service:**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** quickstay-backend
     - **Region:** Oregon (or closest to you)
     - **Branch:** main
     - **Root Directory:** Leave empty
     - **Runtime:** Node
     - **Build Command:** `cd server && npm install`
     - **Start Command:** `cd server && npm start`
     - **Plan:** Free

2. **Add Environment Variables** (same as above)

3. **Copy Backend URL:**
   - After deployment, copy the URL (e.g., `https://quickstay-backend.onrender.com`)

#### Frontend:

1. **New Static Site:**
   - Click "New" → "Static Site"
   - Connect your GitHub repository
   - Configure:
     - **Name:** quickstay-frontend
     - **Branch:** main
     - **Root Directory:** Leave empty
     - **Build Command:** `cd client && npm install && npm run build`
     - **Publish Directory:** `client/dist`

2. **Add Environment Variables:**
   ```
   VITE_CURRENCY=$
   VITE_BACKEND_URL=https://quickstay-backend.onrender.com
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_dGVhY2hpbmctcGlnZW9uLTU4LmNsZXJrLmFjY291bnRzLmRldiQ
   ```

3. **Add Rewrite Rule:**
   - In the "Redirects/Rewrites" section, add:
     - **Source:** `/*`
     - **Destination:** `/index.html`
     - **Action:** Rewrite

## Step 3: Configure Clerk Webhooks

1. **Update Clerk Webhook URL:**
   - Go to https://dashboard.clerk.com
   - Navigate to "Webhooks"
   - Update the webhook URL to: `https://quickstay-backend.onrender.com/api/clerk`

2. **Update Allowed Origins:**
   - In Clerk Dashboard → "JWT Templates"
   - Add your frontend URL: `https://quickstay-frontend.onrender.com`

## Step 4: Configure Razorpay (Optional)

If you want to update Razorpay settings:
1. Go to Razorpay Dashboard
2. Update webhook URL to: `https://quickstay-backend.onrender.com/api/razorpay/webhook`

## Step 5: Test Your Deployment

1. **Visit Frontend URL:** `https://quickstay-frontend.onrender.com`
2. **Test Features:**
   - User registration/login
   - Admin registration
   - Hotel registration
   - Room creation
   - Room booking
   - Payment flow

## Important Notes

### Free Tier Limitations:
- **Backend service sleeps after 15 minutes of inactivity**
- First request after sleep takes 30-60 seconds to wake up
- 750 hours/month free (shared across all free services)

### To Avoid Sleep:
1. Upgrade to paid plan ($7/month per service)
2. Or use a service like UptimeRobot to ping your backend every 14 minutes

### Custom Domain (Optional):
1. Go to your service settings
2. Click "Add Custom Domain"
3. Follow instructions to add DNS records

## Troubleshooting

### Build Failures:

**Backend fails to build:**
- Check if all dependencies are in `package.json`
- Verify MongoDB connection string is correct
- Check Render build logs for specific errors

**Frontend fails to build:**
- Ensure `VITE_BACKEND_URL` is set correctly
- Check if all environment variables are prefixed with `VITE_`
- Verify build command runs locally: `cd client && npm run build`

### Runtime Errors:

**Backend starts but crashes:**
- Check environment variables are set correctly
- Verify MongoDB connection string
- Look at Render logs for error messages

**Frontend builds but shows blank page:**
- Check browser console for errors
- Verify `VITE_BACKEND_URL` points to correct backend
- Ensure rewrite rule is configured for SPA routing

**CORS Errors:**
- Backend CORS is set to allow all origins by default
- If you restrict it, make sure frontend URL is allowed

**Clerk Authentication Issues:**
- Verify `CLERK_PUBLISHABLE_KEY` matches on both frontend and backend
- Check Clerk webhook URL is updated
- Ensure frontend URL is added to Clerk allowed origins

### Database Connection:

If MongoDB connection fails:
- Check if MongoDB Atlas allows connections from all IPs (0.0.0.0/0)
- Verify connection string includes database name
- Check MongoDB Atlas cluster is running

## Updating Your Deployment

When you make changes:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Automatic Deployment:**
   - Render automatically detects changes and redeploys
   - Watch the deployment logs in Render dashboard

## Environment Variables Reference

### Backend (.env):
```
PORT=4000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
SENDER_EMAIL=your_email@example.com
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
NODE_ENV=production
```

### Frontend (.env):
```
VITE_CURRENCY=$
VITE_BACKEND_URL=https://your-backend-url.onrender.com
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## Support

If you encounter issues:
1. Check Render logs (Logs tab in service dashboard)
2. Verify all environment variables are set
3. Test API endpoints directly using tools like Postman
4. Check browser console for frontend errors

## Success Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed and running
- [ ] Frontend deployed and running
- [ ] All environment variables configured
- [ ] Clerk webhooks updated
- [ ] Can access frontend URL
- [ ] Can sign in/register
- [ ] Can register as admin
- [ ] Can create hotels
- [ ] Can add rooms
- [ ] Rooms display on user-facing pages
- [ ] Booking and payment works

## Your Deployment URLs

After deployment, note your URLs here:

- **Backend:** https://quickstay-backend.onrender.com
- **Frontend:** https://quickstay-frontend.onrender.com

---

**Congratulations!** Your QuickStay application is now live on Render! 🎉
