import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { ToastContainer } from "react-toastify";
import AuthRoutes from "./routes/AuthRoutes";
import NotFound from "./pages/NotFound";
import AdminRoutes from "./routes/AdminRoutes";
import RefereeRoutes from "./routes/RefereeRoutes";

const ProtectedRoute: React.FC=({childre:any})=>{
  const user=localStorage.getItem('user')
  const navigate=useNavigate()

  if(user){
    return children
  }
  navigate('/login')
}

const App: React.FC = () => {
  const theme = useSelector((state: RootState) => state.ui.theme);

  useEffect(() => {
    // Set theme to the DOM root element based on the selected theme
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/*" element={<AuthRoutes />} />

        {/* Dashboard routes */}
        <ProtectedRoute>
        <Route path="/administrator/*" element={<AdminRoutes />} />

        {/* Dashboard routes */}
        <Route path="/referee/*" element={<RefereeRoutes />} />
        </ProtectedRoute>
        {/* Catch-all route for unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        toastClassName="text-sm bg-card dark:bg-cardDark p-6 rounded-md shadow-md text-textColor dark:text-textColorDark max-w-xs top-[5rem] right-4 sm:right-auto custom-toast"
        hideProgressBar={true}
        position="top-right"
      />
    </Router>
  );
};

export default App;
