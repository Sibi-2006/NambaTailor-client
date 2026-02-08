import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { baseUrl } = useContext(GlobalContext);
  // Simple validation
  const validate = () => {
    const newErrors = {};

    if (!loginId.trim()) {
      newErrors.loginId = "Login ID is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
  await axios.post(
    `${baseUrl}/admin/login`,
    {
      loginId: loginId,
      password: password
    },
    {
      withCredentials: true 
    }
  );


  navigate("/home");

} catch (err) {
  console.log(err);
}

    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F6F2]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        <h2 className="text-2xl font-bold text-center text-[#4B2E83]">
          Admin Login
        </h2>
        <p className="text-center text-sm text-[#6B6B6B] mt-1">
          Welcome back, please login
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          
          {/* Login ID */}
          <div>
            <label className="block text-sm font-medium text-[#1F1F1F]">
              Login ID
            </label>
            <input
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className={`mt-1 w-full rounded-lg px-4 py-2 border
                ${errors.loginId ? "border-red-500" : "border-gray-300"}
                focus:outline-none focus:ring-2 focus:ring-[#4B2E83]`}
              placeholder="Enter login ID"
            />
            {errors.loginId && (
              <p className="text-sm text-red-500 mt-1">
                {errors.loginId}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#1F1F1F]">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 w-full rounded-lg px-4 py-2 border pr-10
                  ${errors.password ? "border-red-500" : "border-gray-300"}
                  focus:outline-none focus:ring-2 focus:ring-[#4B2E83]`}
                placeholder="Enter password"
              />

              {/* Eye Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-[#6B6B6B] hover:text-[#4B2E83]"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#4B2E83] text-white py-2 rounded-lg
                       font-semibold transition
                       hover:bg-[#E6C85C] hover:text-[#1F1F1F]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
