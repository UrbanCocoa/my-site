import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-accent2 p-6">
        <h2 className="text-3xl font-bold text-accent5 mb-6">Your Cart is Empty</h2>
        <button
          onClick={() => navigate("/services")}
          className="px-6 py-3 bg-accent3 text-accent5 rounded-lg shadow-md hover:bg-darker transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent2 p-6">
      <h2 className="text-3xl font-bold text-accent5 mb-6 text-center">Your Cart</h2>
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {cart.map(item => (
          <div key={item.cartId} className="flex flex-col md:flex-row gap-4 bg-accent3 p-4 rounded-xl shadow-md">
            
            {/* Image previews */}
            <div className="flex gap-2">
              {item.imageFiles.map((file, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${idx}`}
                  className="w-24 h-24 object-contain rounded-lg border border-accent2"
                />
              ))}
            </div>

            {/* Order info */}
            <div className="flex-1 flex flex-col gap-1">
              <h3 className="font-bold text-accent5 text-lg">{item.type} - {item.numProjects} Project{item.numProjects>1?'s':''}</h3>
              {item.instructions && <p className="text-accent5">Instructions: {item.instructions}</p>}
              <p className="font-semibold text-accent5">Price: {item.currency}{item.price}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-between">
              <button
                onClick={() => removeFromCart(item.cartId)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* Cart summary & actions */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-accent3 p-4 rounded-xl shadow-md mt-6">
          <p className="font-bold text-accent5 text-lg">Total: {cart[0]?.currency}{getCartTotal()}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button
              onClick={() => navigate("/services")}
              className="px-4 py-2 bg-accent4 text-accent5 rounded-lg shadow-md hover:bg-darker transition"
            >
              Continue Shopping
            </button>
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="px-4 py-2 bg-accent5 text-accent2 rounded-lg shadow-md hover:bg-darker transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
