
# Real-Time Chat Application

A full-stack real-time private chat application built using the MERN stack with live communication powered by Socket.IO.

---

## 🚀 Live Demo


[Real-Time Chat Application](https://prakhar-real-time.vercel.app/)


---

## 📌 Project Overview

This project is a real-time private chat application where users can:

-   Register and log in securely
    
-   Chat with other users instantly
    
-   See online users in real time
    
-   Receive live messages without refreshing
    
-   Track unread messages
    
-   Switch application themes dynamically
    

This project was developed as a Final Year BCA Project Submission.

---

# ✨ Features

## 🔐 Authentication

-   User Registration
    
-   User Login
    
-   JWT Authentication
    
-   HTTP-only Cookie Authentication
    
-   Protected Routes
    

---

## ⚡ Real-Time Communication

-   One-to-one private messaging
    
-   Live message updates using Socket.IO
    
-   Online user tracking
    
-   Instant unread message notifications
    

---

## 🎨 UI Features

-   Responsive Design
    
-   Sidebar Navigation
    
-   Theme Switching
    
-   Clean Chat Interface
    
-   Auto Scroll to Latest Message
    

---

## 🛠 Backend Features

-   REST API Architecture
    
-   MongoDB Database Integration
    
-   Middleware-based Error Handling
    
-   Request Validation using Joi
    
-   Socket Authentication
    

---

# 🧰 Tech Stack

## Frontend

-   React.js
    
-   Vite
    
-   Tailwind CSS
    
-   DaisyUI
    
-   Axios
    
-   Socket.IO Client
    
-   React Router DOM
    

## Backend

-   Node.js
    
-   Express.js
    
-   MongoDB
    
-   Mongoose
    
-   Socket.IO
    
-   JWT
    
-   bcryptjs
    
-   Joi
    

---

# 📂 Folder Structure

```
root
│
├── backend
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── validators
│   ├── lib
│   └── db
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   └── pages
│
└── README.md
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

---

# 🔧 Backend Setup

## Install Dependencies

```bash
cd backend
npm install
```

## Create `.env` File

```env
PORT=3000

MONGO_CONNECTION_STRING=your_mongodb_connection_string

JWT_SECRET=your_secret_key

FRONTEND_URL=http://localhost:5173

IS_PRODUCTION=false
```

## Run Backend

```bash
npm start
```

---

# 💻 Frontend Setup

## Install Dependencies

```bash
cd frontend
npm install
```

## Configure API URL

Open:

```
frontend/src/api/api.js
```

Update the `baseURL` if needed.

## Run Frontend

```bash
npm run dev
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/users/register` | Register user |
| POST | `/users/login` | Login user |
| POST | `/users/logout` | Logout user |
| GET | `/users/auth` | Verify authentication |

---

## Users

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/users/users` | Get all users |

---

## Messages

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/messages/:id` | Get chat messages |

---

# 🔌 Socket Events

## Send Message

```javascript
socket.emit("send-message", {
  receiverId,
  text
})
```

## Receive Message

```javascript
socket.on("receive-message", (data) => {})
```

## Online Users

```javascript
socket.on("users-list", (users) => {})
```

---

# 🔐 Authentication Flow

1.  User registers or logs in
    
2.  Backend generates JWT token
    
3.  Token stored in secure HTTP-only cookie
    
4.  Protected routes verify token
    
5.  Socket connection authenticates user using cookie token
    

---

# 🗄 Database Models

## User Model

```javascript
{
  name,
  email,
  password
}
```

## Message Model

```javascript
{
  senderId,
  receiverId,
  text,
  image
}
```

---

# 🌍 Deployment

## Frontend

-   Vercel
    

## Backend

-   Render
    

## Database

-   MongoDB Atlas
    

---

# 🚀 Future Improvements

-   Group Chat
    
-   Typing Indicators
    
-   File Sharing
    
-   Voice & Video Calling
    
-   Message Reactions
    
-   User Profile Pictures
    
-   Message Search
    
-   Push Notifications
    

---

# 📚 Learning Outcomes

This project helped in understanding:

-   MERN Stack Development
    
-   REST API Design
    
-   Real-Time Communication
    
-   JWT Authentication
    
-   Socket.IO Integration
    
-   Context API State Management
    
-   Responsive UI Design
    
-   MongoDB Schema Design
    
-   Middleware Architecture
    

---

# ⚠️ Known Issues

Some variable names in the codebase contain spelling mistakes such as:

-   `messege` (should be `message`)
-   `reciever` (should be `receiver`)

These do not affect functionality but should be refactored for better code quality.

---

# 👨‍💻 Author

Developed by **Prakhar Agrawal**  
Final Year BCA Project Submission

---

# 📄 License

This project is licensed under the MIT License.