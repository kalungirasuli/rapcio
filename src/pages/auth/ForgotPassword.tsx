import React, { useState } from "react";
import InputField from "../../components/InputField";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import AuthLayout from "../../layouts/AuthLayout";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("Password reset link sent to:", email);
  };

  return (
    <AuthLayout>
      <div className="m-6 bg-card dark:bg-cardDark p-6 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-textColor dark:text-textColorDark mb-2">
          Forgot Password
        </h2>
        <p className="text-sm mb-4 text-label dark:text-labelDark text-center">Enter the email address used to create your account to get a password reset link.</p>
        <InputField
          label="Email"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <div className="mt-8 flex justify-between items-center">
          <Link
            to="/"
            className="text-[#a35ca8] hover:underline text-sm"
          >
            Back To Login 
          </Link>
          <Button text="Reset Password" onClick={handleSubmit} />
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
