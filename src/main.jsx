import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Services from "./pages/Services.jsx";
import CustomizeArtwork from "./pages/CustomizeArtwork.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import CustomizeSticker from "./pages/CustomizeSticker.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/services" element={<Services />} />
          <Route path="/customize-artwork" element={<CustomizeArtwork />} />
          <Route path="/customize-stickers" element={<CustomizeSticker />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);