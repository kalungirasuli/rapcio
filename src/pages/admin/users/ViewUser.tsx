import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AdminLayout from "../AdminLayout";
import PageTitle from "../../../components/PageTitle";
import axios from "axios";
import { toast } from "react-toastify";
import { setIsLoading } from "../../../store/slices/uiSlice";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";

// Define the user type
interface User {
  fullName: string;
  // phoneNumber: string;
  email: string;
  role: string;
}

const ViewUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  const dispatch = useDispatch();

  // Fetch user details
  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return;

      try {
        dispatch(setIsLoading(true));

        // Fetch the JSON file from the public folder
        const response = await axios.get("/data/users.json");
        const usersData = response.data;

        // Find the user by ID
        const userData = usersData.find((user: any) => user.id === id);

        if (!userData) {
          toast.error("User not found!");
          return;
        }

        setUser(userData);
      } catch (error) {
        toast.error("Failed to fetch user details.");
        console.error(error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    if (id) fetchUserData();
  }, [id, dispatch]);

  return (
    <AdminLayout>
      <PageTitle
        title="View User Details"
        breadcrumbs={[
          { label: "All Users", to: "/administrator/all-users" },
          { label: "View User" },
        ]}
      />

      {!user ? (
        <Spinner />
      ) : (
        <div className="flex justify-center items-center">
          <div className="bg-card dark:bg-cardDark p-6 rounded-md shadow-md w-full max-w-4xl">
            <h2 className="text-2xl font-semibold text-center text-textColor dark:text-textColorDark mb-4 capitalize">
              {user.fullName}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-textColor dark:text-textColorDark">
                  Phone Number:
                </label>
                {/* <p className="text-sm text-label dark:text-labelDark"> */}
                  {/* {user.phoneNumber} */}
                {/* </p> */}
              </div>
              <div>
                <label className="block font-semibold text-textColor dark:text-textColorDark">
                  Email Address:
                </label>
                <p className="text-sm text-label dark:text-labelDark">
                  {user.email}
                </p>
              </div>
              <div>
                <label className="block font-semibold text-textColor dark:text-textColorDark">
                  Role:
                </label>
                <p className="text-sm text-label dark:text-labelDark capitalize">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ViewUser;
