import { useState, useEffect } from "react";

export default function Slider({ images, interval = 3500 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 500); // match fade duration
    }, interval);

    return () => clearInterval(sliderInterval);
  }, [images, interval]);

  return (
    <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-lg shadow-lg bg-black flex items-center justify-center">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className={`w-full h-full object-contain transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
