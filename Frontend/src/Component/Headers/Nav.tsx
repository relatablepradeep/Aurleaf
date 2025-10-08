import { Link, NavLink, useNavigate } from "react-router";
import logo from "../../Assets/logo.png";
import { useState } from "react";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <nav className="bg-white bg-gradient-to-b from-amber-100 via-amber-50 to-white transition-all shadow sticky w-full top-0 start-0 border-b border-amber-200 z-100">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} className="h-12 w-auto sm:h-16 md:h-20" alt="Logo" />
            <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-amber-900 hover:text-amber-600">
              Ayurleaf
            </span>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex md:space-x-8 justify-center w-full">
        <div className="hidden md:flex md:space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <NavLink to="/" className="text-2xl font-medium text-amber-800 underline hover:text-amber-600">
            Home
          </NavLink>
          <NavLink
            to="/fitness"
            className={({ isActive }) =>
              `text-2xl font-medium ${
                isActive
                  ? "text-amber-900"
                  : "text-amber-800 underline hover:text-amber-600"
              }`
            }
          >
            AyuFit
          </NavLink>
          <NavLink
            to="/products"
            className="text-2xl font-medium text-amber-800 underline hover:text-amber-600"
          >
            AyuMed
          </NavLink>
          <NavLink
            to="/doctors"
            className="text-2xl font-medium text-amber-800 underline hover:text-amber-600"
          >
            AyuDoctor
          </NavLink>
          <NavLink
            to="/hospitals"
            className="text-2xl font-medium text-amber-800 underline hover:text-amber-600"
          >
            AyuHospitals
          </NavLink>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-amber-900 p-2 rounded-md focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-amber-50 border-t border-amber-200 p-4 space-y-2 transition-all duration-300">
          <NavLink
            to="/fitness"
            className="block py-2 text-xl sm:text-2xl text-amber-900 hover:text-amber-600"
          >
            AyuFit
          </NavLink>
          <NavLink
            to="/products"
            className="block py-2 text-xl sm:text-2xl text-amber-900 hover:text-amber-600"
          >
            AyuMed
          </NavLink>
          <NavLink
            to="/doctors"
            className="block py-2 text-xl sm:text-2xl text-amber-900 hover:text-amber-600"
          >
            AyuDoctor
          </NavLink>
          <NavLink
            to="/hospitals"
            className="block py-2 text-xl sm:text-2xl text-amber-900 hover:text-amber-600"
          >
            AyuHospitals
          </NavLink>
          <button
            onClick={() => navigate("/BMI")}
            className="w-full mt-3 text-black bg-amber-500 hover:bg-amber-600 font-medium rounded-lg text-lg sm:text-xl px-4 py-2"
          >
            Get Instant Help
          </button>
        </div>
      )}
    </nav>
  );
}

export default Nav;
