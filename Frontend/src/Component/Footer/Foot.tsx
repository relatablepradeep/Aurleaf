import { Link, NavLink } from "react-router-dom";
import logo from "../../Assets/logo.png";

export default function Foot() {
  return (
    <footer className="w-full bg-amber-50 text-amber-900 px-4 md:px-8 lg:px-10 py-10 font-[Inter] border-t border-amber-100">
      <div className="max-w-screen-xl mx-auto text-center flex flex-col items-center">

        {/* Logo + Brand */}
        <Link
          to="/"
          className="flex items-center text-3xl mb-4 font-extrabold tracking-tight text-amber-700"
        >
          <img src={logo} className="h-20 w-auto mr-2" alt="Aurleaf Logo" />
          Aurleaf
        </Link>

        {/* Tagline */}
        <p className="text-amber-800 mt-6 max-w-lg text-base">
          Ayurleaf — Your personal doctor who truly cares about you.
        </p>

        {/* Links (responsive grid) */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-lg">
          <NavLink
            to="/fitness"
            className={({ isActive }) =>
              `text-lg font-medium ${
                isActive ? "text-amber-900" : "text-amber-800 hover:text-amber-600"
              }`
            }
          >
            AyuFit
          </NavLink>
          <NavLink
            to="/products"
            className="text-lg font-medium text-amber-800 hover:text-amber-600"
          >
            AyuMed
          </NavLink>
          <NavLink
            to="/doctors"
            className="text-lg font-medium text-amber-800 hover:text-amber-600"
          >
            AyuDoctor
          </NavLink>
          <NavLink
            to="/hospitals"
            className="text-lg font-medium text-amber-800 hover:text-amber-600"
          >
            AyuHospitals
          </NavLink>
        </div>

        {/* Copyright */}
        <span className="text-sm text-amber-700 mt-8">
          © 2025{" "}
          <Link to="/" className="hover:underline text-amber-600">
            Ayurleaf™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
