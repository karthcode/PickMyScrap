# 🛠️ PickMyScrap – Backend

A lightweight and fast backend powering the **PickMyScrap** sustainable scrap-trading platform.  
It handles authentication, seller listings, buyer actions, admin workflows, and all database operations.

---

## 🚀 Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT Authentication**
- **Multer** (image handling)
- **Cors + dotenv**

---

## 📁 Folder Structure
backend/
│── controllers/ # All business logic
│── models/ # Mongoose schemas
│── routes/ # API endpoints
│── middleware/ # Auth, validation, uploads
│── uploads/ # Uploaded images (if stored locally)
│── config/ # DB config
│── server.js # App entry point
│── README.md

yaml
Copy code

---

## 🔐 Environment Variables
Create a `.env` file:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key

markdown
Copy code

---

## 🔌 API Overview
### **Auth**
- `POST /auth/signup`
- `POST /auth/login`

### **Seller**
- `POST /seller/create`
- `GET /seller/all`
- `GET /seller/:id`

### **Buyer**
- `POST /buyer/offer`
- `POST /buyer/negotiation`
- `GET  /buyer/listings`

### **Admin**
- `GET /admin/users`
- `GET /admin/listings`

---

## ▶️ Running the Backend

### **1. Install dependencies**
npm install

markdown
Copy code

### **2. Start server**
npm start

markdown
Copy code

### **3. Development mode**
npm run dev

nginx
Copy code

Backend runs on:
http://localhost:5000

yaml
Copy code

---

## 🧩 Deployment Ready
- Supports hosting on Render / Railway / Vercel (serverless express)
- CORS-enabled
- Clean separation of controllers & routes for easy scaling

---

## ⚙️ Troubleshooting
| Issue | Fix |
|------|------|
| MongoDB not connecting | Check `MONGO_URI` |
| JWT errors | Reset `JWT_SECRET` |
| Images not saving | Ensure `/uploads` exists |
| CORS blocked | Add your frontend domain to CORS |

---
