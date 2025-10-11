import bannerImg from "./assets/KW/banner.png";
import KWpage from "./assets/KW/kwpage.png";

// Cartoon slider images
import celicaImg from "./assets/cartoons/celica.png";
import fcImg from "./assets/cartoons/fc.png";
import fdImg from "./assets/cartoons/fd.png";
import golfImg from "./assets/cartoons/golf.png";
import kebinImg from "./assets/cartoons/kebin.png";
import nrdiftImg from "./assets/cartoons/nrdrift.png";
import rmzImg from "./assets/cartoons/rmz.png";
import rsxImg from "./assets/cartoons/rsx.png";
import toastImg from "./assets/cartoons/toast.png";
import wrxImg from "./assets/cartoons/wrx.png";

// Photography slider images
import blueGTR from "./assets/photography/bluegtredit.jpg";
import BRZ from "./assets/photography/brzedit.jpg";
import elseEdit from "./assets/photography/elseedit.jpg";
import FD from "./assets/photography/fdedit.jpg";
import GTR from "./assets/photography/gtredit.jpg";
import inside from "./assets/photography/insideedit.jpg";
import Juke from "./assets/photography/jukeedit.jpg";
import snap from "./assets/photography/snapedit.jpg";
import sup from "./assets/photography/sup.jpg";
import TOAST from "./assets/photography/toast.jpg";
import Zline from "./assets/photography/zlineedit.jpg";

import instaLogo from "./assets/KW/instagram.png";
import Banner from "./components/Banner.jsx";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const cartoonImages = [celicaImg, fcImg, fdImg, golfImg, kebinImg, nrdiftImg, rmzImg, rsxImg, toastImg, wrxImg];
  const photographyImages = [blueGTR, BRZ, elseEdit, FD, GTR, inside, Juke, snap, sup, TOAST, Zline];

  // Cartoon slider state
  const [currentCartoon, setCurrentCartoon] = useState(0);
  const [fade, setFade] = useState(true);

  // Photography belt refs
  const photoBeltRef = useRef(null);
  const parallaxOffset = useRef(0);

  // Cartoon slider auto-advance with fade
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentCartoon(prev => (prev + 1) % cartoonImages.length);
        setFade(true);
      }, 500); // fade duration
    }, 3500);
    return () => clearInterval(interval);
  }, [cartoonImages.length]);

  // Photography belt animation with parallax
  useEffect(() => {
    const belt = photoBeltRef.current;
    let pos = 0;
    let reqId;

    function animate() {
      pos -= 0.35; // slightly slower speed
      parallaxOffset.current = pos * 0.2; // subtle parallax

      if (pos <= -belt.scrollWidth / 2) pos = 0;
      belt.style.transform = `translateX(${pos}px)`;
      belt.style.backgroundPosition = `${parallaxOffset.current}px center`;
      reqId = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(reqId);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-screen bg-accent3 text-accent5 font-custom">
      {/* Banner */}
      <Banner bannerImage={bannerImg} height="h-96 md:h-[28rem]" />

      {/* Hero Section */}
      <header className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 bg-accent3" style={{ minHeight: '22rem' }}>
        {/* Left: Hero Text */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-accent5">Welcome to KooWhips</h2>
          <p className="mt-4 text-lg md:text-xl text-accent5 max-w-md">
            Turn your cool cars and automobiles into digital artwork and stickers!
          </p>
          <div className="mt-6 flex space-x-4">
            <button
              onClick={() => navigate("/services")}
              className="px-6 py-2 bg-accent2 hover:bg-accent4 text-accent5 rounded-lg font-semibold shadow-md transition"
            >
              Get Started
            </button>
            <button className="px-6 py-2 bg-accent1 hover:bg-accent4 text-accent5 rounded-lg font-semibold shadow-md transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right: Instagram */}
        <div className="flex-1 flex flex-col justify-center items-center text-center mt-6 md:mt-0 relative">
          <a href="https://www.instagram.com/koowhips" target="_blank" rel="noopener noreferrer">
            <h3 className="absolute top-0 text-3xl font-bold text-accent5 z-20">My Instagram!</h3>
            <img
              src={instaLogo}
              alt="Instagram Logo"
              className="w-56 h-56 md:w-72 md:h-72 object-contain transition-transform duration-500 hover:scale-110 hover:rotate-3"
            />
          </a>
        </div>
      </header>

      {/* Work Section */}
      <section className="flex flex-col items-center p-8 md:p-10 bg-accent2 min-h-[80vh]">
        <h3 className="text-3xl font-bold mb-6">My work so far!</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Cartoon Slider */}
          <div className="bg-accent3 rounded-lg shadow-md p-6 flex flex-col items-center w-full h-96 md:h-[34rem] overflow-hidden relative">
            <h4 className="text-xl font-semibold mb-2">Car Toons</h4>
            {/* Fixed "window" for cartoon slider */}
            <div
              className="w-full h-full flex items-center justify-center relative overflow-hidden rounded-md"
              style={{ backgroundImage: `url(${KWpage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <img
                src={cartoonImages[currentCartoon]}
                alt="Cartoon Slider"
                loading="lazy"
                className={`absolute h-5/6 object-contain rounded-md transition-opacity duration-700 ${fade ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          </div>

          {/* Photography Belt Slider */}
          <div className="bg-accent3 rounded-lg shadow-md p-6 flex flex-col items-center w-full h-96 md:h-[34rem] overflow-hidden relative">
            <h4 className="text-xl font-semibold mb-2">Photography</h4>
            <div className="w-full h-full relative flex items-center">
              <div
                className="flex whitespace-nowrap absolute left-0 top-0 h-full items-center"
                ref={photoBeltRef}
                style={{ gap: '1.5rem' }}
              >
                {photographyImages.concat(photographyImages).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Photography Slider"
                    className="h-5/6 object-contain rounded-md transition-transform duration-700"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-accent1 p-4 text-center text-accent5">
        <p>&copy; {new Date().getFullYear()} KooWhips. All rights reserved.</p>
      </footer>
    </div>
  );
}