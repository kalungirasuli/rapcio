import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveSidebarLink,
  setDeviceWidth,
  toggleSidebar,
} from "../store/slices/uiSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { RootState } from "../store/store";

interface SidebarLink {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarSection {
  title?: string;
  links: SidebarLink[];
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarSections: SidebarSection[];
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebarSections,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isSidebarOpen = useSelector(
    (state: RootState) => state.ui.isSidebarOpen
  );
  const activeSidebarLink = useSelector(
    (state: RootState) => state.ui.activeSidebarLink
  );
  const isMobileDevice = useSelector(
    (state: RootState) => state.ui.isMobileDevice
  );

  useEffect(() => {
    const activeLink = location.pathname.split("/").slice(1).join("/");
    dispatch(setActiveSidebarLink(activeLink));

    const handleResize = () => {
      dispatch(setDeviceWidth(window.innerWidth));
    };

    handleResize(); // Initialize on component mount
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const renderSidebarLink = ({ name, path, icon }: SidebarLink) => {
    if (name === "Log Out") {
      return (
        <button
          key={path}
          onClick={handleLogout}
          className="flex items-center px-4 py-2 transition-colors duration-200 capitalize min-w-[10rem] w-full text-left hover:text-primary dark:hover:text-primaryDark"
        >
          {icon}
          <span className="ml-2 text-[14px]">{name}</span>
        </button>
      );
    }

    return (
      <Link
        key={path}
        to={`/${path}`}
        onClick={() => isMobileDevice && dispatch(toggleSidebar())}
        className={`flex items-center px-4 py-2 transition-colors duration-200 capitalize min-w-[10rem] ${
          activeSidebarLink === path
            ? "text-primary dark:text-primaryDark"
            : "hover:text-primary dark:hover:text-primaryDark"
        }`}
      >
        {icon}
        <span className="ml-2 text-[14px]">{name}</span>
      </Link>
    );
  };

  return (
    <div className="h-screen mx-auto max-w-[1800px] relative flex flex-col">
      {/* Navbar */}
      <Navbar />

      <aside
        className="fixed top-0 z-40 h-full bg-card dark:bg-cardDark text-textColor dark:text-textColorDark pt-[5rem] shadow-sm overflow-hidden"
        style={{
          width: isSidebarOpen ? "12rem" : "0",
          pointerEvents: isSidebarOpen ? "auto" : "none", // Prevent interactions when closed
          transition: "width 300ms ease-in-out", // Only animate the width
        }}
      >
        {sidebarSections.map((section, index) => (
          <div key={index} className="mb-4">
            {section.title && (
              <p className="px-4 text-[10px] uppercase text-label dark:text-labelDark">
                {section.title}
              </p>
            )}
            {section.links.map(renderSidebarLink)}
          </div>
        ))}
      </aside>

      {/* Main Content Area */}
      <div
        className={`flex flex-col transition-all duration-300 w-full relative md:absolute right-0 h-full ${
          isSidebarOpen ? "md:w-[calc(100%-12rem)]" : "w-full"
        }`}
      >
        <main className="flex-1 pt-[5rem] px-4 text-textColor dark:text-textColorDark">
          {children}
        </main>
        <Footer className="mt-12 py-2 flex justify-center" />
      </div>
    </div>
  );
};

export default DashboardLayout;
