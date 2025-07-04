import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigates back one step in history
  };

  return (
    <AuthLayout>
      <div className="m-6 w-full max-w-md text-center">
        <span className="text-[12rem] mb-0 p=0 font-bold text-card dark:text-cardDark">
          404 
        </span>
        <p className="text-2xl mb-4 mt-[-7rem] text-textColor dark:text-textColorDark">
          Page Not Found
        </p>
        <p className="text-sm mb-4 mt-0 text-label dark:text-labelDark">
          Page you are trying to open does not exist. You may have mistyped the
          address, or the page has been moved to another URL. If you think this
          is an error contact support.
        </p>
        <Button text="Go Back" onClick={handleGoBack} />
      </div>
    </AuthLayout>
  );
};

export default NotFound;
