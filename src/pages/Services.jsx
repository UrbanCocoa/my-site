// src/pages/Services.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/banner.jsx";
import longBanner from "../assets/KW/longbanner.png";

// Product images
import celicaImg from "../assets/cartoons/celica.png";
import jukeStickers from "../assets/pics/jukestickers.jpg";
import duraMaxStickers from "../assets/pics/duramaxstickers.jpg";
import threeSticker from "../assets/pics/3sticker.PNG";
import stickerWindow from "../assets/pics/stickerWindow.png";

const currencies = ["CAD","USD","EUR","GBP","AUD","NZD","JPY","CNY","INR","MXN"];

// Define products
const products = [
  { name: "Digital Artwork of your Car!", img: celicaImg, priceCAD: 20 },
  { 
    name: "Custom Car Stickers!", 
    slider: [jukeStickers, duraMaxStickers, threeSticker, stickerWindow], 
    priceCAD: 30 
  }
];

export default function Services() {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState("CAD");
  const [convertedPrices, setConvertedPrices] = useState(products.map(p => p.priceCAD));
  const [rates, setRates] = useState({ CAD: 1 }); // Start with CAD rate
  const [currentSlides, setCurrentSlides] = useState(products.map(() => 0));
  const [fade, setFade] = useState(true);

  // Fetch conversion rates
  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/CAD")
      .then(res => res.json())
      .then(data => {
        if (data.rates) {
          setRates(data.rates);
        }
      })
      .catch(err => {
        console.log("Error fetching rates:", err);
      });
  }, []);

  // Update prices when currency changes
  useEffect(() => {
    if (rates[currency]) {
      setConvertedPrices(products.map(p => (p.priceCAD * rates[currency]).toFixed(2)));
    } else {
      setConvertedPrices(products.map(p => p.priceCAD));
    }
  }, [currency, rates]);

  // Slider auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentSlides(prev => prev.map((slide, i) => {
          if (products[i].slider) {
            return (slide + 1) % products[i].slider.length;
          }
          return slide;
        }));
        setFade(true);
      }, 500);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-screen bg-accent3 text-accent5 font-custom relative overflow-x-hidden">
      <Banner bannerImage={longBanner} height="h-48 md:h-64" /> 

      <header className="flex justify-center items-center p-8 bg-accent3/90 shadow-lg animate-fade-in">
        <h1 className="text-4xl font-extrabold">Services</h1>
      </header>

      <main className="flex flex-wrap justify-center gap-8 p-10 flex-1">
        {products.map((product, i) => (
          <div
            key={i}
            className="rounded-xl shadow-lg p-6 max-w-sm flex flex-col items-center relative overflow-hidden transition-transform duration-300 animate-fade-in hover:scale-105 bg-accent2/40"
          >
            {product.slider ? (
              <div className="w-72 h-48 relative overflow-hidden rounded-lg mb-4 flex items-center justify-center bg-black">
                {/* Blurred background */}
                <img
                  src={product.slider[currentSlides[i]]}
                  alt="Background Blur"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover scale-125 blur-lg opacity-60 z-0"
                />
                {/* Foreground sticker */}
                <img
                  src={product.slider[currentSlides[i]]}
                  alt={product.name}
                  loading="lazy"
                  className={`relative z-10 w-full h-full object-contain transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
                />
              </div>
            ) : (
              <img
                src={product.img}
                alt={product.name}
                loading="lazy"
                className="relative z-10 max-w-full rounded-lg mb-4 object-contain"
              />
            )}

            <h2 className="relative z-10 text-2xl font-bold mb-2 text-center">{product.name}</h2>
            <p className="relative z-10 text-lg font-semibold mb-4 transition-all duration-500">
              {convertedPrices[i]} {currency}
            </p>

            {/* Buy Now buttons */}
            {product.name === "Digital Artwork of your Car!" ? (
              <button
                onClick={() => navigate("/customize-artwork")}
                className="relative z-10 px-6 py-3 bg-accent3 hover:bg-darker text-accent5 rounded-lg font-semibold shadow-md transition"
              >
                Buy Now
              </button>
            ) : (
              <button
                onClick={() => navigate("/customize-stickers")}
                className="relative z-10 px-6 py-3 bg-accent3 hover:bg-darker text-accent5 rounded-lg font-semibold shadow-md transition"
              >
                Buy Now
              </button>
            )}
          </div>
        ))}
      </main>

      {/* Currency Selector */}
      <div className="fixed bottom-6 left-6 flex flex-col items-start z-50 animate-fade-in">
        <label className="mb-2 font-semibold">Select Currency:</label>
        <select
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          className="p-2 rounded-lg bg-accent2 text-accent3 font-semibold focus:outline-none shadow-md transition"
        >
          {currencies.map(cur => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
