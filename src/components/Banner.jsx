import { useState } from "react";
import defaultBanner from "../assets/KW/Banner.png";

export default function Banner({ bannerImage, height = "h-48 md:h-64" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full relative">
      {/* Banner image */}
      <img
        src={bannerImage || defaultBanner}
        alt="Banner"
        className={`${height} w-full object-cover shadow-md`}
      />

      {/* Hamburger Menu (fixed) */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
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
              onClick={() => (window.location.href = "/")}
            >
              Home
            </li>
            <li
              className="p-3 hover:bg-accent2 cursor-pointer transition"
              onClick={() => (window.location.href = "/services")}
            >
              Services
            </li>
            <li className="p-3 hover:bg-accent2 cursor-pointer transition">
              Contact
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
