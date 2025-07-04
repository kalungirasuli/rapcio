import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleTheme } from "../store/slices/uiSlice";
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";

interface AuthLayoutProps {
  children: ReactNode; // Ensures `children` is properly typed as React elements
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ui.theme);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    document.documentElement.classList.toggle("dark", theme === "light");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background dark:bg-backgroundDark text-textColor dark:text-textColorDark relative max-w-[1200px] mx-auto w-full">
      <div className="flex items-center justify-between fixed top-0 px-4 h-[4rem] max-w-[1800px] mx-auto w-full">
        {/* Logo */}
        <Link to="/">
          {theme === "dark" ? (
            <img
              src="/logos/auth-logo.png"
              alt="logo"
              className="h-[3.5rem] w-[3.5rem]"
            />
          ) : (
            <img
              src="/logos/auth-logo-dark.png"
              alt="logo"
              className="h-[3.5rem] w-[3.5rem]"
            />
          )}
        </Link>

        {/* Theme Toggle Switch */}
        <button
          onClick={handleThemeToggle}
          className="focus:outline-none ml-4"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <MdLightMode size={22} />
          ) : (
            <MdOutlineDarkMode size={22} />
          )}
        </button>
      </div>

      {/* Main Content */}
      {children}

      {/* Footer */}
      <Footer className="absolute bottom-2" />
    </div>
  );
};

export default AuthLayout;
