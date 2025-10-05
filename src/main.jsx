import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Services from "./pages/Services.jsx";
import CustomizeArtwork from "./pages/CustomizeArtwork.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/services" element={<Services />} />
        <Route path="/customize-artwork" element={<CustomizeArtwork />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
