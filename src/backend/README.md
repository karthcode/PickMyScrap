# 🛠️ PickMyScrap – Backend

A **scalable, lightweight, and high-performance backend** that powers the **PickMyScrap** sustainable scrap-trading platform.

This backend manages **authentication**, **seller listings**, **buyer interactions**, **admin workflows**, and **all database operations**, ensuring a secure and transparent peer-to-peer trading experience.

---

## 🚀 Tech Stack

* **Node.js** – JavaScript runtime
* **Express.js** – Backend framework
* **MongoDB (Mongoose)** – NoSQL database & ODM
* **JWT Authentication** – Secure user sessions
* **CORS** – Cross-origin access control
* **dotenv** – Environment variable management

---

## 📁 Folder Structure

```
backend/
│── controllers/        # Business logic & request handling
│── models/             # Mongoose schemas
│── routes/             # API endpoints
│── middleware/         # Auth, validation, uploads
│── uploads/            # Uploaded images (local storage)
│── config/             # Database & environment config
│── server.js           # Application entry point
│── README.md           # Backend documentation
```

This structure ensures **clean separation of concerns**, making the backend easy to maintain and scale.

---

## 🔌 API Overview

### 🔑 Authentication

* `POST /auth/signup` – User registration
* `POST /auth/login` – User login & token generation

---

### 🧑‍💼 Seller

* `POST /seller/create` – Create a scrap listing
* `GET /seller/all` – View all listings
* `GET /seller/:id` – View seller-specific listings

---

### 🛒 Buyer

* `GET  /buyer/listings` – Browse available scrap listings
* `POST /buyer/offer` – Accept a listing

---

### 🛡️ Admin

* `GET /admin/users` – View all registered users
* `GET /admin/listings` – Monitor all scrap listings

---

## 🧩 Deployment Ready

* Compatible with **Render**, **Railway**, and **Vercel **
* CORS-enabled for frontend integration
* Clean controller-route architecture
* Easily extensible for:

  * AI price prediction
  * Logistics & pickup scheduling
  * Real-time notifications

---

## ⚙️ Troubleshooting

| Issue                     | Solution                           |
| ------------------------- | ---------------------------------- |
| MongoDB not connecting    | Verify `MONGO_URI`                 |
| JWT authentication errors | Regenerate `JWT_SECRET`            |
| Images not saving         | Ensure `/uploads` folder exists    |
| CORS blocked              | Add frontend domain to CORS config |

---

## 📈 Future Enhancements

* Role-based admin permissions
* Transaction history & analytics
* AI-driven scrap price suggestions
* Secure cloud image storage (AWS S3 / Cloudinary)
* Real-time updates using WebSockets

---


