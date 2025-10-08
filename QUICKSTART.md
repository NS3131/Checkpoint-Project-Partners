# 🚀 Quick Start Guide

## What's New?

Your Flower Bomb app now has a **Node.js backend** with:
- ✅ Express.js REST API
- ✅ JWT-based authentication
- ✅ Protected API endpoints
- ✅ Persistent login sessions

## Getting Started

### 1. Install Dependencies

**Backend:**
```bash
cd server
npm install
cd ..
```

**Frontend:**
```bash
npm install
```

### 2. Start the Application

**Easy Way - Run Both Together:**
```bash
npm run dev:full
```

**Manual Way - Run Separately:**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### 3. Access the App

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

### 4. Login

Use these credentials:
- **Username:** `admin`
- **Password:** `password123`

## How It Works

### Authentication Flow
1. User enters credentials on login page
2. Frontend sends POST request to `/api/auth/login`
3. Backend validates credentials and returns JWT token
4. Frontend stores token in localStorage
5. All subsequent API calls include the token in Authorization header

### API Endpoints

#### Public Endpoints
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/health` - Check server status

#### Protected Endpoints (Require JWT Token)
- `GET /api/auth/verify` - Verify token validity
- `POST /api/auth/logout` - Logout user
- `GET /api/flowers` - Get all 100 flower cards
- `GET /api/flowers/:id` - Get specific flower card
- `GET /api/flowers/types/all` - Get all flower types

## File Structure

```
Flower Bomb/
├── src/
│   ├── services/
│   │   └── api.js              # 🆕 API service layer
│   └── components/
│       ├── Login.jsx           # ✨ Updated to use API
│       └── FlowerCards.jsx     # ✨ Updated to use API
│
└── server/                     # 🆕 Backend server
    ├── routes/
    │   ├── auth.js            # Authentication routes
    │   └── flowers.js         # Flower data routes
    ├── middleware/
    │   └── auth.js            # JWT verification
    ├── server.js              # Express server
    ├── .env                   # Environment variables
    └── package.json           # Backend dependencies
```

## Testing the API

You can test the API endpoints using curl or Postman:

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
```

### Get Flowers (with token)
```bash
# Replace YOUR_TOKEN with the token from login response
curl http://localhost:5000/api/flowers \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Health Check
```bash
curl http://localhost:5000/api/health
```

## Troubleshooting

### Port Already in Use
If port 5000 or 5173 is already in use:

1. Change backend port in `server/.env`:
   ```
   PORT=5001
   ```

2. Update frontend API URL in `src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:5001/api';
   ```

### CORS Issues
If you see CORS errors, make sure:
- Backend server is running
- CORS is enabled in `server/server.js` (already configured)
- Frontend is accessing the correct API URL

### Token Expired
Tokens expire after 24 hours. Just login again to get a new token.

## Next Steps

Want to enhance your app? Try:
- Add user registration endpoint
- Connect to a real database (MongoDB, PostgreSQL)
- Add more flower CRUD operations
- Implement refresh tokens
- Add user profiles
- Deploy to production (Vercel + Heroku/Railway)

## Need Help?

Check the main [README.md](README.md) for detailed information.

---

Happy coding! 🌸


