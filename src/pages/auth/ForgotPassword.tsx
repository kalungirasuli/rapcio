import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import AuthLayout from "../../layouts/AuthLayout";
import { setIsLoading } from "../../store/slices/uiSlice";
import axios from "axios";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      dispatch(setIsLoading(true));
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;

      await axios.post(`${SERVER_URL}/api/auth/forgot-password`, {
        email,
      });

      toast.success("Password reset instructions sent to your email");
      navigate("/");
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to process request";
      toast.error(message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <AuthLayout>
      <div className="m-6 bg-card dark:bg-cardDark p-6 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-textColor dark:text-textColorDark mb-2">
          Forgot Password
        </h2>
        <p className="text-sm mb-4 text-label dark:text-labelDark text-center">Enter the email address used to create your account to get a password reset link.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Email"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <div className="mt-8 flex justify-between items-center">
            <Button
              type="submit"
              className="w-full"
              variant="primary"
            >
              Reset Password
            </Button>
            <Button
              type="button"
              className="w-full"
              variant="secondary"
              onClick={() => navigate("/")}
            >
              Back to Login
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
