# Quick Deploy to Render - TL;DR

## 1. Push to GitHub (5 minutes)

```bash
cd /Users/dakshjain/Downloads/QuickStay-FullStack
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/quickstay.git
git push -u origin main
```

## 2. Deploy on Render (10 minutes)

### Using render.yaml (Easiest):

1. Go to https://dashboard.render.com
2. Click **"New"** → **"Blueprint"**
3. Connect your GitHub repo
4. Render detects `render.yaml` automatically
5. Click **"Apply"**

### Add Environment Variables:

Copy values from your `server/.env` and `client/.env` files.

**For Backend (quickstay-backend):**
```
MONGODB_URI=<your_value>
CLOUDINARY_CLOUD_NAME=<your_value>
CLOUDINARY_API_KEY=<your_value>
CLOUDINARY_API_SECRET=<your_value>
CLERK_PUBLISHABLE_KEY=<your_value>
CLERK_SECRET_KEY=<your_value>
CLERK_WEBHOOK_SECRET=<your_value>
RAZORPAY_KEY_ID=<your_value>
RAZORPAY_KEY_SECRET=<your_value>
SENDER_EMAIL=<your_value>
SMTP_USER=<your_value>
SMTP_PASS=<your_value>
NODE_ENV=production
```

**For Frontend (quickstay-frontend):**
```
VITE_CLERK_PUBLISHABLE_KEY=<your_value>
```

## 3. Update Clerk Webhook (2 minutes)

1. Go to https://dashboard.clerk.com
2. Navigate to **Webhooks**
3. Update URL to: `https://quickstay-backend.onrender.com/api/clerk`

## 4. Done! 🎉

Your app will be live at:
- **Backend:** https://quickstay-backend.onrender.com
- **Frontend:** https://quickstay-frontend.onrender.com

---

**Note:** First deployment takes 5-10 minutes. Free tier sleeps after 15 min inactivity.

For detailed instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
