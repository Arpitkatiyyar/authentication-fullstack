# Authentication Workspace


This workspace contains a full-stack authentication project with:

- `frontend/`: a React + Vite client
- `backend/`: an Express + MongoDB API

The app supports user registration, email OTP verification, login, token refresh, session-based logout, and password reset with OTP.

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Nodemailer with Gmail OAuth2
- Cookie-based refresh tokens
- Rate limiting for login attempts

## Project Structure

```text
self/
|-- backend/
|   |-- server.js
|   |-- package.json
|   `-- src/
|       |-- app.js
|       |-- config/
|       |-- controllers/
|       |-- db/
|       |-- middleware/
|       |-- models/
|       |-- routes/
|       |-- services/
|       `-- utils/
|-- frontend/
|   |-- package.json
|   |-- vite.config.js
|   |-- public/
|   `-- src/
|       |-- api/
|       |-- pages/
|       `-- services/
`-- readme.md
```

## Features

- Register with `username`, `email`, and `password`
- Send OTP to email after registration
- Verify email with OTP
- Login only after email verification
- Generate short-lived access token and long-lived refresh token
- Store refresh token in an HTTP-only cookie
- Track user sessions in MongoDB
- Logout from current device
- Logout from all devices
- Forgot-password flow using OTP
- Reset password after OTP validation
- Basic login protection with rate limiting and slow-down middleware

## How Authentication Works

1. A user registers from the frontend.
2. The backend creates the user, hashes the password with SHA-256, and stores an OTP hash in MongoDB.
3. An OTP email is sent using Nodemailer and Gmail OAuth2.
4. The user verifies the email with the OTP.
5. On login, the backend returns an access token in the response.
6. The backend also stores a refresh token in a secure HTTP-only cookie.
7. Refresh token hashes are saved in the `sessions` collection.
8. Protected frontend requests send the access token in the `Authorization` header.

## Default Local Ports

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

The backend CORS configuration is currently set to allow requests from `http://localhost:5173`.

## Environment Variables

Create a `.env` file inside `backend/`.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_REFRESH_TOKEN=your_google_oauth_refresh_token
GOOGLE_USER=your_gmail_address
GOOGLE_PASS=optional_if_needed
```

### Variable Notes

- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: secret used to sign access and refresh tokens
- `GOOGLE_CLIENT_ID`: Google OAuth client id for email sending
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `GOOGLE_REFRESH_TOKEN`: refresh token used by Nodemailer OAuth2
- `GOOGLE_USER`: Gmail address used to send OTP emails
- `GOOGLE_PASS`: present in config, but OAuth2 is the main transport mechanism

## Installation

### 1. Clone the project

```bash
git clone <your-repo-url>
cd self
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Run the Project

Open two terminals.

### Terminal 1: start the backend

```bash
cd backend
npm run dev
```

### Terminal 2: start the frontend

```bash
cd frontend
npm run dev
```

## Available Scripts

### Backend

```bash
npm run dev
```

Starts the backend with `nodemon` through `server.js`.

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## API Endpoints

Base URL: `http://localhost:3000/api`

### Auth Routes

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/get-me`
- `POST /auth/refresh-token`
- `POST /auth/logout`
- `POST /auth/logout-all`
- `POST /auth/verify-email`
- `POST /auth/resend-otp`
- `POST /auth/forget-password`
- `POST /auth/reset-password`

## Frontend Pages

- `/` - home page
- `/login` - login page
- `/register` - registration page
- `/profile` - profile page
- `/verify-email` - email verification page

Note: the router currently contains some capitalized paths in code, but navigation mostly targets lowercase URLs.

## Database Collections

### `users`

Stores:

- `username`
- `email`
- `password`
- `verified`

### `otps`

Stores:

- `email`
- `user`
- `otpHash`
- `createdAt`

OTP documents expire automatically after 5 minutes.

### `sessions`

Stores:

- `user`
- `refreshTokenHash`
- `ip`
- `userAgent`
- `revoked`

## Important Implementation Notes

- Passwords are currently hashed with SHA-256 before storage.
- Refresh tokens are hashed before being stored in the database.
- Access tokens expire in `15m`.
- Refresh tokens expire in `7d`.
- Refresh token cookies are set with `httpOnly`, `secure`, and `sameSite: "strict"`.

## Current Limitations

- There is no test suite yet.
- The root `Home` page is minimal.
- Error handling is basic in a few frontend forms.
- The backend uses a hardcoded frontend origin in CORS.
- `secure: true` cookies may require HTTPS in some local environments.
- Password hashing uses SHA-256 instead of a stronger password hashing algorithm like bcrypt or argon2.



## Author

Built as a full-stack authentication practice project using React, Express, MongoDB, JWT, and email OTP verification.
