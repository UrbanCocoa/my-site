import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Your cart is empty 🛒</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
        >
          Go Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Your Order Summary</h1>

        {cart.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-6 mb-6 flex flex-col md:flex-row gap-6 shadow-sm"
          >
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-1">Price: ${item.price} {item.currency}</p>
              <p className="text-gray-600 mb-1">Projects: {item.numProjects}</p>
              <p className="text-gray-600 mb-1">Images: {item.imageCount}</p>
              {item.instructions && (
                <p className="text-gray-700 mt-2 italic">Instructions: {item.instructions}</p>
              )}
              <button
                onClick={() => removeFromCart(item)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                Remove
              </button>
            </div>

            {item.imagePreviews && item.imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {item.imagePreviews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Preview ${i + 1}`}
                    className="w-32 h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-between items-center border-t pt-6 mt-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Total: ${getCartTotal()} {cart[0]?.currency || "CAD"}
          </h2>
          <div className="flex gap-4">
            <button
              onClick={clearCart}
              className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition-all"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all"
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
