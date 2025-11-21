# Next Steps - Deploy to Render

Your QuickStay application code is now on GitHub and ready for deployment! 🎉

**GitHub Repository:** https://github.com/daksh1821/Quick-Stay

## Quick Deploy (15 minutes)

### Step 1: Go to Render
Visit: https://dashboard.render.com/

### Step 2: Create Blueprint
1. Click **"New"** → **"Blueprint"**
2. Connect to your GitHub repository: `daksh1821/Quick-Stay`
3. Render will detect `render.yaml` automatically
4. Click **"Apply"**

### Step 3: Add Environment Variables

Render will create two services. You need to add environment variables to each:

#### For Backend Service (quickstay-backend):

Go to the backend service → Environment → Add environment variables.

**Copy these from your `server/.env` file:**
- `MONGODB_URI`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `CLERK_WEBHOOK_SECRET`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `SENDER_EMAIL`
- `SMTP_USER`
- `SMTP_PASS`

**Also add:**
- `NODE_ENV` = `production`

#### For Frontend Service (quickstay-frontend):

**IMPORTANT:** Wait for backend to fully deploy first!

Go to the frontend service → Environment → Add environment variables:

**Manual setup required:**
- `VITE_BACKEND_URL` = `https://your-backend-url.onrender.com` (copy from backend service URL)
- `VITE_CLERK_PUBLISHABLE_KEY` = (copy from your `client/.env` file)

After adding `VITE_BACKEND_URL`, trigger a manual redeploy of the frontend.

### Step 4: Wait for Deployment

- Backend typically deploys in 3-5 minutes
- Frontend deploys in 5-8 minutes
- Watch the logs for any errors

### Step 5: Update Clerk Webhook

Once backend is deployed:

1. Copy your backend URL (e.g., `https://quickstay-backend.onrender.com`)
2. Go to https://dashboard.clerk.com
3. Navigate to **Webhooks**
4. Update the webhook endpoint to: `https://quickstay-backend.onrender.com/api/clerk`

### Step 6: Test Your Deployment

Visit your frontend URL (e.g., `https://quickstay-frontend.onrender.com`)

Test checklist:
- [ ] Can sign in/register
- [ ] Can become admin
- [ ] Admin can register hotel
- [ ] Admin can add rooms
- [ ] Rooms display on /rooms page
- [ ] Can book and pay for rooms
- [ ] Bookings show in admin dashboard

## Important Notes

### Free Tier Info:
- Services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Both frontend and backend are on free tier

### MongoDB Atlas:
Make sure your MongoDB Atlas:
- Allows connections from all IPs (`0.0.0.0/0`)
- Cluster is running
- Connection string is correct

### If You Face Issues:

**Build errors:**
- Check Render build logs
- Verify all environment variables are set
- Ensure Node.js version compatibility

**Runtime errors:**
- Check Render service logs
- Verify MongoDB connection
- Ensure Clerk credentials are correct

**Rooms not showing:**
- Check browser console (F12)
- Verify backend API is accessible
- Test: `https://your-backend-url.onrender.com/api/rooms`

## Detailed Guides Available:

- **QUICK_DEPLOY.md** - Quick reference guide
- **DEPLOYMENT_GUIDE.md** - Comprehensive step-by-step guide
- **DEPLOYMENT_CHECKLIST.md** - Deployment checklist with troubleshooting
- **README.md** - Full project documentation

## Your URLs After Deployment:

Once deployed, save these URLs:

- **Backend:** `https://quickstay-backend.onrender.com`
- **Frontend:** `https://quickstay-frontend.onrender.com`

---

## Summary of What We Built:

✅ Role-based authentication (User vs Admin)
✅ Admin can register and manage multiple hotels
✅ Admin can add rooms to specific hotels
✅ Users can browse and filter rooms
✅ Each room displays complete hotel information
✅ Full booking and payment integration with Razorpay
✅ Admin dashboard with booking management
✅ Complete deployment configuration

**You're all set!** Follow the steps above and your QuickStay platform will be live in ~15 minutes! 🚀

Good luck with your deployment! 🎉
