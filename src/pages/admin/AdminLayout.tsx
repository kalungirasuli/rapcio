import React, { ReactNode } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  MdManageAccounts,
  MdLogout,
  MdGroup,
  MdPersonAdd,
  MdOutlineSportsKabaddi,
  MdSportsHandball,
  MdSportsSoccer,
  MdAdd,
  MdQrCodeScanner,
} from "react-icons/md";
import { AiOutlineDashboard } from "react-icons/ai";

// Sidebar sections
const sidebarSections = [
  {
    links: [
      {
        name: "dashboard",
        path: "administrator/dashboard",
        icon: <AiOutlineDashboard size={18} />,
      },
    ],
  },
  {
    title: "Sports Clubs",
    links: [
      {
        name: "Add Sports Club",
        path: "administrator/add-sports-club",
        icon: <MdAdd size={18} />,
      },
      {
        name: "All Sports Clubs",
        path: "administrator/all-sports-clubs",
        icon: <MdSportsSoccer size={18} />,
      }
    ],
  },
  {
    title: "Players",
    links: [
      {
        name: "Add Player",
        path: "administrator/add-player",
        icon: <MdSportsHandball size={18} />,
      },
      {
        name: "All Players",
        path: "administrator/all-players",
        icon: <MdOutlineSportsKabaddi size={18} />,
      },
      {
        name: "Scanner",
        path: "administrator/scan-qrcode",
        icon: <MdQrCodeScanner size={18} />,
      }
    ],
  },
  {
    title: "Users",
    links: [
      {
        name: "Add User",
        path: "administrator/add-user",
        icon: <MdPersonAdd size={18} />,
      },
      {
        name: "All Users",
        path: "administrator/all-users",
        icon: <MdGroup size={18} />,
      }
    ],
  },
  {
    title: "Account",
    links: [
      {
        name: "Profile",
        path: "administrator/user-profile",
        icon: <MdManageAccounts size={18} />,
      },
      {
        name: "Log Out",
        path: "",
        icon: <MdLogout size={18} />,
      },
    ],
  },
];

interface AdminLayoutProps {
  children: ReactNode; // Define the children prop
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return <DashboardLayout sidebarSections={sidebarSections}>{children}</DashboardLayout>;
};

export default AdminLayout;
