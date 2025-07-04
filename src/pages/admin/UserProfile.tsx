import AdminLayout from "./AdminLayout";
import PageTitle from "../../components/PageTitle";

const UserProfile: React.FC = () => {
  return (
    <AdminLayout>
      <PageTitle
        title="User Profile"
        breadcrumbs={[
          { label: "Home", to: "/admin/dashboard" },
          { label: "Profile" },
        ]}
      />
      <div className="flex justify-center items-center">
        User Profile Page
      </div>
    </AdminLayout>
  );
};

export default UserProfile;
