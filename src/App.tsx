import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { ToastContainer } from "react-toastify";
import AuthRoutes from "./routes/AuthRoutes";
import NotFound from "./pages/NotFound";
import AdminRoutes from "./routes/AdminRoutes";
import RefereeRoutes from "./routes/RefereeRoutes";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = localStorage.getItem('user');
  
  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const theme = useSelector((state: RootState) => state.ui.theme);

  useEffect(() => {
    // Set theme to the DOM root element based on the selected theme
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Router>
      <Routes>
        {/* Auth routes - accessible without authentication */}
        <Route path="/*" element={<AuthRoutes />} />

        {/* Protected Admin routes */}
        <Route
          path="/administrator/*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />

        {/* Protected Referee routes */}
        <Route
          path="/referee/*"
          element={
            <ProtectedRoute>
              <RefereeRoutes />
            </ProtectedRoute>
          }
        />

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
