import { Link, NavLink } from "react-router-dom"; 
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import logo from "../../Assets/logo.png";

export default function Foot() {
  return (
    <footer className="w-full bg-amber-50 text-amber-900 px-4 md:px-8 lg:px-10 py-10 font-[Inter] border-t border-amber-100">
      <div className="max-w-screen-xl mx-auto text-center flex flex-col items-center relative">

        {/* Logo and Brand */}
        <Link
          to="/"
          className="flex items-center text-3xl mb-4 font-extrabold tracking-tight text-amber-700"
        >
          <img src={logo} className="h-20 w-auto mr-2" alt="Aurleaf Logo" />
          Aurleaf
        </Link>

        {/* Description */}
        <p className="text-amber-800 mt-16 max-w-lg text-base">
          Ayurleaf — Your personal doctor who truly cares about you.
        </p>

        {/* Navigation Links */}
        <div className="hidden md:flex md:space-x-8 mt-28 absolute left-1/2 transform -translate-x-1/2">
          <NavLink
            to="/fitness"
            className={({ isActive }) =>
              `text-2xl font-medium ${isActive ? "text-amber-900" : "text-amber-800 hover:text-amber-600"}`
            }
          >
            AyuFit
          </NavLink>
          <NavLink
            to="/products"
            className="text-2xl font-medium text-amber-800 hover:text-amber-600"
          >
            AyuMed
          </NavLink>
          <NavLink
            to="/doctors"
            className="text-2xl font-medium text-amber-800 hover:text-amber-600"
          >
            AyuDoctor
          </NavLink>
          <NavLink
            to="/hospitals"
            className="text-2xl font-medium text-amber-800 hover:text-amber-600"
          >
            AyuHospitals
          </NavLink>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 justify-center mt-10 mb-4 text-amber-700">
          <a
            href="https://x.com/rascal_rookiee"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-600"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/relatablepradeep/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-600"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/relatablepradeep/Aurleaf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-600"
          >
            <FaGithub size={24} />
          </a>
        </div>

        {/* Copyright */}
        <span className="text-sm text-amber-700 m-5">
          © 2025 <Link to="/" className="hover:underline text-amber-600">Ayurleaf™</Link>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

