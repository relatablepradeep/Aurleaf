# Aurleaf - Frontend
<div align="center">
<img src="https://img.shields.io/github/stars/relatablepradeep/Aurleaf?style=for-the-badge" alt="Stars"/> <img src="https://img.shields.io/github/forks/relatablepradeep/Aurleaf?style=for-the-badge" alt="Forks"/> <img src="https://img.shields.io/github/issues/relatablepradeep/Aurleaf?style=for-the-badge" alt="Issues"/> <img src="https://img.shields.io/github/contributors/relatablepradeep/Aurleaf?style=for-the-badge" alt="Contributors"/>
</div>
<!-- Contributors collage (auto-updates via contrib.rocks) -->
<a href="https://github.com/relatablepradeep/Aurleaf/graphs/contributors"><img src="https://contrib.rocks/image?repo=relatablepradeep/Aurleaf" alt="Contributors collage"/></a>
<!-- Note: Shields.io has no "collaborators" badge. Consider a GitHub Action to render an SVG from the collaborators API. -->

<style>.aurleaf-card{padding:12px;border:1px solid #e5e7eb;border-radius:12px}.aurleaf-pill{display:inline-block;padding:2px 8px;border:1px solid #e5e7eb;border-radius:999px}.aurleaf-note{opacity:.85}</style>


## Tech Stack

* **Framework:** React

<div class="aurleaf-card">

- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Authentication:** Clerk

</div>

## Libraries Used

<div class="aurleaf-card">

* **@clerk/clerk-react**: User authentication
* **axios**: HTTP requests to backend
* **framer-motion**: Animations
* **lucide-react**: Icons
* **react-router-dom**: Routing
* **tailwindcss**: Styling

</div>

## Features

<div class="aurleaf-card">

* **Hospital Search:** Find hospitals by pincode
* **Doctor Search:** Find doctors by city
* **Medical Products:** Browse/search medical products
* **Disease Information:** Info on diseases and fitness
* **BMI Calculator:** Calculate Body Mass Index
* **User Authentication:** Secure sign-up/login

</div>

## Getting Started

To get a local copy up and running:

### Prerequisites

* <span class="aurleaf-pill">Node.js (v18 or higher)</span>

* <span class="aurleaf-pill">npm</span>

### Installation

<div class="aurleaf-card">

1. Clone the repository:

```sh

git clone https://github.com/relatablepradeep/Aurleaf.git

```

2. Navigate to the frontend directory:

```sh

cd Aurleaf/Frontend

```

3. Install dependencies:

```sh

npm install

```

4. Start the development server:

```sh

npm run dev

```

</div>

## Folder Structure

* `src/` — Main source code

* `Assets/` — Images and assets

* `Component/` — React components

## Notes

<div class="aurleaf-card">

* Uses Clerk for authentication

* All API requests are made to the backend Express server

</div>

## License

This project is licensed under the ISC License.

3. Install NPM packages:

```sh

npm install

```

### Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file. Create a `.env` file in the `Frontend` directory by copying the `.env.sample` file.

`VITE_CLERK_PUBLIC`

You can get this key from [Clerk](https://clerk.com/).

### Running the Application

To start the development server, run the following command:

```sh

npm run dev

```

The application will be available at `http://localhost:5173`.

## Routes

* `/`: Home page
* `/fitness`: Fitness page
* `/fitness/:diseaseId`: Disease details page
* `/hospitals`: Hospitals search page
* `/doctors`: Doctors search page
* `/products/:city`: Products by city page
* `/products`: All products page
* `/BMI`: BMI calculator page

## Folder Structure

```

Frontend/

src/
├── Assets/
├── Component/
│   ├── Animation/
│   ├── Aurleaf/
│   ├── Authenticated/
│   ├── AyuMed/
│   ├── Ayufit/
│   ├── Ayumedical/
│   ├── BMI/
│   ├── ChatBot/
│   ├── Footer/
│   ├── Headers/
│   ├── Language/
│   ├── Pincode/
│   └── Rating/
├── config/
├── App.tsx
├── Root.tsx
├── index.css
└── main.tsx
```


---


## 📜 License

This project is licensed under the GPL-2.0 license .
