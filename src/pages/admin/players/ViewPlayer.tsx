import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { toast } from 'react-toastify';
import AdminLayout from '../AdminLayout';
import Spinner from '../../../components/Spinner';
import PageTitle from '../../../components/PageTitle';
import { FaDownload, FaArrowLeft } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';
import QRCode from 'react-qr-code';

interface Player {
  id: string;
  firstName: string;
  familyName: string;
  dateOfBirth: string;
  gender: string;
  mainNationality: string;
  status: string;
  identificationNumber: string;
  countryOfBirth: string;
  cityOfBirth: string;
  clubId: string;
}

const ViewPlayer: React.FC = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const navigate = useNavigate();
  const idCardRef = useRef<HTMLDivElement>(null);

  // Get players from Redux store
  const players = useSelector((state: RootState) => state.players.players);

  useEffect(() => {
    const findPlayer = () => {
      try {
        const foundPlayer = players.find((p: Player) => p.id === id);

        if (foundPlayer) {
          setPlayer(foundPlayer);
        } else {
          toast.error("Player not found!");
          navigate("/administrator/all-players");
        }
      } catch (error) {
        console.error("Error loading player:", error);
        toast.error("Failed to load player data.");
      } finally {
        setLoading(false);
      }
    };

    findPlayer();
  }, [id, navigate, players]);

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
      .catch((error: Error) => {
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
          { label: "Players", to: "/administrator/all-players" },
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
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8 mx-auto w-[800px] max-w-full border border-solid border-[#e2e8f0] bg-gradient-to-br from-[#f8fafc] to-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Side - Player Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                {player.firstName} {player.familyName}
              </h2>
              
              <div className="space-y-4">
                <InfoItem label="Date of Birth" value={player.dateOfBirth} />
                <InfoItem label="Gender" value={player.gender} />
                <InfoItem label="Nationality" value={player.mainNationality} />
                <InfoItem label="Country of Birth" value={player.countryOfBirth} />
                <InfoItem label="City of Birth" value={player.cityOfBirth} />
                <InfoItem label="ID Number" value={player.identificationNumber} />
                <InfoItem 
                  label="Status" 
                  value={player.status}
                  className={player.status === "Active" ? "text-green-600" : "text-red-600"}
                />
              </div>
            </div>

            {/* Right Side - QR Code */}
            <div className="flex flex-col items-center justify-center border-l border-gray-200 dark:border-gray-700 pl-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Player Verification
              </h3>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <QRCode
                  value={JSON.stringify({
                    id: player.id,
                    name: `${player.firstName} ${player.familyName}`,
                    club: player.clubId,
                    timestamp: new Date().toISOString(),
                  })}
                  size={200}
                  level="H"
                />
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                Scan to verify player identity
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const InfoItem: React.FC<{ label: string; value: string; className?: string }> = ({ 
  label, 
  value,
  className = "text-gray-800 dark:text-gray-200"
}) => (
  <div>
    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{label}</p>
    <p className={`font-medium ${className}`}>{value}</p>
  </div>
);

export default ViewPlayer;