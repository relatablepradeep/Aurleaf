import { Link } from "react-router";
import logo from "../../Assets/logo.png";
import { useState } from "react";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Left: Logo & Aurleaf */}
        <div className="flex items-center">
          <Link to="/home" className="flex items-center space-x-3">
            <img src={logo} className="h-28 w-auto" alt="Logo" />
            <span className="text-4xl font-semibold dark:text-white">Aurleaf</span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex md:space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <Link to="/fitness" className="text-2xl font-medium text-gray-900 hover:text-blue-700 dark:text-white">
          AyuFit

          </Link>
          <Link to="/products" className="text-2xl font-medium text-gray-900 hover:text-blue-700 dark:text-white">
          AyuMed
          </Link>
          <Link to="/doctors" className="text-2xl font-medium text-gray-900 hover:text-blue-700 dark:text-white">
          AyuDoctor
          </Link>
          <Link to="/hospitals" className="text-2xl font-medium text-gray-900 hover:text-blue-700 dark:text-white">
          AyuHospitals
          </Link>
        </div>

        {/* Right: Get Started Button */}
        <div className="hidden md:flex">
          <button className="text-white bg-gray-400 hover:bg-gray-500 font-medium rounded-lg text-3xl px-6 py-3 dark:bg-gray-400 dark:hove:bg-gray-500">
            emergency
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-500 dark:text-white p-2 rounded-md focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 dark:bg-gray-800 p-4">
          <Link to="/" className="block py-2 text-2xl text-gray-900 dark:text-white">Home</Link>
          <Link to="/about" className="block py-2 text-2xl text-gray-900 dark:text-white">About</Link>
          <Link to="/services" className="block py-2 text-2xl text-gray-900 dark:text-white">Services</Link>
          <Link to="/contact" className="block py-2 text-2xl text-gray-900 dark:text-white">Contact</Link>
          <button className="w-full mt-3 text-white bg-gray-400 hover:bg-gray-500 font-medium rounded-lg text-3xl px-6 py-3 dark:bg-gray-400 dark:hover:bg-gray-500">
            Emergency
          </button>
        </div>
      )}
    </nav>
  );
}

export default Nav;
