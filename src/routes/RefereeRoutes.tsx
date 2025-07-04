import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../pages/NotFound";
import ScanQRCode from "../pages/referee/ScanQRCode";

const RefereeRoutes: React.FC = () => {
  const routes = [
    // Users
    { path: "/scan-qrcode", element: <ScanQRCode /> },

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

export default RefereeRoutes;
