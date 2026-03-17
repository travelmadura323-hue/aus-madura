import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      
      {/* Card */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2">
          Admin Login
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Welcome back 👋
        </p>

        {/* Email */}
        <div className="flex items-center border rounded-lg px-3 py-2 mb-4 focus-within:ring-2 focus-within:ring-blue-400">
          <Mail className="text-gray-400 mr-2" size={18} />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex items-center border rounded-lg px-3 py-2 mb-6 focus-within:ring-2 focus-within:ring-blue-400">
          <Lock className="text-gray-400 mr-2" size={18} />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-semibold"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-4">
          Admin access only
        </p>
      </div>
    </div>
  );
}