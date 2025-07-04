import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../pages/NotFound";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";

const AuthRoutes: React.FC = () => {
  const routes = [
    { path: "/", element: <Login /> },
    { path: "/forgot-password", element: <ForgotPassword /> },

    // Catch-all Route for 404 Not Found
    { path: "*", element: <NotFoundPage /> },
  ];

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default AuthRoutes;
