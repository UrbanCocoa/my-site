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
    phone: "",
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
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name || !formData.email) {
      alert("⚠️ Please fill out your name and email!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("⚠️ Please enter a valid email address!");
      return;
    }

    // Collect all images from cart
    const allImages = cart.flatMap((item) => item.imageFiles || []);
    if (allImages.length === 0) {
      alert("⚠️ No images found in cart! Please add images to your order.");
      return;
    }

    setIsSubmitting(true);

    // Build order details text
    const orderDetails = cart
      .map(
        (item, i) =>
          `${i + 1}. ${item.name}\n - Projects: ${item.numProjects}\n - Price: ${item.price} ${item.currency}\n - Images: ${item.imageCount}\n - Instructions: ${item.instructions || "None"}`
      )
      .join("\n\n");

    // Build FormData
    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("phone", formData.phone || "Not provided");
    formPayload.append(
      "message",
      `NEW ORDER RECEIVED\n\nCUSTOMER INFORMATION:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "Not provided"}\n\nORDER DETAILS:\n${orderDetails}\n\nTOTAL: $${getCartTotal()} ${cart[0]?.currency || "CAD"}\nTotal Images: ${allImages.length}\nOrder Date: ${new Date().toLocaleString()}`
    );

    // Attach images
    allImages.forEach((file) => {
      formPayload.append("attachments", file);
    });

    try {
      const response = await fetch("http://localhost:3001/send-order", {
        method: "POST",
        body: formPayload,
      });

      const result = await response.json();
      if (result.success) {
        alert("✅ Order submitted successfully! Check your email (including spam folder).");
        clearCart();
        navigate("/");
      } else {
        alert(`❌ Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error sending order:", error);
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
                  {item.imageFiles && item.imageFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.imageFiles.map((file, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-12 h-12 object-cover rounded border border-accent4"
                        />
                      ))}
                    </div>
                  )}
                  <p className="font-bold mt-2">
                    ${item.price} {item.currency}
                  </p>
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
                * Required fields<br />
                Your images will be automatically sent with your order
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
