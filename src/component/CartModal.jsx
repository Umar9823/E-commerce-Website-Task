// src/components/CartModal.jsx

import { X } from "lucide-react";
import { useCart } from "../component/context/CartContext";
import { useNavigate } from "react-router-dom";

const CartModal = ({ isCartModalOpen, toggleCartModal }) => {
    const { cartItems, removeFromCart, updateCartQuantity } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (cartItems.length > 0) {
            toggleCartModal();
            navigate("/Vite-E-commerce/my-orders/last");
        }
    };

    const increaseQuantity = (id, quantity) => updateCartQuantity(id, quantity + 1);

    const decreaseQuantity = (id, quantity) => {
        if (quantity > 1) {
            updateCartQuantity(id, quantity - 1);
        } else {
            removeFromCart(id);
        }
    };

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (!isCartModalOpen) return null;

    return (
        <div className="fixed right-0 top-0 w-96 bg-white h-full shadow-lg flex flex-col z-50 border-l">
            {/* Back Button */}
            <div className="flex justify-between items-center p-4 border-b">
                <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-black">
                    &#x2190; {/* Left Arrow */}
                </button>
                <h2 className="text-lg font-semibold">My Order</h2>
                <button onClick={toggleCartModal}>
                    <X className="w-6 h-6 text-gray-600 hover:text-black" />
                </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-4">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border-b">
                            <img
                                src={item.images?.[0] || "https://via.placeholder.com/50"}
                                alt={item.title}
                                className="w-14 h-14 rounded-md object-cover"
                            />
                            <div className="flex-1 px-3">
                                <h3 className="text-md font-medium">{item.title}</h3>
                                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => decreaseQuantity(item.id, item.quantity)}
                                    className="bg-red-200 text-red-600 px-2 py-1 rounded-md"
                                >
                                    −
                                </button>
                                <span className="w-6 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => increaseQuantity(item.id, item.quantity)}
                                    className="bg-green-200 text-green-600 px-2 py-1 rounded-md"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-500 hover:text-red-600 ml-2"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center mt-10">Your cart is empty</p>
                )}
            </div>

            {/* Total and Checkout */}
            <div className="p-4 border-t">
                <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                </div>
                <button
                    onClick={handleCheckout}
                    className="w-full mt-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-900 transition"
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CartModal;
