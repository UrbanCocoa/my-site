import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import Banner from "../components/Banner.jsx";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen w-screen bg-accent3 text-accent5 font-custom">
        <Banner height="h-32 md:h-44" />
        <main className="flex flex-col items-center justify-center flex-1 p-10">
          <div className="text-center">
            <p className="text-2xl mb-6">Your cart is empty!</p>
            <button
              onClick={() => navigate("/services")}
              className="px-6 py-3 bg-accent2 hover:bg-accent4 text-accent5 rounded-lg font-semibold shadow-md transition"
            >
              Start Shopping
            </button>
          </div>
        </main>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    console.log("handleSubmit called!");
    
    // Validate form
    if (!formData.name || !formData.email) {
      alert("⚠️ Please fill out your name and email!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("⚠️ Please enter a valid email address!");
      return;
    }

    console.log("Validation passed!");
    setIsSubmitting(true);

    // Prepare order details
    const orderDetails = cart.map((item, i) => 
      `${i + 1}. ${item.name}
   - Projects: ${item.numProjects}
   - Price: ${item.price} ${item.currency}
   - Images: ${item.imageCount}
   - Instructions: ${item.instructions || "None"}`
    ).join("\n\n");

    const formPayload = new FormData();
    formPayload.append("access_key", "62b8a41e-d284-40f3-b9d9-ef4be1d0b3ee");
    formPayload.append("subject", `New KooWhips Order from ${formData.name}`);
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("phone", formData.phone || "Not provided");
    formPayload.append("message", 
      `NEW ORDER RECEIVED\n\n` +
      `CUSTOMER INFORMATION:\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone || "Not provided"}\n\n` +
      `ORDER DETAILS:\n${orderDetails}\n\n` +
      `TOTAL: $${getCartTotal()} ${cart[0]?.currency || "CAD"}\n\n` +
      `Order Date: ${new Date().toLocaleString()}`
    );

    console.log("Sending to Web3Forms...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload
      });

      console.log("Response received! Status:", response.status);
      const result = await response.json();
      console.log("Full response:", result);

      if (result.success) {
        alert("✅ Order submitted! Check celicacoa@gmail.com (including spam folder)");
        clearCart();
        navigate("/");
      } else {
        alert(`❌ Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Failed to submit order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-screen bg-accent3 text-accent5 font-custom">
      <Banner height="h-32 md:h-44" />
      
      <header className="flex justify-center items-center p-8 bg-accent3 shadow-lg">
        <h1 className="text-4xl font-extrabold">Checkout</h1>
      </header>

      <main className="flex flex-col lg:flex-row justify-center gap-8 p-10 flex-1">
        {/* Order Summary */}
        <div className="w-full lg:w-1/2 max-w-lg">
          <div className="bg-accent2 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.cartId} className="border-b border-accent3 pb-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm opacity-80">Projects: {item.numProjects}</p>
                  <p className="text-sm opacity-80">Images: {item.imageCount}</p>
                  <p className="font-bold mt-2">${item.price} {item.currency}</p>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-accent4 pt-4">
              <div className="flex justify-between items-center text-2xl font-bold">
                <span>Total:</span>
                <span>${getCartTotal()} {cart[0]?.currency || "CAD"}</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/cart")}
              className="w-full mt-4 px-4 py-2 bg-accent3 hover:bg-darker text-accent5 rounded-lg font-semibold shadow-md transition"
            >
              ← Back to Cart
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full lg:w-1/2 max-w-lg">
          <div className="bg-accent2 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Your Information</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full p-3 rounded-lg bg-accent3 text-accent5 shadow-md focus:outline-none focus:ring-2 focus:ring-accent4"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full p-3 rounded-lg bg-accent3 text-accent5 shadow-md focus:outline-none focus:ring-2 focus:ring-accent4"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Phone Number (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890"
                  className="w-full p-3 rounded-lg bg-accent3 text-accent5 shadow-md focus:outline-none focus:ring-2 focus:ring-accent4"
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-accent4 hover:bg-darker text-accent5 rounded-lg font-bold text-lg shadow-md transition disabled:opacity-50 mt-6"
              >
                {isSubmitting ? "Submitting..." : "Submit Order"}
              </button>

              <p className="text-sm text-center opacity-70 mt-4">
                * Required fields
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}