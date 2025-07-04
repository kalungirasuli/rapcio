import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../AdminLayout";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import SelectField from "../../../components/SelectField";
import PageTitle from "../../../components/PageTitle";
import axios from "axios";
import { toast } from "react-toastify";
import { setIsLoading } from "../../../store/slices/uiSlice";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";

interface UserFormData {
  fullName: string;
  // phoneNumber: string;
  email: string;
  role: string;
}

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<UserFormData>({
    fullName: "",
    // phoneNumber: "",
    email: "",
    role: "",
  });

  const isLoading = useSelector((state: any) => state.ui.isLoading);
  const dispatch = useDispatch();

  const roles = [
    { value: "administrator", label: "Administrator" },
    { value: "referee", label: "Referee" },
  ];

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

        // Prefill the form with fetched user data
        setFormData({
          fullName: userData.fullName,
          // phoneNumber: userData.phoneNumber,
          email: userData.email,
          role: userData.role,
        });
      } catch (error) {
        toast.error("Failed to fetch user details.");
        console.error(error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchUserData();
  }, [id, dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      dispatch(setIsLoading(true));
      const payload = {
        fullName: formData.fullName.trim(),
        // phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim(),
        role: formData.role.trim(),
      };

      await axios.put(`/data/users.json/${id}`, payload);
      toast.success("User updated successfully!");
    } catch {
      toast.error("Failed to update user. Please try again.");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <AdminLayout>
      <PageTitle
        title="Edit User"
        breadcrumbs={[
          { label: "All users", to: "/administrator/all-users" },
          { label: "Edit user" },
        ]}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center items-center">
          <div className="bg-card dark:bg-cardDark p-6 rounded-md shadow-md w-full max-w-4xl">
            <h2 className="text-3xl font-semibold text-center text-textColor dark:text-textColorDark mb-4">
              Register a new user
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Info Section */}
              <section>
                <h3 className="uppercase mb-2 text-md font-bold">User Info:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Full Name"
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                  />
                  <InputField
                    label="Email"
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                  />
                  {/* <InputField
                    label="Phone Number"
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  /> */}

                  <SelectField
                    label="Role"
                    name="role"
                    id="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    options={roles}
                    placeholder="Select a User Role"
                    disabled={false}
                  />
                </div>
              </section>

              <div className="flex justify-end mt-8">
                <Button type="submit" text="Add User" disabled={isLoading} />
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default EditUser;
