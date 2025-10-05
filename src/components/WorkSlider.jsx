import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WorkSlider({ images }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [paused, images.length]);

  const variants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
  };

  return (
    <div
      className="relative w-full h-[600px] flex items-center justify-center bg-transparent rounded-md overflow-hidden shadow-lg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-dark/60 text-accent2 p-2 rounded-full hover:bg-dark transition z-10"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-dark/60 text-accent2 p-2 rounded-full hover:bg-dark transition z-10"
      >
        &#10095;
      </button>

      {/* Slider Images */}
      <AnimatePresence mode="wait">
        {images.map((img, idx) =>
          idx === current ? (
            <motion.img
              key={img}
              src={img}
              alt="Slider"
              className="absolute max-h-full max-w-full object-contain rounded-md"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
            />
          ) : null
        )}
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-2 flex space-x-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              idx === current ? "bg-primary" : "bg-dark/50"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
