import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, toggleSidebar } from "../store/slices/uiSlice";
import { logout } from "../store/slices/authSlice";
import { RootState } from "../store/store";
import {
  MdOutlineDarkMode,
  MdLightMode,
  MdMenu,
  MdMenuOpen,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.ui.theme);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    document.documentElement.classList.toggle("dark", theme === "light");
  };

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Using the correct RootState type for better type safety
  const isSidebarOpen = useSelector(
    (state: RootState) => state.ui.isSidebarOpen
  );

  return (
    <nav className="flex items-center h-[4rem] fixed top-0 px-4 bg-card dark:bg-cardDark text-textColor dark:text-textColorDark z-50 max-w-[1800px] mx-auto w-full justify-between shadow-sm">
      {/* Logo */}
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

      <div className="flex items-center space-x-2">
        {/* Sidebar Toggle Icon */}
        <button
          onClick={handleSidebarToggle}
          className="focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen === true ? (
            <MdMenuOpen size={24} />
          ) : (
            <MdMenu size={24} />
          )}
        </button>

        {/* Theme Toggle Icon */}
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

        {/* Logout Button */}
        {user.role && (
          <Button
            onClick={handleLogout}
            variant="secondary"
            className="px-4 py-2"
          >
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
