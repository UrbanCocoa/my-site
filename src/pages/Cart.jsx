import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import Banner from "../components/Banner.jsx";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen w-screen bg-accent3 text-accent5 font-custom">
        <Banner height="h-32 md:h-44" />
        
        <header className="flex justify-center items-center p-8 bg-accent3 shadow-lg">
          <h1 className="text-4xl font-extrabold">Your Cart</h1>
        </header>

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

  return (
    <div className="flex flex-col min-h-screen w-screen bg-accent3 text-accent5 font-custom">
      <Banner height="h-32 md:h-44" />
      
      <header className="flex justify-center items-center p-8 bg-accent3 shadow-lg">
        <h1 className="text-4xl font-extrabold">Your Cart</h1>
      </header>

      <main className="flex flex-col items-center p-10 flex-1 gap-6">
        {/* Cart Items */}
        <div className="w-full max-w-3xl space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartId}
              className="bg-accent2 rounded-lg shadow-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-sm opacity-80">Projects: {item.numProjects}</p>
                {item.instructions && (
                  <p className="text-sm opacity-80 mt-2">Instructions: {item.instructions}</p>
                )}
                {item.imageCount && (
                  <p className="text-sm opacity-80">Images: {item.imageCount}</p>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <p className="text-xl font-bold">
                  {item.currency === "CAD" && "$"}
                  {item.currency === "USD" && "$"}
                  {item.currency === "EUR" && "€"}
                  {item.currency === "GBP" && "£"}
                  {item.currency === "AUD" && "$"}
                  {item.currency === "NZD" && "$"}
                  {item.currency === "JPY" && "¥"}
                  {item.currency === "CNY" && "¥"}
                  {item.currency === "INR" && "₹"}
                  {item.currency === "MXN" && "$"}
                  {item.price} {item.currency}
                </p>
                
                <button
                  onClick={() => removeFromCart(item.cartId)}
                  className="px-4 py-2 bg-accent4 hover:bg-darker text-accent5 rounded-lg font-semibold shadow-md transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="w-full max-w-3xl bg-accent2 rounded-lg shadow-lg p-6 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Total:</h3>
            <p className="text-2xl font-bold">
              ${getCartTotal()} {cart[0]?.currency || "CAD"}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => navigate("/services")}
              className="flex-1 px-6 py-3 bg-accent3 hover:bg-darker text-accent5 rounded-lg font-semibold shadow-md transition"
            >
              Continue Shopping
            </button>
            
            <button
              onClick={() => {
                if (window.confirm("Clear all items from cart?")) {
                  clearCart();
                }
              }}
              className="flex-1 px-6 py-3 bg-accent1 hover:bg-darker text-accent5 rounded-lg font-semibold shadow-md transition"
            >
              Clear Cart
            </button>
            
            <button
              onClick={() => navigate("/checkout")}
              className="flex-1 px-6 py-3 bg-accent4 hover:bg-darker text-accent5 rounded-lg font-semibold shadow-md transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}