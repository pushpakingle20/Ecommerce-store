🛒 ShopVista – Full Stack E-Commerce Store

ShopVista is a modern full-stack e-commerce web application where users can browse products, search and filter items, add them to a cart, and simulate checkout.

The project demonstrates frontend development with React and Tailwind CSS along with a simple Node.js backend API for product data.

It is designed to be responsive, fast, and user-friendly.

🚀 Features
🛍 Product Browsing

Product grid layout

Product cards with image, rating, and price

Responsive UI

🔍 Search & Filters

Product search

Category filtering

Price range filtering

Sorting options

🛒 Cart System

Add to cart

Remove from cart

Update product quantity

Cart persistence using localStorage

🔐 Authentication

Login / Signup interface

Mock authentication

💳 Checkout

Cart summary

Mock payment process

Order confirmation

📱 Responsive Design

Mobile friendly

Tablet optimized

Desktop layout

🛠 Tech Stack
Frontend

React.js

React Router

Tailwind CSS

Context API (State Management)

Vite

Backend

Node.js

Express.js

REST API

Data

Mock JSON product data

📸 Screenshots
Home Page

Login Page

Products Page

📁 Project Structure
ecommerce-store
│
├── dist                # Production build
│
├── node_modules
│
├── public              # Static assets
│
├── Screenshot          # Project screenshots
│
├── server              # Backend server
│   ├── data            # Mock product data
│   ├── routes          # API routes
│   └── index.js        # Express server
│
├── src                 # Frontend source code
│   ├── components      # Reusable UI components
│   ├── context         # Global state management
│   ├── pages           # Application pages
│   ├── utils           # Helper functions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── SPEC.md

⚙️ Installation
1️⃣ Clone the repository
git clone https://github.com/yourusername/ecommerce-store.git

2️⃣ Navigate to the project
cd ecommerce-store

3️⃣ Install dependencies
npm install

▶️ Run the Project
Start frontend
npm run dev


Open in browser

http://localhost:5173

Start backend server
node server/index.js


Server will run on

http://localhost:5000

📦 Build for Production
npm run build


Build files will be generated in the dist folder.

🔮 Future Improvements

Real payment gateway integration

User profile and order history

Product reviews and ratings

Wishlist system

Admin dashboard

Database integration (MongoDB)

👨‍💻 Author

Pushpak Ingle

GitHub:
https://github.com/pushpakingle20
