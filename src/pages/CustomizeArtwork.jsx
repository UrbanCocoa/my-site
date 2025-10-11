// src/pages/CustomizeArtwork.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import Banner from "../components/banner.jsx";
import Bigpage from "../assets/KW/bigpage.png";

const currencies = ["CAD","USD","EUR","GBP","AUD","NZD","JPY","CNY","INR","MXN"];
const currencySymbols = {
  CAD: "$", USD: "$", EUR: "€", GBP: "£", AUD: "$", NZD: "$", JPY: "¥", CNY: "¥", INR: "₹", MXN: "$"
};

export default function CustomizeArtwork() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [numProjects, setNumProjects] = useState(1);
  const [price, setPrice] = useState(20); // 1 project default $20 CAD
  const [uploadedImages, setUploadedImages] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [currency, setCurrency] = useState("CAD");
  const [rates, setRates] = useState({ CAD: 1 });
  const [bgLoaded, setBgLoaded] = useState(false);

  // Preload decorative background
  useEffect(() => {
    const img = new Image();
    img.src = Bigpage;
    img.onload = () => setBgLoaded(true);
  }, []);

  // Fetch exchange rates (base = CAD)
  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/CAD")
      .then(res => res.json())
      .then(data => {
        if (data.rates) setRates(data.rates);
      })
      .catch(err => {
        console.error("Error fetching rates:", err);
      });
  }, []);

  // Recalculate displayed price whenever number of projects or selected currency changes
  useEffect(() => {
    const basePriceCAD = 20 + (numProjects - 1) * 10; // 1 -> 20, 2 -> 30, 3 -> 40
    if (rates[currency]) {
      setPrice((basePriceCAD * rates[currency]).toFixed(2));
    } else {
      setPrice(basePriceCAD.toFixed(2));
    }
  }, [numProjects, currency, rates]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setUploadedImages(files);
  };

  const handleAddToCart = () => {
    if (uploadedImages.length < numProjects) {
      alert(`⚠️ Please upload at least ${numProjects} image(s).`);
      return;
    }

    const item = {
      type: "Digital Artwork",
      numProjects,
      price,
      currency,
      instructions: instructions.trim(),
      imageFiles: uploadedImages
    };

    addToCart(item);
    navigate("/cart");
  };

  return (
    <div className="relative flex flex-col min-h-screen w-screen font-custom overflow-x-hidden bg-accent3 text-accent5">
      {bgLoaded && (
        <div
          className="fixed inset-0 w-full h-full z-0 pointer-events-none"
          style={{
            backgroundImage: `url(${Bigpage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
            transform: "scale(1.5)",
          }}
        />
      )}

      <div className="relative z-[999]"><Banner height="h-32 md:h-44" /></div>

      <header className="relative z-[100] flex justify-center items-center p-8 bg-accent3 shadow-lg">
        <h1 className="text-4xl font-extrabold text-accent5">Customize Your Digital Artwork</h1>
      </header>

      <main className="relative z-[100] flex justify-center items-start p-10 flex-1 gap-8">
        <div className="w-full max-w-lg p-8 flex flex-col gap-6 rounded-xl shadow-lg bg-accent2">
          
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-accent5">Number of Projects:</label>
            <select
              value={numProjects}
              onChange={(e) => setNumProjects(parseInt(e.target.value))}
              className="p-2 rounded-lg bg-accent3 text-accent5 font-semibold focus:outline-none shadow-md"
            >
              {[1,2,3].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <p className="text-sm text-accent5/70 mt-1">Each additional project +$10 CAD (before currency conversion)</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-accent5">Upload Images (minimum = number of projects):</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="p-2 rounded-lg bg-accent3 text-accent5 shadow-md pointer-events-auto"
            />
            {uploadedImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {uploadedImages.map((file, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${idx}`}
                    className="w-24 h-24 object-contain rounded-lg border border-accent3"
                  />
                ))}
              </div>
            )}
            <p className="text-sm text-accent5/70 mt-1">{uploadedImages.length} uploaded — you need at least {numProjects}.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-accent5">Specific Instructions:</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={4}
              placeholder="Enter any specific instructions..."
              className="p-2 rounded-lg bg-accent3 text-accent5 shadow-md resize-none"
            />
          </div>

          <div className="flex justify-between items-center bg-accent3 p-4 rounded-lg shadow-md mt-4">
            <span className="font-bold text-lg text-accent5">Price:</span>
            <span className="font-semibold text-base text-accent5">{currencySymbols[currency]}{price}</span>
          </div>

          <button
            onClick={handleAddToCart}
            type="button"
            className="px-6 py-4 mt-4 text-lg font-bold rounded-lg shadow-md text-accent5 bg-accent3 hover:bg-darker transition"
          >
            Add to Cart
          </button>

        </div>
      </main>

      {/* Currency Selector */}
      <div className="fixed bottom-6 left-6 flex flex-col items-start z-[9999] pointer-events-auto">
        <label className="mb-2 font-semibold text-accent5">Select Currency:</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="p-2 rounded-lg bg-accent2 text-accent5 font-semibold focus:outline-none shadow-md transition pointer-events-auto"
        >
          {currencies.map(cur => <option key={cur} value={cur}>{cur}</option>)}
        </select>
      </div>
    </div>
  );
}
