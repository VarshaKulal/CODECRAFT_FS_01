# CODECRAFT_FS_01 — Secure User Authentication 

This project demonstrates a *Secure User Authentication System* built with Node.js, Express, and MongoDB.  
It allows users to *register, login, logout, and access a protected welcome page* with secure password hashing and session-based authentication.

## 🔎 Project Description
The system is designed to handle *user authentication* with security best practices:
- Passwords are hashed using *bcrypt* before storing in the database.
- Sessions are managed using *express-session* and stored in MongoDB.
- Users can only access protected pages after logging in.

## ✅ Features
- 🔐 *User Registration* with password hashing  
- 🔑 *User Login* with session-based authentication  
- 🚪 *User Logout* that clears the session securely    
- ⚡ Error handling for invalid login/duplicate registration  

## 🛠 Technologies Used
- *Frontend:* HTML, CSS, JavaScript (Vanilla)  
- *Backend:* Node.js, Express.js  
- *Database:* MongoDB  
- *Authentication & Security:*
  - bcrypt (password hashing)  
  - express-session (session management)  
  - connect-mongo (session persistence)  

## 📁 Project Structure
CODECRAFT_FS_01/ ├── node_modules/ ├── public/ ├── login.html  │   ├── register.html  │   ├── welcome.html  │   ├── script.js  │   └── style.css ├── server.js   ├── package.json  ├── package-lock.json  └── README.md    

## 🛠 Setup Instructions
### Backend
1. Go inside root folder 
   ```bash
   npm install
   node server.js
### MongoDB 
1. Database Name: authDB
2. Collection Name: users
   
