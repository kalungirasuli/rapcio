import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import AuthLayout from "../../layouts/AuthLayout";
import { authService } from "../../utils/api";
import { setCredentials } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.login(email, password);
      
      // Store credentials in Redux and localStorage
      dispatch(setCredentials({
        user: response.user,
        token: response.token
      }));

      toast.success("Login successful!");
      navigate("/administrator/dashboard");
    } catch (error: any) {
      console.error("Error logging in:", error);
      toast.error(error.response?.data?.message || "Failed to login");
    }
  };
  return (
    <AuthLayout>
      <div className="m-6 bg-card dark:bg-cardDark p-6 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-textColor dark:text-textColorDark mb-2">
          Welcome back, Login!
        </h2>
        <p className="text-sm mb-4 text-label dark:text-labelDark text-center">Enter your email address and password to sign into your account.</p>
        <InputField
          label="Email"
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <div className="mt-8 flex justify-between items-center">
          <Link
            to="/forgot-password"
            className="text-[#a35ca8] hover:underline text-sm"
          >
            Forgot Password?
          </Link>
          <Link to="/administrator/dashboard">
          <Button text="Login" onClick={handleLogin} />
        </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
