import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../pages/firebase/firebaseConfig";
import Swal from "sweetalert2";

const Signup = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // ✅ Success alert using SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Signup Successful!",
        text: "You have successfully created an account.",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        window.location.href = "/login"; // Redirect after signup
      });
    } catch (err) {
      // ❌ Error alert using SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: err.message,
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-row shadow-lg rounded-xl overflow-hidden w-full max-w-4xl">
        {/* Left Side Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash className="w-6 h-6" /> : <FaEye className="w-6 h-6" />}
              </button>
            </div>
            <button className="w-full bg-green-500 text-white py-3 rounded-lg">
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>

        {/* Right Side Image */}
        <div className="hidden md:block w-1/2">
          <img
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?t=st=1742466530~exp=1742470130~hmac=f36952a7d57a7933dfae372704163865d88a24211b97c25b99d72447da488f9e&w=740"
            alt="Signup"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
