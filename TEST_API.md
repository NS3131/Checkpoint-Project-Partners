# 🧪 API Testing Guide

This guide will help you test the backend API endpoints.

## Prerequisites

Make sure the backend server is running:
```bash
npm run server
```

The server should be running on `http://localhost:5000`

## Testing with cURL

### 1. Health Check (Public)
Test if the server is running:

```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

---

### 2. Login (Public)
Get a JWT token:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin"
  }
}
```

📝 **Copy the token from the response - you'll need it for the next requests!**

---

### 3. Verify Token (Protected)
Verify your token is valid:

```bash
# Replace YOUR_TOKEN with the actual token from login
curl http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "admin"
  }
}
```

---

### 4. Get All Flowers (Protected)
Get all 100 flower cards:

```bash
curl http://localhost:5000/api/flowers \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "count": 100,
  "data": [
    {
      "id": 1,
      "name": "Rose",
      "emoji": "🌹",
      "color": "#ff6b9d",
      "description": "Symbol of love and passion"
    },
    // ... 99 more cards
  ]
}
```

---

### 5. Get Single Flower (Protected)
Get a specific flower card by ID:

```bash
curl http://localhost:5000/api/flowers/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Rose",
    "emoji": "🌹",
    "color": "#ff6b9d",
    "description": "Symbol of love and passion"
  }
}
```

---

### 6. Get Flower Types (Protected)
Get all flower types without card IDs:

```bash
curl http://localhost:5000/api/flowers/types/all \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "name": "Rose",
      "emoji": "🌹",
      "color": "#ff6b9d",
      "description": "Symbol of love and passion"
    },
    // ... 9 more types
  ]
}
```

---

### 7. Logout (Protected)
Logout the user:

```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## Testing with Browser (JavaScript)

Open your browser console on any page and run:

```javascript
// 1. Login
async function testLogin() {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'password123' })
  });
  const data = await response.json();
  console.log('Login Response:', data);
  return data.token;
}

// 2. Get Flowers
async function testFlowers(token) {
  const response = await fetch('http://localhost:5000/api/flowers', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  console.log('Flowers:', data);
}

// Run tests
const token = await testLogin();
await testFlowers(token);
```

---

## Testing Error Cases

### Invalid Credentials
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"wrong","password":"wrong"}'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Invalid username or password"
}
```

### No Token Provided
```bash
curl http://localhost:5000/api/flowers
```

**Expected Response:**
```json
{
  "success": false,
  "message": "No token provided"
}
```

### Invalid Token
```bash
curl http://localhost:5000/api/flowers \
  -H "Authorization: Bearer invalid_token_here"
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Invalid token"
}
```

### Invalid Flower ID
```bash
curl http://localhost:5000/api/flowers/999 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Flower card not found"
}
```

---

## Using Postman

If you prefer a GUI tool, import these requests into Postman:

1. **Create a new collection**: "Flower Bomb API"
2. **Add Environment Variables**:
   - `base_url`: `http://localhost:5000/api`
   - `token`: (will be set after login)

3. **Create Requests**:

   **Login (POST)**
   - URL: `{{base_url}}/auth/login`
   - Body (JSON):
     ```json
     {
       "username": "admin",
       "password": "password123"
     }
     ```
   - Test Script:
     ```javascript
     pm.environment.set("token", pm.response.json().token);
     ```

   **Get Flowers (GET)**
   - URL: `{{base_url}}/flowers`
   - Headers:
     - `Authorization`: `Bearer {{token}}`

---

## Integration Test Script

Save this as `test-api.sh` and run it:

```bash
#!/bin/bash

API_URL="http://localhost:5000/api"

echo "🧪 Testing Flower Bomb API..."
echo ""

# 1. Health Check
echo "1️⃣ Health Check"
curl -s $API_URL/health | jq
echo ""

# 2. Login
echo "2️⃣ Login"
LOGIN_RESPONSE=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}')
echo $LOGIN_RESPONSE | jq
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
echo ""

# 3. Verify Token
echo "3️⃣ Verify Token"
curl -s $API_URL/auth/verify \
  -H "Authorization: Bearer $TOKEN" | jq
echo ""

# 4. Get Flowers
echo "4️⃣ Get Flowers (first 3 only)"
curl -s $API_URL/flowers \
  -H "Authorization: Bearer $TOKEN" | jq '.data[:3]'
echo ""

# 5. Get Single Flower
echo "5️⃣ Get Single Flower (ID: 1)"
curl -s $API_URL/flowers/1 \
  -H "Authorization: Bearer $TOKEN" | jq
echo ""

echo "✅ All tests completed!"
```

Run with:
```bash
chmod +x test-api.sh
./test-api.sh
```

---

## Status Codes

- `200` - Success
- `400` - Bad Request (missing or invalid data)
- `401` - Unauthorized (invalid token or credentials)
- `404` - Not Found (resource doesn't exist)
- `500` - Server Error

---

**Happy Testing! 🚀**

For more information, see [QUICKSTART.md](QUICKSTART.md) or [README.md](README.md)


