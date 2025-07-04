import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { setPlayers } from "../../../store/slices/playerSlice";
import { playerService } from "../../../utils/api";

// Define the Player type
interface Player {
  id: string;
  familyName: string;
  firstName: string;
  languageOfTheName: string;
  dateOfBirth: string;
  gender: string;
  countryOfBirth: string;
  mainNationality: string;
  secondaryNationality: string;
  regionOrStateOfBirth: string;
  cityOfBirth: string;
  identificationNumber: string;
  status: string;
  addressOne: string;
  addressTwo: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  contactNumber: string;
  contactEmail: string;
  club: string;
  role: string;
  sport: string;
  level: string;
  passportPhoto: string;
  identificationDocument: string;
  registrationForm: string;
  transferOrContractAgreement: string;
  medicalCertification: string;
}

const AllPlayers: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [deletePlayerId, setDeletePlayerId] = useState<string | null>(null);
  const navigate = useNavigate();

  const isLoading = useSelector((state: any) => state.ui.isLoading);
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  // Fetch players from the server endpoint
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        dispatch(setIsLoading(true));
        const response = await playerService.getAllPlayers();

        const mappedPlayers = response.map((player: any) => ({
          ...player,
          id: player.id || player._id,
        }));

        // Save to Redux and localStorage
        dispatch(setPlayers(mappedPlayers));
        setPlayers(mappedPlayers);

        if (mappedPlayers.length === 0) {
          toast.info("No players found. Please add some players first.");
        }
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || "Failed to fetch players.";
        toast.error(errorMessage);
        console.error(error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchPlayers();
  }, [dispatch]);

  // Handle delete action
  const handleDelete = async () => {
    if (!deletePlayerId) return;
    setPlayers((prev) => prev.filter((player) => player.id !== deletePlayerId));
    setDeletePlayerId(null);
    toast.success("Player deleted successfully.");
  };

  // Navigate to view a single player
  const handleViewPlayer = (id: string) => {
    navigate(`/administrator/view-player/${id}`);
  };

  // Navigate to edit a single user
  const handleEditPlayer = (id: string) => {
    navigate(`/administrator/edit-player/${id}`);
  };

  // Define table columns
  const columns: DataTableColumn<Player>[] = [
    { key: "familyName", label: "Family Name" },
    { key: "firstName", label: "First Name" },
    { key: "dateOfBirth", label: "Date of Birth" },
    { key: "gender", label: "Gender" },
    { key: "mainNationality", label: "Nationality" },
    { key: "club", label: "Club" },
    { key: "role", label: "Role" },
    { key: "sport", label: "Sport" },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`text-sm font-bold uppercase ${
            value === "Active" ? "text-green-500" : "text-red-500"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleViewPlayer(row.id)}
            className="text-green-500"
          >
            <MdRemoveRedEye size={20} />
          </button>
          <button
            onClick={() => handleEditPlayer(row.id)}
            className="text-blue-500"
          >
            <MdEdit size={20} />
          </button>
          <button
            onClick={() => setDeletePlayerId(row.id)}
            className="text-red-500"
          >
            <MdDelete size={20} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageTitle
        title="All Players"
        breadcrumbs={[
          { label: "Home", to: "/administrator/dashboard" },
          { label: "Players" },
        ]}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        <DataTable
          data={players}
          columns={columns}
          searchKeys={["familyName", "firstName", "dateOfBirth"]}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletePlayerId && (
        <Modal
          title="Confirm Deletion"
          onClose={() => setDeletePlayerId(null)}
          onConfirm={handleDelete}
        >
          <p>Are you sure you want to delete this player?</p>
        </Modal>
      )}
    </AdminLayout>
  );
};

export default AllPlayers;
