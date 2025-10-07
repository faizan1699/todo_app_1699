# 📝 Todo App (Backend - MERN Stack)

A simple and secure **Todo Backend API** built with **Node.js**, **Express**, and **MongoDB**.  
This backend supports full CRUD functionality with authentication, password management, and email integration.

---

## 🚀 Features

✅ User Authentication (Register, Login, JWT Auth)  
✅ Add / Edit / Delete Todos  
✅ Update & Change Password  
✅ Role-based Authorization  
✅ MongoDB Atlas Database Integration  
✅ Nodemailer Email Support (for notifications or password reset)  

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Authentication | JWT (JSON Web Token) |
| Email | Nodemailer |
| Environment Variables | dotenv |

---

## 📂 Folder Structure

```
todo-backend/
│
├── config/               # DB connection, environment setup
├── controllers/          # Controller logic for routes
├── middlewares/          # Auth middlewares (JWT, observer, etc.)
├── models/               # Mongoose models (User, Todo)
├── routes/               # Express route files
├── utils/                # Helper functions (error handling, validation)
├── .env                  # Environment variables (ignored in Git)
├── .gitignore            # Files to ignore in git
├── index.js              # Main entry point
└── package.json          # Dependencies and scripts
```

---

## ⚙️ Installation

Clone this repository and install dependencies.

```bash
git clone https://github.com/faizan1699/todoapp.git
cd todoapp
npm install
```

---

## ▶️ Run Locally

### Start Development Server
```bash
npm start
```

or with nodemon (auto-restart):
```bash
npm run dev
```

The server will run on:

```
http://localhost:5000
```

---

## 🔐 Environment Variables

Create a `.env` file in the root folder and add the following:

```bash
# =============== Server Configuration ===============
PORT=5000
DOMAIN=http://localhost:5000

# =============== Database ===============
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>

# =============== JWT ===============
JWT_SECRET=<your_jwt_secret_key>

# =============== Nodemailer ===============
ADMIN=<your_email>
PASS=<your_email_app_password>
```

> ⚠️ Replace the placeholder values with your own credentials.  
> Do **NOT** commit this file to GitHub. Add `.env` to `.gitignore`.

---

## 📡 API Endpoints

### 🔐 Auth Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| **POST** | `/user/register` | Register a new user |
| **POST** | `/user/login` | Login user |
| **POST** | `/user/auth/logout` | Logout user |
| **POST** | `/user/resend/email-verification-link/:email` | Resend email verification link |
| **POST** | `/user/auth/verify-email/:token` | Verify user email |
| **PUT** | `/user/auth/update/password` | Update user password |

---

### 👥 User Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| **GET** | `/users/listing` | Get all users |
| **GET** | `/user/get/:id` | Get user by ID |
| **DELETE** | `/user/delete/:id` | Delete user by ID |

---

### ✅ Todo Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| **GET** | `/todos/listing` | Get all todos |
| **POST** | `/todos/create` | Create a new todo |
| **GET** | `/todos/get/:id` | Get todo by ID |
| **PUT** | `/todos/update/:id` | Update todo by ID |
| **DELETE** | `/todos/delete/:id` | Delete todo by ID |

---

## 🧠 Example Todo Object

```json
{
  "_id": "6703b3d6e5e1dfb1e3aeb567",
  "title": "Finish MERN Project",
  "description": "Complete backend and integrate MongoDB",
  "user_id": "6703b1e5d3e4a2b8f6e7a9c4",
  "completed": false
}
```

---

## 🌍 Deployment

You can host this backend for **free** using:

- [Render](https://render.com/)
- [Railway](https://railway.app/)
- [Vercel](https://vercel.com/) *(API-only support)*
- [Cyclic](https://www.cyclic.sh/)

> For MongoDB, use [MongoDB Atlas](https://www.mongodb.com/atlas/database).

---

## 👨‍💻 Author

**Faizan Rasheed**  
Full Stack MERN Developer  
📍 Lahore, Pakistan  
🔗 [Portfolio](https://faizanportfolio-seven.vercel.app/)  
💼 [GitHub](https://github.com/faizan1699)  
✉️ faizanrasheed169@gmail.com  

---

## 🧾 License

This project is licensed under the **MIT License** – feel free to use and modify it.

---

## ⭐ Support

If you like this project, please **give it a star** 🌟 on GitHub — it helps a lot!
