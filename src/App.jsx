import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from './pages/Homepage';
import Login from './component/Login';
import Signup from './component/Signup';
import MyAccount from "./pages/MyAccount";
import MyOrder from "./pages/MyOrder";
import Clothes from "./pages/Clothes";
import Electronics from "./pages/Electronics";
import Furnitures from "./pages/Furnitures";
import Toy from "./pages/Toy";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Homepage Route */}
        <Route path="/Vite-E-commerce" element={<Homepage />} />
        
        {/* Product Categories */}
        <Route path="/Vite-E-commerce/clothes" element={<Clothes />} />
        <Route path="/Vite-E-commerce/electronics" element={<Electronics />} />
        <Route path="/Vite-E-commerce/furnitures" element={<Furnitures />} />
        <Route path="/Vite-E-commerce/toys" element={<Toy />} />

        {/* User Account and Orders */}
        <Route path="/Vite-E-commerce/my-account" element={<MyAccount />} />
        <Route path="/Vite-E-commerce/my-orders" element={<MyOrder />} />
        <Route path="/Vite-E-commerce/my-orders/last" element={<MyOrder />} />
           
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 404 Page (Optional) */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
