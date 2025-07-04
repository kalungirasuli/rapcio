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
import { setUsers } from "../../../store/slices/userSlice";
import { userService } from "../../../utils/api";

interface User {
  id: string;
  fullName: string;
  email: string;
  // phoneNumber: string;
  role: string;
}

const AllUsers: React.FC = () => {
  const [users, setUsersState] = useState<User[]>([]);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  const isLoading = useSelector((state: any) => state.ui.isLoading);
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);
  const storedUsers = useSelector((state: RootState) => state.users.users);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch(setIsLoading(true));
        const response = await userService.getAllUsers();

        const mappedUsers = response.map((user: any) => ({
          ...user,
          id: user.id || user._id, // Assign index as ID if not present
          isActive: user.isActive ?? true, // Default to true if not defined
        }));

        dispatch(setUsers(mappedUsers));
        setUsersState(mappedUsers);

        if (mappedUsers.length === 0) {
          toast.info("No users found. Please add some users first.");
        }
      } catch (error) {
        toast.error("Failed to fetch users.");
        console.error(error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchUsers();
  }, [dispatch]);

  // Handle delete action
  const handleDelete = async () => {
    if (!deleteUserId) return;
    setUsersState((prev) => prev.filter((user) => user.id !== deleteUserId));
    setDeleteUserId(null);
    toast.success("User deleted successfully.");
  };

  // Navigate to view a single user
  const handleViewUser = (id: string) => {
    navigate(`/administrator/view-user/${id}`);
  };

  // Navigate to edit a single user
  const handleEditUser = (id: string) => {
    navigate(`/administrator/edit-user/${id}`);
  };

  // Define table columns
  const columns: DataTableColumn<User>[] = [
    { key: "fullName", label: "Full Name" },
    { key: "email", label: "Email Address" },
    // { key: "phoneNumber", label: "Phone Number" },
    { key: "role", label: "Role" },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleViewUser(row.id)}
            className="text-green-500"
          >
            <MdRemoveRedEye size={20} />
          </button>
          <button
            onClick={() => handleEditUser(row.id)}
            className="text-blue-500"
          >
            <MdEdit size={20} />
          </button>
          <button
            onClick={() => setDeleteUserId(row.id)}
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
        title="All Users"
        breadcrumbs={[
          { label: "Home", to: "/administrator/dashboard" },
          { label: "Users" },
        ]}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        <DataTable
          data={users}
          columns={columns}
          searchKeys={["fullName", "phoneNumber", "email"]}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteUserId && (
        <Modal
          title="Confirm Deletion"
          onClose={() => setDeleteUserId(null)}
          onConfirm={handleDelete}
        >
          <p>Are you sure you want to delete this user?</p>
        </Modal>
      )}
    </AdminLayout>
  );
};

export default AllUsers;
