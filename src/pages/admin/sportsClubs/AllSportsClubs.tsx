import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../AdminLayout";
import PageTitle from "../../../components/PageTitle";
import DataTable from "../../../components/DataTable";
import { DataTableColumn } from "../../../components/DataTable";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { setIsLoading } from "../../../store/slices/uiSlice";
import Modal from "../../../components/Modal";
import Spinner from "../../../components/Spinner";
import { RootState } from "../../../store/store";
import { setClubs } from "../../../store/slices/clubSlice";

interface SportsClub {
  id: string;
  clubName: string;
  email: string;
  description: string;
}

const AllSportsClubs: React.FC = () => {
  const [sportsClubs, setSportsClubs] = useState<SportsClub[]>([]);
  const [deleteSportsClubId, setDeleteSportsClubId] = useState<string | null>(null);
  const navigate = useNavigate();

  const isLoading = useSelector((state: any) => state.ui.isLoading);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  // Fetch SportsClubs from API
  useEffect(() => {
    const fetchSportsClubs = async () => {
      try {
        dispatch(setIsLoading(true));
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/clubs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const mappedSportsClubs = response.data.map((club: any) => ({
          ...club,
          id: club.id || club._id,
        }));

        // Save to Redux and localStorage
        dispatch(setClubs(mappedSportsClubs));
        setSportsClubs(mappedSportsClubs);

        if (mappedSportsClubs.length === 0) {
          toast.info("No sports clubs found. Please add some sports clubs first.");
        }
      } catch (error: any) {
        const errorMessage = 
          error?.response?.data?.message || "Failed to fetch sports clubs.";
        toast.error(errorMessage);
        console.error(error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchSportsClubs();
  }, [dispatch, token]);

  // Handle delete action
  const handleDelete = async () => {
    if (!deleteSportsClubId) return;
    setSportsClubs((prev) => prev.filter((sportsClub) => sportsClub.id !== deleteSportsClubId));
    setDeleteSportsClubId(null);
    toast.success("Sports club deleted successfully.");
  };

  // Navigate to view a single sports Club
  const handleViewSportsClub = (id: string) => {
    navigate(`/administrator/view-sports-club/${id}`);
  };

  // Navigate to edit a single sports Club
  const handleEditSportsClub = (id: string) => {
    navigate(`/administrator/edit-sports-club/${id}`);
  };

  // Define table columns
  const columns: DataTableColumn<SportsClub>[] = [
    { key: "clubName", label: "Sports Club Name" },
    { key: "email", label: "Email Address" },
    { key: "description", label: "Description" },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex justify-center gap-4">
          <button onClick={() => handleViewSportsClub(row.id)} className="text-green-500">
            <MdRemoveRedEye size={20} />
          </button>
          <button onClick={() => handleEditSportsClub(row.id)} className="text-blue-500">
            <MdEdit size={20} />
          </button>
          <button onClick={() => setDeleteSportsClubId(row.id)} className="text-red-500">
            <MdDelete size={20} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageTitle
        title="All Sports Clubs"
        breadcrumbs={[
          { label: "Home", to: "/administrator/dashboard" },
          { label: "Sports Clubs" },
        ]}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        <DataTable data={sportsClubs} columns={columns} searchKeys={["clubName", "email"]} />
      )}

      {/* Delete Confirmation Modal */}
      {deleteSportsClubId && (
        <Modal title="Confirm Deletion" onClose={() => setDeleteSportsClubId(null)} onConfirm={handleDelete}>
          <p>Are you sure you want to delete this Sports Club?</p>
        </Modal>
      )}
    </AdminLayout>
  );
};

export default AllSportsClubs;
