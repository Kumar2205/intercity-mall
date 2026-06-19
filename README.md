<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=150&section=header&text=Intercity%20Mall&fontSize=50&fontAlignY=30&desc=E-Commerce%20Review%20%26%20Recommendation%20System&descAlignY=50" width="100%"/>
  
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
    <img src="https://img.shields.io/badge/json%20server-000?style=for-the-badge&logo=json&logoColor=white" />
  </p>

  <h3>🛍️ A full-featured e-commerce platform built with React</h3>
  
  <a href="https://github.com/Kumar2205/intercity-mall">
    <img src="https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github" />
  </a>
</div>

---

## ✨ Features

- 🏠 **Home Page** — Featured products, bestsellers, hero section with stats
- 🛒 **Shop Page** — Product grid with category filters, sorting, and search
- 📄 **Product Details** — Full product info, ratings, reviews, and features
- 🛍️ **Shopping Cart** — Add/remove items, quantity control, delivery fee calculator
- 📦 **Checkout** — Address form, order summary, COD payment
- 📋 **Order History** — View all past orders with status tracking
- 📊 **Admin Dashboard** — Product catalog, order management, stats & analytics
- 🔍 **Search & Filter** — Real-time product search and category filtering
- 💾 **Persistent Cart** — Cart saved in localStorage
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, React Router |
| Styling | CSS3 with custom properties |
| Backend (Mock) | JSON Server (REST API) |
| Icons | react-icons (Feather Icons) |
| State Management | React Context + useReducer |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/Kumar2205/intercity-mall.git

# Navigate to project
cd intercity-mall

# Install dependencies
npm install

# Start both JSON server and React dev server
npm start
```

> The app will open at **http://localhost:5173** and the API runs on **http://localhost:5000**

### Run servers separately

```bash
# Terminal 1 - JSON Server (REST API)
npm run server

# Terminal 2 - React Dev Server
npm run dev
```

---

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td><b>🏠 Home Page</b></td>
      <td><b>🛒 Shop</b></td>
    </tr>
    <tr>
      <td><img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500" alt="Home" width="400"/></td>
      <td><img src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500" alt="Shop" width="400"/></td>
    </tr>
    <tr>
      <td><b>📄 Product Detail</b></td>
      <td><b>📊 Admin Dashboard</b></td>
    </tr>
    <tr>
      <td><img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" alt="Product" width="400"/></td>
      <td><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500" alt="Admin" width="400"/></td>
    </tr>
  </table>
</div>

---

## 📁 Project Structure

```
intercity-mall/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation bar with search & cart
│   │   └── Footer.jsx        # Site footer
│   ├── pages/
│   │   ├── Home.jsx          # Landing page
│   │   ├── Shop.jsx          # Product listing with filters
│   │   ├── ProductDetail.jsx # Single product view
│   │   ├── Cart.jsx          # Shopping cart
│   │   ├── Checkout.jsx      # Order checkout flow
│   │   ├── Orders.jsx        # Order history
│   │   └── Admin.jsx         # Admin dashboard
│   ├── context/
│   │   └── CartContext.jsx   # Cart state management
│   ├── App.jsx               # App with routes
│   ├── App.css
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── db.json                   # JSON Server database
├── package.json
└── vite.config.js
```

---

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/products` | GET | Get all products |
| `/products/:id` | GET | Get single product |
| `/reviews?productId=:id` | GET | Get product reviews |
| `/orders` | GET | Get all orders |
| `/orders` | POST | Place a new order |
| `/users` | GET | Get users |
| `/cart` | GET/POST | Manage cart |

---

## 📜 License

This project is developed as a Diploma Major Project by **Aman Kumar** (Enrolment No: CVB2300068) at **Dr. C.V. Raman University, Vaishali (Bihar)**.

---

<div align="center">
  <b>Built with ❤️ by Aman Kumar</b>
  <br/>
  <a href="https://github.com/Kumar2205">GitHub</a> |
  <a href="https://www.linkedin.com/in/your-linkedin">LinkedIn</a>
</div>
