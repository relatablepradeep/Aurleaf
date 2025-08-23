<div align="center">

  <img src="https://github.com/relatablepradeep/Aurleaf/blob/main/Frontend/src/Assets/logo.png?raw=true" alt="Aurleaf Logo" width="150"/>
  
  <h1>🌿 Aurleaf</h1>
  <p>
    <strong>A comprehensive healthcare platform for India to help you find hospitals, doctors, medical products, and health information with ease.</strong>
  </p>
  <p>
    <img src="https://img.shields.io/github/stars/relatablepradeep/Aurleaf?style=for-the-badge" alt="Stars"/>
    <img src="https://img.shields.io/github/forks/relatablepradeep/Aurleaf?style=for-the-badge" alt="Forks"/>
    <img src="https://img.shields.io/github/issues/relatablepradeep/Aurleaf?style=for-the-badge" alt="Issues"/>
    <img src="https://img.shields.io/github/contributors/relatablepradeep/Aurleaf?style=for-the-badge" alt="Contributors"/>
  </p>
  <p>
    <a href="https://github.com/relatablepradeep/Aurleaf/graphs/contributors">
      <img src="https://contrib.rocks/image?repo=relatablepradeep/Aurleaf" alt="Contributors collage"/>
    </a>
  </p>
</div>

---

## 📖 Table of Contents

- [About Aurleaf](#-about-aurleaf)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌿 About Aurleaf

Aurleaf is a full-stack healthcare application designed to bridge the information gap in the Indian healthcare sector. Our mission is to provide a one-stop solution for users to find reliable healthcare services and information. Whether you're looking for a hospital in your area, a specialist doctor, or information about a health condition, Aurleaf has you covered.

---

## ✨ Features

### Frontend (Client-Side)
- **Hospital Search:** Find hospitals by pincode.
- **Doctor Directory:** Search for doctors by city.
- **Medical Products:** Browse and search for medical products.
- **Health Encyclopedia:** Get information on diseases and fitness.
- **BMI Calculator:** Calculate your Body Mass Index.
- **Secure Authentication:** Easy and secure sign-up/login with Clerk.
- **Responsive Design:** Fully responsive for a seamless experience on any device.

### Backend (Server-Side)
- **RESTful API:** A robust API to serve data to the frontend.
- **User Reviews:** Functionality for users to submit and view reviews.
- **Secure Endpoints:** Authentication and authorization for protected routes.

---

## 🏗️ Project Structure

The project is organized as a monorepo with two main packages:

```
Aurleaf/
├── Frontend/    # React + Vite + TypeScript client
└── backend/     # Express.js + MongoDB server
```

- **`Frontend/`**: Contains the user-facing React application.
- **`backend/`**: Contains the Express.js API server and database logic.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [React](https://reactjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Authentication:** [Clerk](https://clerk.com/)

### Backend
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) (with [Mongoose](https://mongoosejs.com/))
- **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/)

---

## 🚀 Getting Started

To get the full application running locally, you'll need to set up both the frontend and the backend.

### 1. Clone the Repository

```sh
git clone https://github.com/relatablepradeep/Aurleaf.git
cd Aurleaf
```

### 2. Set Up the Frontend

Detailed instructions are in the [Frontend README](./Frontend/README.md).

```sh
# From the root directory
cd Frontend
npm install
cp .env.sample .env # Add your Clerk key
npm run dev
```

### 3. Set Up the Backend

Detailed instructions are in the [Backend README](./backend/README.md).

```sh
# From the root directory
cd backend
npm install
cp .env.sample .env # Add your MongoDB URI and port
npm run dev
```

Once both are running, you can access the application in your browser!

---

## 🤝 Contributing

We welcome contributions from the community! If you'd like to contribute, please read our [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) and check out the open issues.

---

## 📜 License

This project is licensed under the ISC License. See the [LICENSE](./LICENSE) file for more details.

---

<div align="center">
  <p>Made with ❤️ for a healthier India 🇮🇳</p>
</div>
