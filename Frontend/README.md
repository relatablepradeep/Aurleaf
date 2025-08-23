<div align="center">

  <img src="https://github.com/relatablepradeep/Aurleaf/blob/main/Frontend/src/Assets/logo.png?raw=true" alt="Aurleaf Logo" width="150"/>
  <h1>🌿 Aurleaf - Frontend</h1>

  <p>
    <strong>The official frontend for Aurleaf, a modern healthcare platform built with React, Vite, and TypeScript.</strong>
  </p>
  <img src="https://img.shields.io/github/stars/relatablepradeep/Aurleaf?style=for-the-badge" alt="Stars"/>
  <img src="https://img.shields.io/github/forks/relatablepradeep/Aurleaf?style=for-the-badge" alt="Forks"/>
  <img src="https://img.shields.io/github/issues/relatablepradeep/Aurleaf?style=for-the-badge" alt="Issues"/>
  <img src="https://img.shields.io/github/contributors/relatablepradeep/Aurleaf?style=for-the-badge" alt="Contributors"/>
</div>

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Folder Structure](#-folder-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## About the Project

This is the frontend for Aurleaf, a comprehensive healthcare platform designed to provide users in India with easy access to medical information and services. It's a single-page application (SPA) built with modern web technologies to ensure a fast, responsive, and user-friendly experience.

---

## ✨ Features

- **Hospital Search:** Find hospitals based on their pincode.
- **Doctor Directory:** Search for doctors by city.
- **Medical Product Information:** Browse and search for medical products.
- **Health & Fitness Encyclopedia:** Get information about various diseases and fitness tips.
- **BMI Calculator:** Calculate your Body Mass Index.
- **User Authentication:** Secure user registration and login powered by Clerk.
- **Multi-language Support:** A language translator to make the app accessible to more users.
- **User Reviews:** A rating and review system for services.

---

## 🛠️ Tech Stack

- **Framework:** [React](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **HTTP Client:** [Axios](https://axios-http.com/)

---

## 🚀 Getting Started

Follow these instructions to set up the frontend environment on your local machine.

### Prerequisites

Make sure you have the following software installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/relatablepradeep/Aurleaf.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd Aurleaf/Frontend
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```

### Environment Variables

This project uses environment variables to manage sensitive keys.

1.  Create a `.env` file in the `Frontend` directory by copying the example file:
    ```sh
    cp .env.sample .env
    ```
2.  Add the following environment variable to your new `.env` file:
    -   `VITE_CLERK_PUBLIC_KEY`: Your public key from your Clerk application.

You can get your Clerk public key from the [Clerk Dashboard](https://dashboard.clerk.com/).

### Running the Application

To start the development server, run the following command:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 📂 Folder Structure

Here's an overview of the frontend's directory structure:

```
Frontend/
└── src/
    ├── Assets/         # Static assets like images and logos
    ├── Component/      # Reusable React components
    │   ├── Animation/  # Animation components
    │   ├── Aurleaf/    # Main landing page components
    │   ├── Authenticated/ # Authentication-related components
    │   ├── AyuMed/     # Components for the Doctor Search feature
    │   ├── Ayufit/     # Components for the Disease & Fitness feature
    │   ├── Ayumedical/ # Components for the Medical Products feature
    │   ├── BMI/        # BMI Calculator components
    │   ├── ChatBot/    # Chatbot components
    │   ├── Footer/     # Footer component
    │   ├── Headers/    # Header and navigation components
    │   ├── Language/   # Language translator components
    │   ├── Pincode/    # Pincode-based hospital search components
    │   └── Rating/     # User rating and review components
    ├── config/         # Configuration files (e.g., Clerk config)
    ├── App.tsx         # Main application component with routing
    ├── Root.tsx        # Root component
    ├── index.css       # Global CSS styles
    └── main.tsx        # Entry point of the application
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.


---

## 📜 License

This project is licensed under the ISC License. See the [LICENSE](https://github.com/relatablepradeep/Aurleaf/blob/main/LICENSE) file for details.
