import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const location = useLocation();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Use cart as the order
  const orderItems = cart.length > 0 ? cart : location.state?.order || [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName || !customerEmail) {
      alert("Name and email are required.");
      return;
    }

    if (orderItems.length === 0) {
      alert("No items in your cart.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();

      formData.append("customerName", customerName);
      formData.append("customerEmail", customerEmail);
      if (customerPhone) formData.append("customerPhone", customerPhone);

      // Append the order items as JSON, including orderType
      formData.append(
        "orderItems",
        JSON.stringify(
          orderItems.map((item) => ({
            ...item,
            orderType: item.orderType || "Digital Artwork", // default fallback
            instructions: item.instructions || "",
          }))
        )
      );

      // Append files as attachments
      orderItems.forEach((item) => {
        if (item.imageFiles && item.imageFiles.length > 0) {
          item.imageFiles.forEach((file) => {
            if (file instanceof File) {
              formData.append("attachments", file);
            } else if (file.file instanceof File) {
              formData.append("attachments", file.file);
            }
          });
        }
      });

      const response = await fetch(
        "https://koowhips-backend.onrender.com/send-order",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to submit order");

      setSubmitted(true);
      clearCart();
    } catch (err) {
      console.error("Error submitting order:", err);
      setError("There was a problem submitting your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-accent2 text-accent5 text-center p-8">
        <h1 className="text-4xl font-bold mb-4">Thank you for your order!</h1>
        <p className="text-lg mb-8">
          An invoice will be emailed to you shortly.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-accent3 text-accent5 rounded-lg shadow hover:bg-darker transition"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-accent2 text-accent5 p-6">
      <h1 className="text-3xl font-bold mb-6">Review and Submit Your Order</h1>

      {orderItems.length === 0 ? (
        <p className="text-lg text-accent5">No items in your cart.</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-accent3 p-8 rounded-2xl shadow-lg w-full max-w-2xl flex flex-col gap-6"
        >
          {/* Review Items */}
          {orderItems.map((item, index) => (
            <div
              key={index}
              className="border border-accent5 p-4 rounded-xl bg-accent2"
            >
              <h2 className="font-bold text-xl mb-2">Item {index + 1}</h2>
              <p>
                <strong>Order Type:</strong>{" "}
                {item.orderType || "Digital Artwork"}
              </p>
              <p>
                <strong>Number of Projects:</strong> {item.numProjects}
              </p>
              <p>
                <strong>Instructions:</strong> {item.instructions || "None"}
              </p>
              <p>
                <strong>Price:</strong> {item.price} {item.currency || ""}
              </p>

              {item.imageFiles && item.imageFiles.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-3">
                  {item.imageFiles.map((file, i) => (
                    <img
                      key={i}
                      src={file.preview || URL.createObjectURL(file)}
                      alt={`Uploaded ${i}`}
                      className="w-24 h-24 object-cover rounded-lg border border-accent5"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Customer Info */}
          <div className="flex flex-col gap-3">
            <label className="font-semibold">Name (required):</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="p-2 rounded-lg bg-accent2 text-accent5"
            />

            <label className="font-semibold">Email (required):</label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
              className="p-2 rounded-lg bg-accent2 text-accent5"
            />

            <label className="font-semibold">Phone (optional):</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="p-2 rounded-lg bg-accent2 text-accent5"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 px-6 py-3 bg-accent5 text-accent2 font-bold rounded-lg hover:opacity-90 transition"
          >
            {submitting ? "Submitting..." : "Submit Order"}
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      )}
    </div>
  );
}
