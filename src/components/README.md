# 🌿 PickMyScrap – Frontend

PickMyScrap is a digital platform that connects **scrap sellers** with **buyers** through a clean, intuitive interface powered by modular components.

---

## ⚡ Tech Stack
- **HTML**
- **CSS**
- **JavaScript**
- **Component-based UI**
- **REST API integration**

---

## 📁 Project Structure
/
│── components/ # Reusable UI components
│ ├── Navbar.js
│ ├── Dashboard.js
│ ├── SellerForm.js
│ ├── BuyerCards.js
│ └── …
│
│── css/ # Styling modules
│ ├── global.css
│ ├── navbar.css
│ └── dashboard.css
│
│── images/ # Static graphics & icons
│
│── index.html
│── script.js
│── README.md

yaml
Copy code

---

## 🌟 What This Frontend Does
- **Role-based journey**  
  - Sellers list scrap with images, category, price, pickup date.
  - Buyers browse listings, filter by category, negotiate prices.

- **State-based UI updates**  
  Responsive views based on negotiations, accepted offers, and pickup scheduling.

- **Modular components**  
  Every UI widget (cards, forms, layouts) is separated for reuse and quick editing.

---

## ▶️ Running the Frontend
### **1. Open directly**
Just open `index.html` in browser.

### **2. Using Live Server**
If using VS Code:
Right-click > Open With Live Server

yaml
Copy code

---

## 🔌 Backend Integration
Update API base URL inside your JS:
```js
const API_BASE = "http://localhost:5000";
🎨 Styling System
CSS is component-driven, grouped folder-wise

Uses lightweight, mobile-friendly classes

Images stored in /images/ and accessed by components as needed

🚀 Extending Components
Add new UI under /components/

Add corresponding CSS under /css/

Import component script inside index.html

Use consistent naming & modular structure

📦 Deployment
Works on:

GitHub Pages

Netlify

Vercel

Just upload the entire frontend folder.

Frontend is designed to be minimal, modular, and lightning-fast for buyers and sellers.

yaml
Copy code

---

