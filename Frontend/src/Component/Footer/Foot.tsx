import { Link } from "react-router";
import logo from "../../Assets/logo.png";

export default function Foot() {
  return (
    <footer className="w-full bg-amber-50 text-amber-900 px-4 md:px-8 lg:px-10 py-10 font-[Inter] border-t border-amber-100">
      <div className="max-w-screen-xl mx-auto text-center flex flex-col items-center">

        <Link
          to="/"
          className="flex items-center text-3xl font-extrabold tracking-tight text-amber-700 mb-4"
        >
          <img src={logo} className="h-20 w-auto mr-2" alt="Aurleaf Logo" />
          Aurleaf
        </Link>

        <p className="text-amber-800 mb-6 max-w-lg text-base">
          Aurleaf — Your personal doctor who truly cares about you.
        </p>

        <ul className="flex flex-wrap justify-center gap-4 md:gap-6 text-base font-medium text-amber-800 mb-6">
          <li><Link to="/fitness" className="hover:text-amber-600 transition">AyuFit</Link></li>
          <li><Link to="/product" className="hover:text-amber-600 transition">AyuMed</Link></li>
          <li><Link to="/Doctor" className="hover:text-amber-600 transition">AyuDoctor</Link></li>
          <li><Link to="/blog" className="hover:text-amber-600 transition">Blog</Link></li>
          <li><Link to="/hospitals" className="hover:text-amber-600 transition">AyuHospitals</Link></li>
          <li><Link to="/faqs" className="hover:text-amber-600 transition">FAQs</Link></li>
          <li><Link to="/contact" className="hover:text-amber-600 transition">Contact</Link></li>
        </ul>

        <span className="text-sm text-amber-700">
          © 2025 <Link to="/" className="hover:underline text-amber-600">Aurleaf™</Link>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
