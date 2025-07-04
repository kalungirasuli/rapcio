import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { setIsLoading } from "../../store/slices/uiSlice";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const [players, setPlayers] = useState<any[]>([]);
  const [clubs, setClubs] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setIsLoading(true));

        const [playersRes, clubsRes, usersRes] = await Promise.all([
          axios.get("/data/players.json"),
          axios.get("/data/sportsClubs.json"),
          axios.get("/data/users.json"),
        ]);

        setPlayers(playersRes.data || []);
        setClubs(clubsRes.data || []);
        setUsers(usersRes.data || []);

        if ((playersRes.data || []).length === 0) {
          toast.info("No players found. Please add some players first.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch dashboard data.");
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  const pieData = {
    labels: ["Players", "Clubs", "Users"],
    datasets: [
      {
        label: "Data",
        data: [players.length, clubs.length, users.length],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <AdminLayout>
      <PageTitle
        title="Dashboard"
        breadcrumbs={[{ label: "Dashboard" }]}
      />

      <div className="p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold">{players.length}</h3>
            <p className="mt-2 text-lg">Total Players</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold">{clubs.length}</h3>
            <p className="mt-2 text-lg">Clubs</p>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold">{users.length}</h3>
            <p className="mt-2 text-lg">Users</p>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold">{players.filter(p => p.isActive).length}</h3>
            <p className="mt-2 text-lg">Active Players</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Chart Section */}
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Overview Chart</h2>
    <div className="flex justify-center items-center">
      <div className="w-64 h-64">
        <Pie data={pieData} />
      </div>
    </div>
  </div>

  {/* Recent Activities */}
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
    <div className="space-y-4">
      {players.slice(0, 3).map((player, index) => (
        <div key={index} className="border-l-4 border-blue-500 pl-4">
          <p className="text-gray-700">
            Player <strong>{player.firstName}</strong> added.
          </p>
          <span className="text-sm text-gray-500">Recently</span>
        </div>
      ))}
    </div>
  </div>
</div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
