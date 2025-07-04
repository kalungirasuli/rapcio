import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../pages/NotFound";
import AddUser from "../pages/admin/users/AddUser";
import AllUsers from "../pages/admin/users/AllUsers";
import EditUser from "../pages/admin/users/EditUser";
import ViewUser from "../pages/admin/users/ViewUser";
import UserProfile from "../pages/admin/UserProfile";
import Dashboard from "../pages/admin/Dasshboard";
import AllPlayers from "../pages/admin/players/AllPlayers";
import AddPlayer from "../pages/admin/players/AddPlayer";
import AllSportsClubs from "../pages/admin/sportsClubs/AllSportsClubs";
import AddSportsClub from "../pages/admin/sportsClubs/AddSportsClub";
import ViewPlayer from "../pages/admin/view-player/[...id]";
import ScanQRCode from "../pages/referee/ScanQRCode";


const AdminRoutes: React.FC = () => {
  const routes = [
    // Users
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/add-user", element: <AddUser /> },
    { path: "/all-users", element: <AllUsers /> },
    { path: "/edit-user/:id", element: <EditUser /> },
    { path: "/view-user/:id", element: <ViewUser /> },
    { path: "/user-profile", element: <UserProfile /> },
    { path: "/all-players", element: <AllPlayers /> },
    { path: "/add-player", element: <AddPlayer /> },
    { path: "/view-player/:id", element: <ViewPlayer/> },
    { path: "/all-sports-clubs", element: <AllSportsClubs /> },
    { path: "/add-sports-club", element: <AddSportsClub /> },
    { path: "/scan-qrcode", element: <ScanQRCode/> },

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

export default AdminRoutes;
