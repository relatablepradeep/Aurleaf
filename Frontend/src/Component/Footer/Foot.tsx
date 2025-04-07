import { Link } from "react-router"; 
import logo from "../../Assets/logo.png";

export default function Foot() {
  return (
    <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-900 w-full">
      <div className="mx-auto max-w-screen-xl text-center">
      
        <Link to="/" className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
          <img src={logo} className="h-28 w-auto mr-2" alt="Logo" />
          Aurleaf
        </Link>
        
      
        <p className="my-6 text-gray-500 dark:text-gray-400">
          Aurleaf your personal doctor, who really care about you
        </p>
        
     
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          <li><Link to="/fitness" className="mr-4 hover:underline md:mr-6">AyuFit</Link></li>
          <li><Link to="/product" className="mr-4 hover:underline md:mr-6">AyuMed</Link></li>
          <li><Link to="/Doctor" className="mr-4 hover:underline md:mr-6">AyuDoctor</Link></li>
          <li><Link to="/blog" className="mr-4 hover:underline md:mr-6">Blog</Link></li>
          <li><Link to="/hospitals" className="mr-4 hover:underline md:mr-6">AyuHospitals</Link></li>
          <li><Link to="/faqs" className="mr-4 hover:underline md:mr-6">FAQs</Link></li>
          <li><Link to="/contact" className="mr-4 hover:underline md:mr-6">Contact</Link></li>
        </ul>
        
      
        <span className="text-sm text-gray-900 sm:text-center dark:text-gray-400">
          © 2025 <Link to="/" className="hover:underline">Aurleaf™</Link>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}