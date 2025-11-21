# Pre-Deployment Checklist

Before deploying to Render, make sure you've completed these steps:

## ✅ Code Preparation

- [x] All code changes committed to git
- [x] `.env` files are in `.gitignore`
- [x] `.env.example` files created for reference
- [x] `render.yaml` configuration file created
- [x] Frontend and backend working locally

## ✅ Files Created for Deployment

- [x] `render.yaml` - Automatic deployment configuration
- [x] `DEPLOYMENT_GUIDE.md` - Comprehensive deployment guide
- [x] `QUICK_DEPLOY.md` - Quick deployment reference
- [x] `README.md` - Project documentation
- [x] `.gitignore` - Properly configured
- [x] `.env.example` - Template for environment variables

## 📋 Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Add deployment configuration and documentation"
git push origin main
```

### 2. Deploy on Render

Go to https://dashboard.render.com and:

1. Click **"New"** → **"Blueprint"**
2. Connect to your GitHub repository: `https://github.com/daksh1821/Quick-Stay`
3. Render will detect `render.yaml`
4. Click **"Apply"**

### 3. Add Environment Variables

Render will create two services. Add the following environment variables:

#### Backend Service (quickstay-backend):

Copy your actual values from `server/.env` file. Add these environment variables in Render:

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

#### Frontend Service (quickstay-frontend):

**IMPORTANT:** First wait for the backend to deploy, then copy its URL.

```
VITE_BACKEND_URL=https://quickstay-backend.onrender.com
VITE_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
```

> **Note:** Replace `quickstay-backend.onrender.com` with your actual backend URL.

### 4. Wait for Deployment

- Both services will start deploying
- Backend typically takes 3-5 minutes
- Frontend takes 5-8 minutes
- Watch the deployment logs for any errors

### 5. Post-Deployment Configuration

#### Update Clerk Webhook:
1. Go to https://dashboard.clerk.com
2. Navigate to **Webhooks**
3. Update webhook URL to: `https://quickstay-backend.onrender.com/api/clerk`

#### Update Clerk Allowed Origins:
1. In Clerk Dashboard → **API Keys**
2. Scroll to **Allowed Origins**
3. Add: `https://quickstay-frontend.onrender.com`

### 6. Test Deployment

Visit your deployed frontend URL and test:

- [ ] Frontend loads correctly
- [ ] User can sign up/login
- [ ] User can become admin
- [ ] Admin can register hotel
- [ ] Admin can add rooms
- [ ] Rooms display on `/rooms` page
- [ ] User can view room details
- [ ] Booking and payment works
- [ ] Bookings show in admin dashboard

## 🔍 Troubleshooting

### If Backend Fails:
- Check Render logs for errors
- Verify all environment variables are set
- Ensure MongoDB allows connections from `0.0.0.0/0`
- Check that Cloudinary credentials are correct

### If Frontend Fails:
- Verify build command runs: `cd client && npm install && npm run build`
- Check that `VITE_BACKEND_URL` is set correctly
- Ensure rewrite rule is configured for SPA routing

### If Rooms Don't Display:
- Check browser console for errors
- Verify backend URL is accessible
- Test API endpoint directly: `https://quickstay-backend.onrender.com/api/rooms`
- Ensure rooms are created with `isAvailable: true`

## 📝 Important Notes

### Free Tier Limitations:
- Services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- 750 hours/month free per service

### To Keep Services Awake:
1. Upgrade to paid plan ($7/month per service)
2. Use UptimeRobot to ping backend every 14 minutes

### MongoDB Atlas:
- Ensure IP whitelist includes `0.0.0.0/0` for Render access
- Check connection string includes database name
- Verify cluster is running

## 🎉 Success!

Once deployed, your URLs will be:
- **Backend:** https://quickstay-backend.onrender.com
- **Frontend:** https://quickstay-frontend.onrender.com

Save these URLs for future reference!

## 📞 Support

If you encounter issues:
1. Check deployment logs in Render dashboard
2. Review error messages in browser console
3. Test API endpoints with Postman
4. Refer to `DEPLOYMENT_GUIDE.md` for detailed troubleshooting

---

**Ready to deploy?** Follow the steps above and your QuickStay platform will be live in ~15 minutes! 🚀
