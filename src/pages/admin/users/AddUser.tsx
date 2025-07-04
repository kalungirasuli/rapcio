import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import AdminLayout from "../AdminLayout";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import SelectField from "../../../components/SelectField";
import PageTitle from "../../../components/PageTitle";
import axios from "axios";
import { toast } from "react-toastify";
import { setIsLoading } from "../../../store/slices/uiSlice";
import Spinner from "../../../components/Spinner";

const AddUser: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const roles = [
    { value: "administrator", label: "Administrator" },
    { value: "referee", label: "Referee" },
  ];

  const token = useSelector((state: RootState) => state.auth.token);
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);
  const dispatch = useDispatch();

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

    const requiredFields = ["fullName", "email", "password", "confirmPassword", "role"];
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (missingFields.length) {
      toast.error("Missing fields. Please fill out all the required fields.");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be 8 or more characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and confirm password do not match.");
      return;
    }

    try {
      dispatch(setIsLoading(true));

      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };

      const endpoint = formData.role === "administrator" 
        ? "/auth/signup/admin" 
        : "/auth/signup/referee";

      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}${endpoint}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      });
      toast.success("User added successfully!");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while adding the user. Please try again.";
      toast.error(errorMessage);
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <AdminLayout>
      <PageTitle
        title="Add User"
        breadcrumbs={[
          { label: "All Users", to: "/administrator/all-users" },
          { label: "Add User" },
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
                  <SelectField
                    label="Role"
                    name="role"
                    id="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    options={roles}
                    placeholder="Select a User Role"
                  />
                </div>
              </section>

              {/* User Authentication Section */}
              <section>
                <h3 className="uppercase mb-2 text-md font-bold">
                  Authentication:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Password"
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                  />
                  <InputField
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
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

export default AddUser;
