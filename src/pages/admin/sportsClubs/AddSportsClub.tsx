import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../AdminLayout";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import PageTitle from "../../../components/PageTitle";
import axios from "axios";
import { toast } from "react-toastify";
import { setIsLoading } from "../../../store/slices/uiSlice";
import Spinner from "../../../components/Spinner";
import { RootState } from "../../../store/store";

const AddSportsClub: React.FC = () => {
  const [formData, setFormData] = useState({
    clubName: "",
    email: "",
    description: "",
  });

  const token = useSelector((state: RootState) => state.auth.token);
  const isLoading = useSelector((state: any) => state.ui.isLoading);
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

    // Validate form fields
    const requiredFields = [
      "clubName",
      "email",
      "description",
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (missingFields.length) {
      toast.error("Missing fields. Please fill out all the reqired fields.");
      return;
    }

    try {
      dispatch(setIsLoading(true));
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;

      const payload = Object.keys(formData).reduce((acc, key) => {
        const typedKey = key as keyof typeof formData;
        acc[typedKey] = formData[typedKey].trim();
        return acc;
      }, {} as { [K in keyof typeof formData]: string });

      await axios.post(`${SERVER_URL}/clubs`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setFormData({
        clubName: "",
        email: "",
        description: "",
      });
      toast.success("Sports club added successfully!");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while adding the sports club. Please try again.";
      toast.error(errorMessage);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <AdminLayout>
      <PageTitle
        title="Add Sports Club"
        breadcrumbs={[
          { label: "All Sports Clubs", to: "/administrator/all-sports-clubs" },
          { label: "Add Sports Club" },
        ]}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center items-center">
          <div className="bg-card dark:bg-cardDark p-6 rounded-md shadow-md w-full max-w-4xl">
            <h2 className="text-3xl font-semibold text-center text-textColor dark:text-textColorDark mb-4">
              Register a new sports club
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sports club Info Section */}
              <section>
                <h3 className="uppercase mb-2 text-md font-bold">Sports Club Info:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Club Name"
                    type="text"
                    name="clubName"
                    id="clubName"
                    value={formData.clubName}
                    onChange={handleInputChange}
                    placeholder="Enter club name"
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
                  <InputField
                    label="Description"
                    type="text"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />

                </div>
              </section>

              <div className="flex justify-end mt-8">
                <Button type="submit" text="Add Sports Club" disabled={isLoading} />
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AddSportsClub;
