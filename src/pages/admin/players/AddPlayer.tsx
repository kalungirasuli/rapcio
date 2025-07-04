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
import DatePicker from "../../../components/DatePicker";
import { RootState } from "../../../store/store";

const AddPlayer: React.FC = () => {
  const [formData, setFormData] = useState({
    familyName: "",
    firstName: "",
    languageOfTheName: "",
    dateOfBirth: "",
    gender: "",
    countryOfBirth: "",
    mainNationality: "",
    secondaryNationality: "",
    regionOrStateOfBirth: "",
    cityOfBirth: "",
    identificationNumber: "",
    status: "",
    clubId: "",
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

  const handleDateChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      dateOfBirth: value,
    }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = Object.keys(formData);
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (missingFields.length) {
      toast.error("Missing fields. Please fill out all the required fields.");
      return;
    }

    try {
      dispatch(setIsLoading(true));
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;

      // Prepare payload by trimming string fields
      const payload = Object.keys(formData).reduce((acc, key) => {
        const typedKey = key as keyof typeof formData;
        acc[typedKey] = formData[typedKey].trim();
        return acc;
      }, {} as { [K in keyof typeof formData]: string });

      await axios.post(`${SERVER_URL}/players`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setFormData({
        familyName: "",
        firstName: "",
        languageOfTheName: "",
        dateOfBirth: "",
        gender: "",
        countryOfBirth: "",
        mainNationality: "",
        secondaryNationality: "",
        regionOrStateOfBirth: "",
        cityOfBirth: "",
        identificationNumber: "",
        status: "",
        clubId: "",
      });
      
      toast.success("Player added successfully!");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 
        "An error occurred while adding the player. Please try again.";
      toast.error(errorMessage);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <AdminLayout>
      <PageTitle
        title="Add Player"
        breadcrumbs={[
          { label: "All Players", to: "/administrator/all-players" },
          { label: "Add Player" },
        ]}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center items-center">
          <div className="bg-card dark:bg-cardDark p-6 rounded-md shadow-md w-full max-w-4xl">
            <h2 className="text-3xl font-semibold text-center text-textColor dark:text-textColorDark mb-4">
              Register a new player
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <section>
                <h3 className="uppercase mb-2 text-md font-bold">Player Info:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Family Name"
                    type="text"
                    name="familyName"
                    id="familyName"
                    value={formData.familyName}
                    onChange={handleInputChange}
                    placeholder="Enter family name"
                  />
                  <InputField
                    label="First Name"
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                  />
                  <InputField
                    label="Language Of The Name"
                    type="text"
                    name="languageOfTheName"
                    id="languageOfTheName"
                    value={formData.languageOfTheName}
                    onChange={handleInputChange}
                    placeholder="Enter language of the name"
                  />
                  <DatePicker
                    label="Date Of Birth"
                    value={formData.dateOfBirth}
                    onChange={handleDateChange}
                  />
                  <div className="col-span-2">
                    <label className="block text-sm text-label dark:text-labelDark font-medium mb-1">
                      Gender
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={formData.gender === "Male"}
                          onChange={handleGenderChange}
                          className="w-4 h-4"
                        />
                        <span className="ml-2">Male</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={formData.gender === "Female"}
                          onChange={handleGenderChange}
                          className="w-4 h-4"
                        />
                        <span className="ml-2">Female</span>
                      </label>
                    </div>
                  </div>
                  <InputField
                    label="Country Of Birth"
                    type="text"
                    name="countryOfBirth"
                    id="countryOfBirth"
                    value={formData.countryOfBirth}
                    onChange={handleInputChange}
                    placeholder="Enter country of birth"
                  />
                  <InputField
                    label="Main Nationality"
                    type="text"
                    name="mainNationality"
                    id="mainNationality"
                    value={formData.mainNationality}
                    onChange={handleInputChange}
                    placeholder="Enter main nationality"
                  />
                  <InputField
                    label="Secondary Nationality"
                    type="text"
                    name="secondaryNationality"
                    id="secondaryNationality"
                    value={formData.secondaryNationality}
                    onChange={handleInputChange}
                    placeholder="Enter secondary nationality"
                  />
                  <InputField
                    label="Region/State Of Birth"
                    type="text"
                    name="regionOrStateOfBirth"
                    id="regionOrStateOfBirth"
                    value={formData.regionOrStateOfBirth}
                    onChange={handleInputChange}
                    placeholder="Enter region or state of birth"
                  />
                  <InputField
                    label="City Of Birth"
                    type="text"
                    name="cityOfBirth"
                    id="cityOfBirth"
                    value={formData.cityOfBirth}
                    onChange={handleInputChange}
                    placeholder="Enter city of birth"
                  />
                  <InputField
                    label="Identification Number"
                    type="text"
                    name="identificationNumber"
                    id="identificationNumber"
                    value={formData.identificationNumber}
                    onChange={handleInputChange}
                    placeholder="Enter identification number"
                  />
                  <InputField
                    label="Status"
                    type="text"
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    placeholder="Enter status"
                  />
                  <InputField
                    label="Club ID"
                    type="text"
                    name="clubId"
                    id="clubId"
                    value={formData.clubId}
                    onChange={handleInputChange}
                    placeholder="Enter club ID"
                  />
                </div>
              </section>

              <div className="flex justify-end mt-8">
                <Button type="submit" text="Add Player" disabled={isLoading} />
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AddPlayer;
