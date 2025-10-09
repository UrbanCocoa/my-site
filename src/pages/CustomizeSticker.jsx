// src/pages/CustomizeSticker.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import Banner from "../components/Banner.jsx";
import Bigpage from "../assets/KW/Bigpage.png";

const currencies = ["CAD","USD","EUR","GBP","AUD","NZD","JPY","CNY","INR","MXN"];
const currencySymbols = {
  CAD: "$", USD: "$", EUR: "€", GBP: "£", AUD: "$", NZD: "$", JPY: "¥", CNY: "¥", INR: "₹", MXN: "$"
};

export default function CustomizeSticker() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [numStickers, setNumStickers] = useState(1);
  const [price, setPrice] = useState(30);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [instructions, setInstructions] = useState("");
  const [currency, setCurrency] = useState("CAD");
  const [rates, setRates] = useState({ CAD: 1 });
  const [bgLoaded, setBgLoaded] = useState(false);

  // Preload background
  useEffect(() => {
    const img = new Image();
    img.src = Bigpage;
    img.onload = () => setBgLoaded(true);
  }, []);

  // Fetch currency rates
  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/CAD")
      .then(res => res.json())
      .then(data => { if(data.rates) setRates(data.rates); })
      .catch(err => console.error(err));
  }, []);

  // Update price whenever numStickers or currency changes
  useEffect(() => {
    const basePrice = 30 + (numStickers - 1);
    const newPrice = rates[currency] ? (basePrice * rates[currency]).toFixed(2) : basePrice;
    setPrice(newPrice);
  }, [numStickers, currency, rates]);

  const handleFileChange = (e) => {
    setUploadedImage(e.target.files[0] || null);
  };

  const handleAddToCart = () => {
    if(!uploadedImage){
      alert("⚠️ Please upload at least 1 image!");
      return;
    }

    const item = {
      type: "Stickers",
      numStickers,
      price,
      currency,
      instructions: instructions.trim(),
      imageFiles: [uploadedImage]
    };

    addToCart(item);
    navigate("/cart");
  };

  return (
    <div className="relative flex flex-col min-h-screen w-screen font-custom bg-accent3 text-accent5 overflow-x-hidden">
      {bgLoaded && (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none"
             style={{backgroundImage: `url(${Bigpage})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1, transform: "scale(1.5)"}} />
      )}

      <div className="relative z-10"><Banner height="h-32 md:h-44" /></div>

      <header className="relative z-10 flex justify-center items-center p-8 bg-accent3 shadow-lg">
        <h1 className="text-4xl font-extrabold text-accent5">Customize Your Stickers</h1>
      </header>

      <main className="relative z-10 flex flex-col items-center p-10 flex-1 gap-8">
        <div className="w-full max-w-xl flex flex-col gap-6 p-8 rounded-xl shadow-lg bg-accent2">
          
          {/* Number of Stickers */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-accent5">Number of Stickers:</label>
            <select value={numStickers} onChange={(e)=>setNumStickers(parseInt(e.target.value))}
                    className="p-2 rounded-lg bg-accent3 text-accent5 font-semibold focus:outline-none shadow-md">
              {Array.from({length:30}, (_,i)=>i+1).map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {/* Upload Image */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-accent5">Upload 1 Image (Required):</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="p-2 rounded-lg bg-accent3 text-accent5 shadow-md"/>
            {uploadedImage && (
              <div className="flex flex-wrap gap-2 mt-2">
                <img src={URL.createObjectURL(uploadedImage)} alt="Preview" className="w-32 h-32 object-contain rounded-lg border border-accent3"/>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-accent5">Specific Instructions:</label>
            <textarea value={instructions} onChange={(e)=>setInstructions(e.target.value)}
                      rows={4} placeholder="Enter any specific instructions..." 
                      className="p-2 rounded-lg bg-accent3 text-accent5 shadow-md resize-none"/>
          </div>

          {/* Price */}
          <div className="flex justify-between items-center bg-accent3 p-4 rounded-lg shadow-md mt-4">
            <span className="font-bold text-lg text-accent5">Price:</span>
            <span className="font-semibold text-base text-accent5">{currencySymbols[currency]}{price}</span>
          </div>

          {/* Add to Cart */}
          <button onClick={handleAddToCart} type="button" 
                  className="px-6 py-4 mt-4 text-lg font-bold rounded-lg shadow-md text-accent5 bg-accent3 hover:bg-darker transition">
            Add to Cart
          </button>
        </div>
      </main>

      {/* Currency Selector */}
      <div className="fixed bottom-6 left-6 flex flex-col items-start z-50">
        <label className="mb-2 font-semibold text-accent5">Select Currency:</label>
        <select value={currency} onChange={(e)=>setCurrency(e.target.value)}
                className="p-2 rounded-lg bg-accent2 text-accent5 font-semibold focus:outline-none shadow-md transition">
          {currencies.map(cur=><option key={cur} value={cur}>{cur}</option>)}
        </select>
      </div>
    </div>
  );
}
