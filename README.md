# QuickStay - Hotel Booking Platform

A full-stack hotel booking platform built with MERN stack, featuring role-based authentication, payment integration, and real-time booking management.

## Features

### For Users:
- Browse available hotel rooms
- Filter by location, price, room type, and amenities
- View detailed room information with image galleries
- Book rooms with date selection
- Secure payment integration with Razorpay
- View booking history
- Authentication with Clerk

### For Admins (Hotel Owners):
- Separate admin dashboard
- Register and manage multiple hotels
- Add rooms to specific hotels
- Upload room images via Cloudinary
- Toggle room availability
- View all bookings and revenue
- Track pending payments

## Tech Stack

### Frontend:
- **React 19** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API requests
- **Clerk** for authentication
- **React Hot Toast** for notifications

### Backend:
- **Node.js** with Express
- **MongoDB** with Mongoose
- **Clerk** for user management
- **Cloudinary** for image storage
- **Razorpay** for payment processing
- **Multer** for file uploads
- **Nodemailer** for email notifications

## Project Structure

```
QuickStay-FullStack/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context (AppContext)
│   │   ├── assets/        # Images and static files
│   │   └── App.jsx        # Main app component
│   ├── .env.example       # Frontend environment variables template
│   └── package.json
│
├── server/                # Backend Node.js application
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── configs/          # Configuration files
│   ├── .env.example      # Backend environment variables template
│   └── server.js         # Main server file
│
├── render.yaml           # Render deployment configuration
├── DEPLOYMENT_GUIDE.md   # Detailed deployment instructions
├── QUICK_DEPLOY.md       # Quick deployment guide
└── README.md             # This file
```

## Local Development Setup

### Prerequisites:
- Node.js (v18+)
- MongoDB Atlas account
- Clerk account
- Cloudinary account
- Razorpay account

### 1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/quickstay.git
cd quickstay
```

### 2. Setup Backend:

```bash
cd server
npm install
```

Create `.env` file in `server/` directory:
```env
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
```

Start backend:
```bash
npm run server
```

### 3. Setup Frontend:

```bash
cd client
npm install
```

Create `.env` file in `client/` directory:
```env
VITE_CURRENCY=$
VITE_BACKEND_URL=http://localhost:4000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Start frontend:
```bash
npm run dev
```

### 4. Access the application:
- Frontend: http://localhost:5173
- Backend: http://localhost:4000

## Deployment

### Deploy to Render:

See detailed instructions in:
- [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - Quick 15-minute deployment
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Comprehensive guide with troubleshooting

**Quick Steps:**
1. Push code to GitHub
2. Create Render Blueprint from `render.yaml`
3. Add environment variables
4. Update Clerk webhooks
5. Done!

## Database Schema

### User Model:
- Clerk user ID (primary)
- Role (user/admin)
- Recent searched cities
- Timestamps

### Hotel Model:
- Name, City, Address
- Contact information
- Images
- Owner reference (User)
- Timestamps

### Room Model:
- Hotel reference
- Room type (Single, Double, Suite, etc.)
- Price per night
- Amenities array
- Images array
- Availability status
- Timestamps

### Booking Model:
- User reference
- Room reference
- Check-in/Check-out dates
- Guest count
- Total amount
- Payment status
- Razorpay payment/order IDs
- Timestamps

## API Endpoints

### User Routes (`/api/user`):
- `GET /` - Get user profile
- `POST /register-as-admin` - Register as admin

### Hotel Routes (`/api/hotels`):
- `POST /` - Register new hotel (Admin only)
- `GET /my-hotels` - Get all hotels by admin (Admin only)

### Room Routes (`/api/rooms`):
- `GET /` - Get all available rooms
- `POST /` - Create new room (Admin only)
- `GET /owner` - Get admin's rooms (Admin only)
- `POST /toggle-availability` - Toggle room availability (Admin only)

### Booking Routes (`/api/bookings`):
- `POST /verify-payment` - Verify Razorpay payment
- `POST /` - Create new booking
- `GET /my-bookings` - Get user's bookings
- `GET /hotel` - Get hotel's bookings (Admin only)

## Environment Variables

### Backend (Required):
```
PORT=4000
MONGODB_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
CLERK_SECRET_KEY=your_clerk_secret
CLERK_WEBHOOK_SECRET=your_webhook_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
SENDER_EMAIL=your_email
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
```

### Frontend (Required):
```
VITE_CURRENCY=$
VITE_BACKEND_URL=http://localhost:4000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
```

## Features Walkthrough

### 1. User Registration & Login:
- Powered by Clerk
- Email/password or social login
- Automatic user profile creation

### 2. Admin Registration:
- Users can become admins
- Access to admin dashboard
- Manage multiple hotels

### 3. Hotel Management:
- Admins register hotels with details
- Upload hotel images
- View all registered hotels

### 4. Room Management:
- Add rooms to specific hotels
- Upload multiple room images
- Set pricing and amenities
- Toggle availability

### 5. Browsing & Filtering:
- Users browse all available rooms
- Filter by city, price, type, amenities
- View hotel details with each room

### 6. Booking & Payment:
- Select dates and guest count
- Razorpay payment integration
- Automatic booking creation
- Email confirmations

### 7. Dashboard & Analytics:
- Admin sees booking statistics
- Revenue tracking
- Booking management
- Pending payment monitoring

## Security Features

- Clerk authentication middleware
- JWT token validation
- Role-based access control (RBAC)
- Razorpay signature verification
- Environment variable protection
- CORS configuration
- Input validation

## Known Limitations

- Free tier on Render sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- No cancellation functionality yet
- No refund processing
- Single currency support

## Future Enhancements

- [ ] Booking cancellation
- [ ] Refund processing
- [ ] Multi-currency support
- [ ] Advanced search filters
- [ ] Room reviews and ratings
- [ ] Email notifications
- [ ] Admin analytics dashboard
- [ ] Mobile app

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
- Create an issue on GitHub
- Contact: daksh2872004@gmail.com

## Acknowledgments

- Clerk for authentication
- Cloudinary for image storage
- Razorpay for payment processing
- MongoDB Atlas for database hosting
- Render for deployment

---

**Built with ❤️ by Daksh Jain**
