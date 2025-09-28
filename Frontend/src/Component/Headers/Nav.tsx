import { Link, NavLink, useNavigate } from "react-router";
import logo from "../../Assets/logo.png";
import { useState } from "react";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white bg-gradient-to-b from-amber-100 via-amber-50 to-white shadow sticky top-0 z-20 border-b border-amber-200">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-2">
        {/* Logo and Title */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} className="h-14 w-auto" alt="Logo" />
            <span className="text-3xl font-semibold text-amber-900 hover:text-amber-600 transition-colors">
              Ayurleaf
            </span>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex md:space-x-12 absolute left-1/2 transform -translate-x-1/2">
          {[
            { to: "/fitness", label: "AyuFit" },
            { to: "/products", label: "AyuMed" },
            { to: "/doctors", label: "AyuDoctor" },
            { to: "/hospitals", label: "AyuHospitals" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative text-lg font-medium tracking-wide px-4 py-1 rounded-md
                 transition-all duration-200 ease-out
                 ${isActive ? "text-amber-900 bg-amber-200" : "text-amber-800"}
                 hover:text-white hover:bg-amber-600 hover:scale-110`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-amber-900 p-2 rounded-md focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-7 h-7"
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
        <div className="md:hidden bg-amber-50 border-t border-amber-200 p-4">
          {[
            { to: "/fitness", label: "AyuFit" },
            { to: "/products", label: "AyuMed" },
            { to: "/doctors", label: "AyuDoctor" },
            { to: "/hospitals", label: "AyuHospitals" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="block py-2 text-xl text-amber-900 hover:text-white hover:bg-amber-600 hover:scale-105 rounded-md transition-all"
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={() => navigate("/BMI")}
            className="w-full mt-3 text-black bg-amber-500 hover:bg-amber-600 font-medium rounded-lg text-2xl px-5 py-2 transition-colors"
          >
            Get Instant Help
          </button>
        </div>
      )}
    </nav>
  );
}

export default Nav;
