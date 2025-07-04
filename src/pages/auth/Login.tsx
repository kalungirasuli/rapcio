import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import AuthLayout from "../../layouts/AuthLayout";
import { setIsLoading } from "../../store/slices/uiSlice";
import { setCredentials } from "../../store/slices/authSlice";
import { authService } from "../../utils/api";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirect if already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      if (userData.role === "ADMIN" || userData.role === "SUPER_ADMIN") {
        navigate("/administrator");
      } else if (userData.role === "REFEREE") {
        navigate("/referee");
      }
    }
  }, [navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      dispatch(setIsLoading(true));
      const { user, token } = await authService.login(formData.email, formData.password);

      // Update Redux state
      dispatch(setCredentials({ user, token }));

      // Navigate based on user role
      switch (user.role) {
        case "ADMIN":
        case "SUPER_ADMIN":
          navigate("/administrator");
          break;
        case "REFEREE":
          navigate("/referee");
          break;
        default:
          navigate("/");
      }

      toast.success("Login successful!");
    } catch (error: any) {
      const message = error.response?.data?.message || "Invalid credentials";
      toast.error(message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <AuthLayout>
      <div className="m-6 bg-card dark:bg-cardDark p-6 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-textColor dark:text-textColorDark mb-2">
          Welcome back
        </h2>
        <p className="text-sm mb-4 text-label dark:text-labelDark text-center">
          Enter your credentials to sign in
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />
          <div className="flex justify-between items-center">
            <Link
              to="/forgot-password"
              className="text-primary hover:underline text-sm"
            >
              Forgot Password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full"
            variant="primary"
          >
            Sign In
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
