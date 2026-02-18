# PES EventHub 🎓

A modern, full-stack event management system for PES College clubs. This platform centralizes event registrations, replacing scattered Google Forms with a unified, role-based system.

![Tech Stack](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 👥 User Features
- ✅ Secure registration and login with JWT authentication
- 📅 Browse all upcoming college events
- 🔍 View detailed event information (date, time, venue, description)
- 📝 Register for events with one click
- 📋 View all registered events in one place
- ✉️ Instant registration confirmation

### 🔐 Admin Features
- 🛡️ Role-based access control
- ➕ Create, edit, and delete events
- 👀 View all registered students for each event
- 📊 Dashboard with event statistics
- 💾 Download registration lists as CSV
- 📈 Track total events and registrations

## 🚀 Tech Stack

### Backend
- **Node.js** + **Express.js** - RESTful API
- **MongoDB** + **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **json2csv** - CSV export

### Frontend
- **React 18** + **Vite** - Fast development
- **React Router** - Client-side routing
- **Tailwind CSS** - Modern styling
- **Axios** - HTTP client
- **Context API** - State management

## 📁 Project Structure

```
pes-eventhub/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Event.js              # Event schema
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   └── roleCheck.js          # Admin authorization
│   ├── routes/
│   │   ├── auth.js               # Auth endpoints
│   │   ├── events.js             # Event endpoints
│   │   └── admin.js              # Admin endpoints
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   └── adminController.js
│   ├── utils/
│   │   └── csvExport.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── EventCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── EventDetails.jsx
│   │   │   ├── MyEvents.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── CreateEvent.jsx
│   │   │   ├── EditEvent.jsx
│   │   │   └── EventRegistrations.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd pes-eventhub
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the following and update values:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pes-eventhub
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
NODE_ENV=development

# Start MongoDB (if running locally)
# On Windows:
net start MongoDB

# On macOS/Linux:
sudo systemctl start mongod

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000" > .env

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📡 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Event Routes (Public/User)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/events` | Get all upcoming events | No |
| GET | `/api/events/:id` | Get event details | No |
| POST | `/api/events/:id/register` | Register for event | Yes (User) |
| GET | `/api/events/my/registrations` | Get user's registered events | Yes (User) |

### Admin Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/admin/events` | Create event | Yes (Admin) |
| PUT | `/api/admin/events/:id` | Update event | Yes (Admin) |
| DELETE | `/api/admin/events/:id` | Delete event | Yes (Admin) |
| GET | `/api/admin/events/:id/registrations` | Get registrations | Yes (Admin) |
| GET | `/api/admin/events/:id/registrations/csv` | Download CSV | Yes (Admin) |
| GET | `/api/admin/dashboard/stats` | Get statistics | Yes (Admin) |

## 👤 Creating Admin Users

Since the first admin needs to be created manually, follow these steps:

### Option 1: Using MongoDB Shell
```javascript
// Connect to MongoDB
mongosh

// Switch to database
use pes-eventhub

// Update a user to admin
db.users.updateOne(
  { email: "admin@pes.edu" },
  { $set: { role: "admin" } }
)
```

### Option 2: Using MongoDB Compass
1. Open MongoDB Compass
2. Connect to your database
3. Navigate to `pes-eventhub` → `users` collection
4. Find the user you want to make admin
5. Edit the document and change `role` from `"user"` to `"admin"`
6. Save changes

## 🎨 UI/UX Features

- **Modern Design**: Clean, college-themed interface with PES branding
- **Responsive**: Works seamlessly on mobile, tablet, and desktop
- **Glassmorphism**: Frosted glass effects on navigation
- **Smooth Animations**: Fade-in effects and hover transitions
- **Color-Coded Badges**: Visual status indicators for events
- **Loading States**: Spinner animations during data fetching
- **Error Handling**: User-friendly error messages

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT-based authentication
- ✅ Protected API routes
- ✅ Role-based authorization
- ✅ HTTP-only token storage
- ✅ Input validation
- ✅ CORS configuration

## 🚀 Deployment

### Backend Deployment (Render/Railway)
1. Create a new web service
2. Connect your repository
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Connect your repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL=<your-backend-url>`
5. Deploy

### MongoDB Atlas Setup
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update `MONGODB_URI` in backend `.env`

## 📝 Usage Guide

### For Students
1. Register with your PES email and USN
2. Browse upcoming events on the home page
3. Click on an event to view details
4. Register for events before the deadline
5. View all your registered events in "My Events"

### For Admins
1. Login with admin credentials
2. Access the Admin Dashboard
3. Create new events with all details
4. Edit or delete existing events
5. View registration lists for each event
6. Download registration data as CSV

## 🔮 Future Enhancements

- [ ] QR code-based attendance tracking
- [ ] Email notifications for registrations
- [ ] Automated certificate generation
- [ ] Payment integration for paid events
- [ ] Advanced analytics dashboard
- [ ] Event categories and filtering
- [ ] Image uploads for events
- [ ] Calendar integration
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Built with ❤️ for PES College

---

**Note**: Make sure MongoDB is running before starting the backend server. Update the `.env` files with your actual configuration values before deployment.
