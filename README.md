# TaskFlow - Full-Stack Task Management App

A modern, full-stack task management application built with React, Node.js, Express, and MongoDB. Features JWT authentication, real-time CRUD operations, and a beautiful Kanban-style interface.

## 🚀 Features

- **User Authentication** - Secure JWT-based registration and login
- **Task Management** - Full CRUD operations for tasks
- **Kanban Board** - Organize tasks by status (To Do, In Progress, Done)
- **Search & Filter** - Find tasks quickly with real-time search
- **Status Cycling** - Click task badges to cycle through statuses  
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Modern UI** - Built with TailwindCSS for a clean, professional look

## 📋 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **TailwindCSS** - Styling (modern @tailwindcss/vite plugin)
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb://localhost:27017/napd_db
JWT_SECRET=your_super_secret_key_change_this_in_production
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

The backend will run on http://localhost:5000

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on http://localhost:5173

## 📖 Usage

### 1. Register a New Account
- Navigate to http://localhost:5173
- Click "Register" 
- Fill in your name, email, and password
- Submit the form

### 2. Login
- Use your email and password to log in
- You'll be redirected to the dashboard

### 3. Create Tasks
- Click the "+ New Task" button
- Enter title, description (optional), and status
- Click "Create Task"

### 4. Manage Tasks
- **Edit**: Click the "Edit" button on any task
- **Delete**: Click the "Delete" button  
- **Change Status**: Click the status badge to cycle through statuses
- **Search**: Use the search bar to filter tasks by title or description
- **Filter**: Use the dropdown to filter by status

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Profile
- `GET /api/profile` - Get user profile (protected)
- `PUT /api/profile` - Update user profile (protected)

### Tasks
- `POST /api/tasks` - Create task (protected)
- `GET /api/tasks` - Get all tasks for user (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

### Health Check
- `GET /api/health` - Check server status

## 🔒 Security Features

- **Password Hashing** - Bcrypt with salt rounds
- **JWT Tokens** - 7-day expiration
- **Protected Routes** - Middleware authentication
- **Input Validation** - Server-side validation
- **CORS Enabled** - Cross-origin requests configured
- **Password Exclusion** - Passwords never returned in API responses

## 📁 Project Structure

```
napd/
├── backend/
│   ├── src/
│   │   ├── models/          # Mongoose models
│   │   ├── controllers/     # Route controllers
│   │   ├── routes/          # Express routes
│   │   ├── middleware/      # Auth & validation
│   │   └── utils/           # Helper functions
│   ├── index.js             # Server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # React components
    │   ├── pages/           # Page components
    │   ├── context/         # Auth context
    │   ├── hooks/           # Custom hooks
    │   ├── services/        # API service
    │   └── App.jsx          # Main app component
    └── package.json
```

## 🚀 Scaling Considerations

### Frontend Scaling
- **Framework Upgrade** - Migrate to Next.js for SSR, SEO, and better performance
- **Caching** - Implement React Query or SWR for intelligent data caching
- **Component Library** - Adopt Shadcn UI or MUI for design consistency
- **Code Splitting** - Lazy load routes and components
- **CDN** - Serve static assets via CDN

### Backend Scaling
- **Refresh Tokens** - Implement token rotation for better security
- **Rate Limiting** - Add express-rate-limit to prevent abuse
- **CSRF Protection** - Implement anti-CSRF tokens
- **Caching Layer** - Use Redis for session management and caching
- **Database ORM** - Consider Prisma or Drizzle for type-safe migrations
- **Containerization** - Deploy with Docker and Kubernetes

### Database Scaling
- **Indexing** - Add indexes on frequently queried fields (owner, status, createdAt)
- **Sharding** - Implement horizontal partitioning for large datasets  
- **Replication** - Set up read replicas for better performance
- **Connection Pooling** - Optimize MongoDB connections

### Infrastructure
- **Load Balancing** - Use Nginx or AWS ALB for distributing traffic
- **Monitoring** - Implement logging with Winston, monitoring with Prometheus
- **Error Tracking** - Integrate Sentry for real-time error reporting
- **CI/CD** - Set up automated testing and deployment pipelines

## 🧪 Testing

### Manual Testing

1. Start MongoDB:
```bash
mongod
```

2. Start backend:
```bash
cd backend && npm run dev
```

3. Start frontend:
```bash
cd frontend && npm run dev
```

4. Test the complete flow:
   - Register a new user
   - Login with credentials
   - Create multiple tasks
   - Edit task details
   - Change task statuses
   - Search and filter tasks
   - Logout and verify redirect

### API Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123"}'

# Create Task (replace <TOKEN> with your JWT)
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","description":"Test task","status":"todo"}'

# Get Tasks
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <TOKEN>"
```

## 🤝 Contributing

This project was built as an internship evaluation assignment. Feel free to fork and adapt it for your needs.

## 📝 License

MIT

## 👨‍💻 Author

**Nidhi Tripathi**
- 📞 Contact: 7021610623
- 🔗 GitHub: [github.com/Nidhitripathi24](https://github.com/Nidhitripathi24)

Built with attention to detail and modern best practices.

---

**Note**: This application is production-ready with proper security measures, but remember to:
- Change the JWT secret in production
- Use environment-specific configurations
- Enable HTTPS in production
- Implement proper logging and monitoring
- Regular security audits
"# Taskmanager" 
