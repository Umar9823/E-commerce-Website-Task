import { useState, useEffect } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import CartModal from "./CartModal";
import { useCart } from "../component/context/CartContext";
import { useAuth } from "../component/context/AuthContext"; // Import AuthContext

const Navbar = () => {
  const { user, logout } = useAuth(); // Get the authenticated user & logout function
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleCartModal = (e) => {
    if (e) e.stopPropagation();
    setIsCartModalOpen(!isCartModalOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const categories = [
    { name: "All", path: "/Vite-E-commerce" },
    { name: "Clothes", path: "/Vite-E-commerce/clothes" },
    { name: "Electronics", path: "/Vite-E-commerce/electronics" },
    { name: "Furnitures", path: "/Vite-E-commerce/furnitures" },
    { name: "Toys", path: "/Vite-E-commerce/toys" },
  ];

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center py-4 px-6 md:px-12 border-b">
        <div className="flex items-center space-x-4">
          <button onClick={toggleMobileMenu} className="sm:hidden text-gray-800">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="text-2xl font-semibold text-gray-800">Shopi</span>
        </div>

        <div className="hidden sm:flex items-center space-x-6 text-gray-600">
          {categories.map((category) => (
            <NavLink
              key={category.name}
              to={category.path}
              className={({ isActive }) =>
                `border-b-2 transition ${isActive ? "border-gray-800 font-semibold" : "border-transparent"}`
              }
            >
              {category.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden sm:flex items-center space-x-6 text-gray-600">
          {user ? (
            <>
              <span className="text-sm">{user.email}</span>
              <a href="Vite-E-commerce/my-orders" className="hover:text-gray-900 transition">
                My Orders
              </a>
              <a href="Vite-E-commerce/my-account" className="hover:text-gray-900 transition">
                My Account
              </a>
              <button onClick={logout} className="hover:text-gray-900 transition">
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/Vite-E-commerce/login" className="hover:text-gray-900 transition">
              Login
            </NavLink>
          )}
          <button onClick={toggleCartModal} className="flex items-center space-x-1 hover:text-gray-900 transition">
            <ShoppingCart className="w-5 h-5" />
            <span>{cartCount}</span>
          </button>
        </div>

        {/* Mobile User Info + Cart */}
        <div className="sm:hidden relative dropdown-container">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <User className="w-5 h-5 text-gray-600" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-20">
              {user ? (
                <>
                  <span className="block px-4 py-3 text-gray-700 font-medium border-b">
                    {user.email}
                  </span>
                  <a href="Vite-E-commerce/my-orders" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition">
                    My Orders
                  </a>
                  <a href="Vite-E-commerce/my-account" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition">
                    My Account
                  </a>
                  <button onClick={logout} className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 transition">
                    Logout
                  </button>
                </>
              ) : (
                <NavLink to="/Vite-E-commerce/login" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition">
                  Login
                </NavLink>
              )}
              <div className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition" onClick={toggleCartModal}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                <span>{cartCount}</span>
              </div>
            </div>
          )}
        </div>
      </nav>

      <CartModal isCartModalOpen={isCartModalOpen} toggleCartModal={toggleCartModal} />

      <div
        className={`sm:hidden bg-white border-t border-gray-200 shadow-md transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        {categories.map((category) => (
          <NavLink
            key={category.name}
            to={category.path}
            className={({ isActive }) =>
              `block px-6 py-3 text-gray-700 transition ${
                isActive ? "bg-gray-100 font-semibold border-l-4 border-gray-800" : "hover:bg-gray-100"
              }`
            }
          >
            {category.name}
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
