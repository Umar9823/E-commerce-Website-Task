import { useCart } from "../component/context/CartContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/"); // Redirect if no items
    }
  }, [cartItems, navigate]);

  return (
    <div className="flex flex-col items-center mt-10">
      {/* Back Button */}
      <button 
        onClick={() => navigate("/Vite-E-commerce/my-orders")} 
        className="text-gray-600 hover:text-black mb-4 self-start ml-4"
      >
        &#x2190; Back
      </button>
      
      <h2 className="text-2xl font-semibold mb-6">My Order</h2>
      {cartItems.length > 0 ? (
        <div className="border rounded-md p-4 shadow-md w-full max-w-md">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 border-b">
              <img
                src={item.images?.[0] || "https://via.placeholder.com/50"}
                alt={item.title}
                className="w-14 h-14 rounded-md object-cover"
                onError={(e) => (e.target.src = "https://via.placeholder.com/50")}
              />
              <div className="flex-1 px-3">
                <h3 className="text-md font-medium">{item.title}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md">
                {item.quantity}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No orders found</p>
      )}
    </div>
  );
};

export default MyOrder;
