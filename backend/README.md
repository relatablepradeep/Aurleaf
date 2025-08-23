<div align="center">

# Aurleaf - Backend ⚙️

**This is the backend for the Aurleaf application, built with Express.js and MongoDB.**

<img src="https://img.shields.io/github/stars/relatablepradeep/Aurleaf?style=for-the-badge" alt="Stars"/> 
<img src="https://img.shields.io/github/forks/relatablepradeep/Aurleaf?style=for-the-badge" alt="Forks"/> 
<img src="https://img.shields.io/github/issues/relatablepradeep/Aurleaf?style=for-the-badge" alt="Issues"/> 
<img src="https://img.shields.io/github/contributors/relatablepradeep/Aurleaf?style=for-the-badge" alt="Contributors"/>

</div>

<!-- Contributors collage (auto-updates via contrib.rocks) -->
<a href="https://github.com/relatablepradeep/Aurleaf/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=relatablepradeep/Aurleaf" alt="Contributors collage"/>
</a>

<!-- Note: Shields.io has no collaborators badge. Use a GitHub Action if you need one. -->


<style>
.aurleaf-card{padding:12px;border:1px solid #e5e7eb;border-radius:12px;margin-bottom:8px}
.aurleaf-pill{display:inline-block;padding:2px 8px;border:1px solid #e5e7eb;border-radius:999px;margin:2px}
.aurleaf-note{opacity:.85}
</style>


---

## 🛠️ Tech Stack & Libraries

<div class="aurleaf-card">

* **Framework:** Express.js
* **Database:** MongoDB with Mongoose
* **Authentication:** JSON Web Tokens (JWT)
* **Language:** JavaScript (ESM)

**Key Libraries:**

* `cors`: Cross-Origin Resource Sharing
* `dotenv`: Environment variables
* `bcryptjs`: Password hashing

</div>

---

## ✨ Features

<div class="aurleaf-card">

* **📝 Review Management:** API endpoints for creating and retrieving user reviews.
* **🔒 User Authentication:** Secure registration and login functionality.

</div>

---

## 🚀 Getting Started

To get the backend server running on your local machine, follow these steps.

### Prerequisites

* <span class="aurleaf-pill">Node.js (v18 or higher)</span>
* <span class="aurleaf-pill">npm</span>
* <span class="aurleaf-pill">MongoDB</span>

### Installation & Setup

<div class="aurleaf-card">

1. **Clone the repository (if you haven't already):**

   ```sh
   git clone https://github.com/relatablepradeep/Aurleaf.git
   ```

2. **Navigate to the backend directory:**

   ```sh
   cd Aurleaf/backend
   ```

3. **Install dependencies:**

   ```sh
   npm install
   ```

4. **Set up Environment Variables:**
   Create a `.env` file in the `backend` directory. You can copy the sample file to get started:

   ```sh
   cp .env.sample .env
   ```

   You will need to add the following variables:

   * `port`: The port for the server (e.g., 3003).
   * `url`: Your MongoDB connection string.

</div>

### Running the Application

Start the development server with the following command:

```sh
npm run dev
```

The server will start on the port specified in your `.env` file.

---

## 🔌 API Endpoints

<div class="aurleaf-card">

### Review Routes

* `GET /api/reviews`: Fetches all reviews.
* `POST /api/reviews`: Creates a new review.
  **Request Body:**

  ```json
  {
    "name": "string",
    "rating": "number",
    "thought": "string"
  }
  ```

</div>

---

## 📂 Folder Structure

```
backend/
├── Route/
│   └── Review.js
├── controllers/
│   └── Review.controller.js
├── db/
│   └── connect.js
├── models/
│   └── Review.models.js
├── utils/
│   ├── apierror.js
│   ├── apiresponse.js
│   ├── asynchandler.js
│   └── cloudinary.js
├── index.js
└── package.json
```

---

## 📜 License

This project is licensed under the GPL-2.0 license.
