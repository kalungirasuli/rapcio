import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import PageTitle from "../../../components/PageTitle";
import Spinner from "../../../components/Spinner";
import AdminLayout from "../AdminLayout";

const ViewPlayer: React.FC = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const navigate = useNavigate();
  const idCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get("/data/players.json");
        const players = response.data;
        const foundPlayer = players.find((p: any) => p.id === id);

        if (foundPlayer) {
          setPlayer(foundPlayer);
        } else {
          toast.error("Player not found!");
          navigate("/administrator/players");
        }
      } catch (error) {
        console.error("Error loading player:", error);
        toast.error("Failed to load player data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [id, navigate]);

  const downloadIDCard = () => {
    if (!idCardRef.current || !player) return;

    setDownloading(true);
    toast.info("Generating PDF...");

    const element = idCardRef.current;
    const opt = {
      margin: 10,
      filename: `${player.firstName}_${player.familyName}_ID.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: false
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait'
      }
    };

    html2pdf().from(element).set(opt).save()
      .then(() => {
        toast.success("ID card PDF downloaded successfully");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        toast.error("Failed to generate PDF");
      })
      .finally(() => {
        setDownloading(false);
      });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      </AdminLayout>
    );
  }

  if (!player) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <p>Player not found</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PageTitle
        title="Player Details"
        breadcrumbs={[
          { label: "Home", to: "/administrator/dashboard" },
          { label: "Players", to: "/administrator/players" },
          { label: "View Player" },
        ]}
      />

      <div className="p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 text-white bg-primary hover:bg-primary-dark rounded shadow"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>

          <button
            onClick={downloadIDCard}
            className="inline-flex items-center px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded shadow"
            disabled={downloading}
          >
            <FaDownload className="mr-2" />
            {downloading ? "Generating PDF..." : "Download ID Card (PDF)"}
          </button>
        </div>

        {/* ID Card - For Download */}
        <div
          ref={idCardRef}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8 mx-auto"
          style={{
            width: "800px",
            maxWidth: "100%",
            border: "1px solid #e2e8f0",
            background: "linear-gradient(to bottom right, #f8fafc, #ffffff)",
          }}
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Side - Player Info */}
            <div className="flex-1">
              <div className="flex items-center mb-6">
                {player.passportPhoto ? (
                  <img
                    src={player.passportPhoto}
                    alt="Player"
                    className="w-24 h-24 rounded-full object-cover mr-4 border-4 border-blue-100 dark:border-blue-700"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-700 flex items-center justify-center mr-4 border-4 border-blue-200 dark:border-blue-800">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                      {player.firstName.charAt(0)}
                      {player.familyName.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {player.firstName} {player.familyName}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {player.club}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {player.role} • {player.sport}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    ID Number
                  </p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {player.identificationNumber || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date of Birth
                  </p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {player.dateOfBirth}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Nationality
                  </p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {player.mainNationality}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </p>
                  <p
                    className={`font-medium ${
                      player.status === "Active"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {player.status}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - QR Code */}
            <div className="flex flex-col items-center justify-center border-l border-gray-200 dark:border-gray-700 pl-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Player Verification
              </h3>
              <div className="bg-white dark:bg-gray-700 p-3 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm">
                <QRCode
                  value={JSON.stringify({
                    id: player.id,
                    name: `${player.firstName} ${player.familyName}`,
                    club: player.club,
                    verification: "https://your-verification-url.com",
                    timestamp: new Date().toISOString(),
                  })}
                  size={180}
                  level="H"
                />
              </div>
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center max-w-xs">
                Scan this QR code to verify player identity and access official
                records
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Issued by: Rapico • Valid until: {new Date().getFullYear() + 1}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewPlayer;