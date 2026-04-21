A full-stack authentication system that provides secure user management features including signup, login, token verification, password reset, and password change functionality.

This project demonstrates best practices for implementing authentication flows in modern web applications.

---------Features-------

User Signup (Registration)
User Login
Email/Token Verification
Forgot Password (Generate Reset Token)
Reset Password using Token
Change Password (Authenticated users)
Secure API with JWT Authentication
Password hashing using bcrypt
Protected routes

-------Installation & Setup-----------

1. Clone the Repository
git clone https://github.com/mazharali21/Auth-System-MERN-APP-.git
cd Auth-System-MERN-APP

3. Setup Backend
cd backend
npm install

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the server:
npm run dev

3. Setup Frontend
cd frontend
npm install
npm run dev

-------- Authentication Flow ------------
User signs up → account created
Verification token generated
User verifies account
User logs in → receives JWT token
Forgot password → reset token generated
User resets password using token
Logged-in user can change password


---------- Tech Stack --------------

Frontend:
React
Axios / Fetch API

Backend:
Node.js
Express.js

Authentication:
JSON Web Tokens (JWT)
bcrypt (password hashing)

Database:
MongoDB

---------Author--------
Mazhar Ali
GitHub: https://github.com/mazharali21


