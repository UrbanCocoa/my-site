import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import defaultBanner from "../assets/KW/Banner.png";
import cartIcon from "../assets/KW/cart.png";

export default function Banner({ bannerImage, height = "h-48 md:h-64" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getCartCount } = useCart();

  const handleNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="w-full relative">
      {/* Banner image */}
      <img
        src={bannerImage || defaultBanner}
        alt="Banner"
        className={`${height} w-full object-cover shadow-md`}
      />

      {/* Hamburger Menu (fixed) */}
      <div className="fixed top-4 left-4 z-[9999]">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="w-12 h-12 flex items-center justify-center bg-accent1 border-2 border-accent5 rounded-lg shadow-md cursor-pointer transition hover:scale-105"
        >
          <div className="space-y-1.5">
            <span className="block w-6 h-0.5 bg-accent5"></span>
            <span className="block w-6 h-0.5 bg-accent5"></span>
            <span className="block w-6 h-0.5 bg-accent5"></span>
          </div>
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <ul className="absolute left-0 mt-2 w-40 bg-accent1 border border-accent5 rounded-lg shadow-lg overflow-hidden animate-fadeSlide">
            <li
              className="p-3 hover:bg-accent2 cursor-pointer transition"
              onClick={() => handleNavigation("/")}
            >
              Home
            </li>
            <li
              className="p-3 hover:bg-accent2 cursor-pointer transition"
              onClick={() => handleNavigation("/services")}
            >
              Services
            </li>
            <li className="p-3 hover:bg-accent2 cursor-pointer transition">
              Contact
            </li>
          </ul>
        )}
      </div>

      {/* Cart Icon (fixed top-right) */}
      <div className="fixed top-4 right-4 z-[9999]">
        <button
          onClick={() => navigate("/cart")}
          aria-label="View shopping cart"
          className="relative w-12 h-12 flex items-center justify-center bg-accent1 border-2 border-accent5 rounded-lg shadow-md cursor-pointer transition hover:scale-105 p-1"
        >
          {/* Cart Image */}
          <img 
            src={cartIcon} 
            alt="Shopping Cart" 
            className="w-full h-full object-contain"
          />
          
          {/* Cart Count Badge */}
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent4 text-accent5 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
              {getCartCount()}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}