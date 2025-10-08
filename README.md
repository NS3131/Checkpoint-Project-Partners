# 🌸 Flower Cards Platform

## CheckPoint Project Partners

Create an app that gives you access to FlowerCards. There is a login for users to have access to the picture platform. We use React & Node Js.

## Project Description

This is a CheckPoint Project Partners application that provides secure access to a FlowerCards picture platform. Users must login to view and interact with the flower card gallery.

## Features

- **Secure Login System**: JWT-based authentication with Node.js backend
- **REST API**: Express.js backend with authentication and flower data endpoints
- **Flower Cards Gallery**: 100 unique flower cards (20 rows × 5 columns)
- **Interactive Picture Platform**: Click on any card to view details in a modal
- **Responsive Design**: Works on all screen sizes
- **Modern UI**: Beautiful gradient backgrounds and smooth animations
- **Persistent Sessions**: Token-based authentication with localStorage

## Login Credentials

To access the flower cards gallery, use these credentials:

- **Username**: `admin`
- **Password**: `password123`

## Installation

### Frontend Setup

1. Navigate to the project directory:
```bash
cd "Flower Bomb"
```

2. Install frontend dependencies:
```bash
npm install
```

### Backend Setup

3. Navigate to the server directory and install backend dependencies:
```bash
cd server
npm install
```

4. Create a `.env` file in the server directory (copy from `.env.example`):
```bash
cp .env.example .env
```

5. Update the `.env` file with your own JWT secret (optional for development)

### Running the Application

**Option 1: Run Frontend and Backend Together (Recommended)**
```bash
# From the root directory
npm run dev:full
```

**Option 2: Run Frontend and Backend Separately**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

6. Open your browser and visit `http://localhost:5173`
   - Frontend runs on port 5173
   - Backend API runs on port 5000

## Usage

1. Enter the login credentials on the login page
2. Browse through the 100 flower cards in the gallery
3. Click on any card to view more details
4. Use the logout button to return to the login page

## Technology Stack

### Frontend
- React 19
- Vite
- CSS3 with animations
- Modern ES6+ JavaScript
- Fetch API for HTTP requests

### Backend
- Node.js
- Express.js
- JSON Web Tokens (JWT)
- bcryptjs for password hashing
- CORS enabled

## Project Structure

```
Flower Bomb/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   ├── FlowerCards.jsx
│   │   └── FlowerCards.css
│   ├── services/
│   │   └── api.js          # API service for backend communication
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── server/
│   ├── routes/
│   │   ├── auth.js         # Authentication endpoints
│   │   └── flowers.js      # Flower data endpoints
│   ├── middleware/
│   │   └── auth.js         # JWT verification middleware
│   ├── server.js           # Express server setup
│   ├── package.json
│   ├── .env.example
│   └── .env                # Environment variables (not in git)
├── index.html
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login (returns JWT token)
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/logout` - User logout

### Flowers
- `GET /api/flowers` - Get all flower cards (requires authentication)
- `GET /api/flowers/:id` - Get single flower card by ID (requires authentication)
- `GET /api/flowers/types/all` - Get all flower types (requires authentication)

### Health Check
- `GET /api/health` - Server health check

## Features Details

### Login Component
- JWT-based authentication
- Username and password validation
- Error handling for invalid credentials
- Loading states during API calls
- Beautiful gradient background
- Smooth animations
- Persistent login with localStorage

### Flower Cards Component
- 100 unique flower cards loaded from API
- 10 different flower types with descriptions
- Interactive hover effects
- Modal popup for card details
- Responsive grid layout
- Loading and error states
- Secure logout functionality

---

Created with ❤️ using React + Vite