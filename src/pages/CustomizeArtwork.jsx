import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import Banner from "../components/Banner.jsx";
import Bigpage from "../assets/KW/Bigpage.png";

const currencies = ["CAD","USD","EUR","GBP","AUD","NZD","JPY","CNY","INR","MXN"];
const currencySymbols = {
  CAD: "$",
  USD: "$",
  EUR: "€",
  GBP: "£",
  AUD: "$",
  NZD: "$",
  JPY: "¥",
  CNY: "¥",
  INR: "₹",
  MXN: "$"
};

export default function CustomizeArtwork() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [numProjects, setNumProjects] = useState(1);
  const [price, setPrice] = useState(20);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [currency, setCurrency] = useState("CAD");
  const [rates, setRates] = useState({ CAD: 1 });
  const [bgLoaded, setBgLoaded] = useState(false);

  // Preload background image
  useEffect(() => {
    const img = new Image();
    img.src = Bigpage;
    img.onload = () => setBgLoaded(true);
  }, []);

  // Fetch exchange rates
  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/CAD")
      .then(res => res.json())
      .then(data => {
        if (data.rates) {
          setRates(data.rates);
        }
      })
      .catch(err => console.error("Error fetching rates:", err));
  }, []);

  // Update price when number of projects or currency changes
  useEffect(() => {
    const basePrice = numProjects === 1 ? 20 : numProjects === 2 ? 30 : 40;
    if (rates[currency]) {
      setPrice((basePrice * rates[currency]).toFixed(2));
    } else {
      setPrice(basePrice);
    }
  }, [numProjects, currency, rates]);

  const handleNumProjectsChange = (e) => setNumProjects(parseInt(e.target.value));
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // Limit to 3
    setUploadedImages(files);
  };

  const handleAddToCart = () => {
    // Validation
    if (uploadedImages.length === 0) {
      alert("⚠️ Please upload at least one image of your car!");
      return;
    }
    
    if (uploadedImages.length < numProjects) {
      alert(`⚠️ Please upload ${numProjects} image${numProjects > 1 ? 's' : ''} for your ${numProjects} project${numProjects > 1 ? 's' : ''}.\n\nCurrently uploaded: ${uploadedImages.length}`);
      return;
    }

    // Create cart item with actual image files
    const cartItem = {
      type: "Digital Artwork",
      name: `Digital Artwork - ${numProjects} Project${numProjects > 1 ? 's' : ''}`,
      numProjects,
      price,
      currency,
      instructions: instructions.trim(),
      imageCount: uploadedImages.length,
      imageFiles: uploadedImages // Store the actual File objects
    };

    addToCart(cartItem);
    
    // Show success message and navigate to cart
    alert("✅ Successfully added to cart!");
    navigate("/cart");
  };

  return (
    <div className="relative flex flex-col min-h-screen w-screen font-custom overflow-x-hidden">

      {/* Background Image with better performance */}
      {bgLoaded && (
        <div 
          className="fixed inset-0 w-full h-full z-0 pointer-events-none"
          style={{
            backgroundImage: `url(${Bigpage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            transform: 'scale(1.5)',
            willChange: 'transform',
            imageRendering: 'auto'
          }}
        />
      )}

      {/* Banner */}
      <div className="relative z-[999]">
        <Banner height="h-32 md:h-44" />
      </div>

      {/* Page Header */}
      <header className="relative z-[100] flex justify-center items-center p-8 bg-accent3 shadow-lg">
        <h1 className="text-4xl font-extrabold text-accent5">Customize Your Order</h1>
      </header>

      {/* Main Order Box */}
      <main className="relative z-[100] flex justify-center items-start p-10 flex-1 gap-8">
        <div className="w-full max-w-lg p-8 flex flex-col gap-6 rounded-xl shadow-lg bg-accent2">

          {/* Number of Projects */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-accent5">Number of Projects:</label>
            <select
              value={numProjects}
              onChange={handleNumProjectsChange}
              className="p-2 rounded-lg bg-accent3 text-accent5 font-semibold focus:outline-none shadow-md"
            >
              <option value={1}>1 Project</option>
              <option value={2}>2 Projects</option>
              <option value={3}>3 Projects</option>
            </select>
          </div>

          {/* File Upload */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-accent5">Upload Images:</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="p-2 rounded-lg bg-accent3 text-accent5 shadow-md"
            />
            {uploadedImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {uploadedImages.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Upload Preview ${index}`}
                    className="w-24 h-24 object-contain rounded-lg border border-accent3"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Specific Instructions */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-accent5">Specific Instructions:</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={4}
              placeholder="Enter any specific instructions here..."
              className="p-2 rounded-lg bg-accent3 text-accent5 shadow-md resize-none"
            />
          </div>

          {/* Price Display */}
          <div className="flex justify-between items-center bg-accent3 p-4 rounded-lg shadow-md mt-4">
            <span className="font-bold text-lg text-accent5">Price:</span>
            <span className="font-semibold text-base text-accent5">{currencySymbols[currency]}{price}</span>
          </div>

          {/* Add to Cart */}
          <button 
            onClick={handleAddToCart}
            type="button"
            className="px-6 py-4 mt-4 text-lg font-bold rounded-lg shadow-md text-accent5 bg-accent3 hover:bg-darker transition"
          >
            Add to Cart
          </button>
        </div>
      </main>

      {/* Currency Selector Bottom-Left */}
      <div className="fixed bottom-6 left-6 flex flex-col items-start z-50">
        <label className="mb-2 font-semibold text-accent5">Select Currency:</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="p-2 rounded-lg bg-accent2 text-accent5 font-semibold focus:outline-none shadow-md transition"
        >
          {currencies.map(cur => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
      </div>
    </div>
  );
}