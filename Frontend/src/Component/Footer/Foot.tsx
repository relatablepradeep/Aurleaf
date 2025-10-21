import { Link, NavLink } from "react-router-dom";
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from "../../Assets/logo.png";

export default function Foot() {
  return (
    <footer className="w-full bg-gradient-to-b from-amber-100 via-amber-50 to-white text-amber-900 px-8 md:px-16 lg:px-24 py-20 font-[Inter] border-t border-amber-200 shadow-inner relative z-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left relative">

        {/* BRAND / ABOUT SECTION */}
        <div className="relative md:pr-8">
          <Link
            to="/"
            className="flex items-center justify-center md:justify-start text-4xl font-extrabold tracking-tight text-amber-700 mb-6 hover:scale-105 transition-transform"
          >
            <img
              src={logo}
              className="h-16 w-auto mr-2 drop-shadow-md"
              alt="Ayurleaf Logo"
            />
            Ayurleaf
          </Link>
          <p className="text-amber-800 text-base leading-relaxed">
            Ayurleaf is your all-in-one Ayurvedic medical platform, merging ancient healing with AI innovation. Discover trusted doctors, natural remedies, and personalized health insights — all in one place.
          </p>

          {/* Vertical Divider */}
          <div className="hidden md:block absolute right-0 top-0 h-full border-r border-amber-200"></div>
        </div>

        {/* QUICK LINKS */}
        <div className="relative md:px-8">
          <h3 className="text-2xl font-bold text-amber-800 mb-6 border-b-2 border-amber-400 inline-block pb-1">
            🔗 Quick Links
          </h3>
          <ul className="space-y-4 text-base text-amber-700">
            <li>
              <NavLink
                to="/fitness"
                className="hover:text-amber-600 transition-colors duration-300"
              >
                AyuFit — AI Fitness
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className="hover:text-amber-600 transition-colors duration-300"
              >
                AyuMed — Medical Store
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/doctors"
                className="hover:text-amber-600 transition-colors duration-300"
              >
                AyuDoctor — Book Doctors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hospitals"
                className="hover:text-amber-600 transition-colors duration-300"
              >
                AyuHospitals — Find Clinics
              </NavLink>
            </li>
          </ul>

          {/* Vertical Divider */}
          <div className="hidden md:block absolute right-0 top-0 h-full border-r border-amber-200"></div>
        </div>

        {/* CONTACT SECTION */}
        <div className="md:pl-8">
          <h3 className="text-2xl font-bold text-amber-800 mb-6 border-b-2 border-amber-400 inline-block pb-1">
            📬 Contact Us
          </h3>
          <ul className="space-y-4 text-base text-amber-700">
            <li className="flex items-center justify-center md:justify-start space-x-2">
              <FaEnvelope className="text-amber-600" />{" "}
              <span>support@ayurleaf.com</span>
            </li>
            <li className="flex items-center justify-center md:justify-start space-x-2">
              <FaPhoneAlt className="text-amber-600" />{" "}
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-start justify-center md:justify-start space-x-2">
              <FaMapMarkerAlt className="text-amber-600 mt-1" />{" "}
              <span>
                Ayurleaf Technologies Pvt. Ltd. <br />
                4th Floor, Balewadi High Street, <br />
                Pune, Maharashtra, India – 411045
              </span>
            </li>
          </ul>
          

          {/* Social Media Links */}
          <div className="flex justify-center md:justify-start space-x-6 mt-8 text-amber-700">
            {[{
              icon: FaTwitter,
              link: "https://x.com/rascal_rookiee",
              label: "Twitter"
            },{
              icon: FaLinkedin,
              link: "https://www.linkedin.com/in/relatablepradeep/",
              label: "LinkedIn"
            },{
              icon: FaGithub,
              link: "https://github.com/relatablepradeep/Aurleaf",
              label: "GitHub"
            }].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="hover:text-amber-600 transition-transform transform hover:scale-110"
              >
                <social.icon size={26} />
              </a>
            ))}
          </div>
        </div>

        {/* USER QUERY / ASK US SECTION */}
        <div className="md:pl-8">
          <h3 className="text-2xl font-bold text-amber-800 mb-6 border-b-2 border-amber-400 inline-block pb-1">
            ❓ Ask Us
          </h3>
          <p className="text-amber-700 mb-4 text-sm">
            Have a question or need assistance? Send us your query and our team will respond promptly.
          </p>
          <form className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="px-4 py-2 rounded-md border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 rounded-md border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <textarea
              placeholder="Your Query"
              className="px-4 py-2 rounded-md border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              rows={3}
            ></textarea>
            <button
              type="submit"
              className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-500 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>

      </div>

      {/* Divider */}
      <div className="w-full border-t border-amber-300 my-12"></div>

      {/* ACKNOWLEDGMENTS & COPYRIGHT */}
      <div className="text-center space-y-3">
        <p className="text-base text-amber-800">
          <strong>Acknowledgments:</strong> Thanks to{" "}
          <span className="font-semibold">mg1</span> for medical remedies info,
          and <span className="font-semibold">AppoDoctor</span> for doctor-related data and support.
        </p>
        <p className="text-base text-amber-700">
          © 2025{" "}
          <Link
            to="/"
            className="hover:underline text-amber-600 font-semibold"
          >
            Ayurleaf™
          </Link>{" "}
          — Designed & Developed by{" "}
          <a
            href="https://github.com/relatablepradeep"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-amber-600 font-semibold"
          >
            @relatablepradeep
          </a>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
