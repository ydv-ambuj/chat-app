# 💬 Full Stack Real-Time Chat Application

A modern **Full Stack Real-Time Chat Application** built using the **MERN Stack** — MongoDB, Express.js, React.js, and Node.js.

The application allows users to communicate with each other in real time. When a user sends a message, the recipient receives it **instantly without refreshing the application**.

Real-time communication is implemented using **Socket.IO**, which provides bidirectional communication between the client and server.

---

## 🚀 Features

* 🔐 User Authentication
* 👤 User Registration and Login
* 💬 One-to-One Real-Time Messaging
* ⚡ Instant Message Delivery
* 🟢 Online/Offline User Status
* 📱 Responsive Chat Interface
* 🖼️ Image/Media Sharing
* 📜 Chat History
* 🔄 Real-Time Updates Without Page Refresh
* 🔔 Toast Notifications
* 🔒 Protected Routes
* ☁️ Online Deployment

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Socket.IO Client
* React Hot Toast
* CSS3

### Backend

* Node.js
* Express.js
* Socket.IO
* JWT
* bcryptjs
* Multer

### Database

* MongoDB
* Mongoose

### Deployment

* Vercel
* MongoDB Atlas

---

## 🏗️ Application Architecture

```text
                 ┌─────────────────────┐
                 │       React         │
                 │      Frontend       │
                 └──────────┬──────────┘
                            │
                     HTTP / Socket.IO
                            │
                            ▼
                 ┌─────────────────────┐
                 │      Node.js        │
                 │      Express        │
                 │      Socket.IO      │
                 └──────────┬──────────┘
                            │
                            │ Mongoose
                            ▼
                 ┌─────────────────────┐
                 │      MongoDB        │
                 │       Database      │
                 └─────────────────────┘
```

---

## 📂 Project Structure

```text
chat-app/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chat-app.git
```

Move into the project:

```bash
cd chat-app
```

---

## 🔧 Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

## 💻 Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the React development server:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

## ⚡ Real-Time Messaging with Socket.IO

Socket.IO is used to establish a real-time connection between the frontend and backend.

When a user sends a message:

```text
User A
   │
   │ Send Message
   ▼
React Frontend
   │
   │ Socket.IO
   ▼
Node.js + Socket.IO Server
   │
   ├── Save message to MongoDB
   │
   └── Emit message
          │
          ▼
       User B
```

This allows the recipient to receive messages immediately without reloading the page.

---

## 🔐 Authentication Flow

The application uses **JWT authentication**.

```text
Register
   ↓
Login
   ↓
Server validates credentials
   ↓
JWT Token generated
   ↓
Token stored by client
   ↓
Protected API requests
```

Passwords are securely hashed before being stored in MongoDB.

---

## 🗄️ Database

MongoDB is used to store application data such as:

* User accounts
* User profiles
* Messages
* Chat information
* Timestamps
* Media information

MongoDB Atlas can be used for hosting the database online.

---

## 🖼️ Media Sharing

The application can support sharing media files through the chat interface.

Typical flow:

```text
Select File
     ↓
Upload to Backend
     ↓
Store File
     ↓
Generate File URL
     ↓
Send URL Through Socket.IO
     ↓
Recipient Receives Media
```

---

## 🌐 Deployment

After completing the application locally, the frontend and backend can be deployed online.

### Frontend

The React frontend can be deployed using **Vercel**.

Before deployment, update:

```env
VITE_BACKEND_URL=https://your-backend-url.com
```

### Backend

Deploy the Node.js/Express backend using a suitable hosting service and configure:

```env
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_secret
CLIENT_URL=https://your-frontend-url.vercel.app
```

Make sure CORS is configured to allow requests from the deployed frontend.

---

## 🔒 Security

The application includes several security practices:

* Password hashing with bcrypt
* JWT-based authentication
* Protected API routes
* Environment variables for secrets
* CORS configuration
* Authentication middleware
* MongoDB database security

> Never commit your `.env` file to GitHub.

Add this to `.gitignore`:

```gitignore
node_modules/
.env
uploads/
dist/
```

---

## 🧪 Development

Run backend:

```bash
cd backend
npm run dev
```

Run frontend:

```bash
cd frontend
npm run dev
```

Build frontend for production:

```bash
npm run build
```

---

## 📸 Application Features

### 🔑 Login & Registration

Users can create an account and securely log in.

### 💬 Chat

Users can select another user and start a conversation.

### ⚡ Real-Time Messages

Messages appear instantly for both users using Socket.IO.

### 🟢 Online Status

The application can display whether users are currently online.

### 📱 Responsive UI

The chat interface is designed to work across desktop and mobile devices.

---

## 🔮 Future Improvements

* Group Chat
* Voice Calling
* Video Calling
* Message Reactions
* Message Editing
* Message Deletion
* Typing Indicators
* Read Receipts
* Push Notifications
* End-to-End Encryption
* Dark/Light Theme
* Search Messages
* File Sharing Improvements

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/new-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add new feature"
```

5. Push the branch.

```bash
git push origin feature/new-feature
```

6. Open a Pull Request.

---

## 👨‍💻 Author

**Ambuj Yadav**

GitHub:
https://github.com/ydv-ambuj

LinkedIn:
https://www.linkedin.com/in/ambuj-yadav-000188380

---

## ⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is licensed under the MIT License.
