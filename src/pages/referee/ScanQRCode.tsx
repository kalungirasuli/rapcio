import { useEffect, useState, useRef } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/Button";
import axios from "axios";
import { Html5QrcodeScanner, Html5QrcodeScanType, Html5Qrcode } from "html5-qrcode";
import { toast, ToastContainer } from "react-toastify";
import { FaUserCheck, FaCamera, FaBirthdayCake, FaFlag, FaHome, FaPhone, FaEnvelope, FaTshirt } from "react-icons/fa";
import { MdCameraswitch, MdSports } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";

const ScanQRCode: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [foundPlayer, setFoundPlayer] = useState<any>(null);
  const [cameraId, setCameraId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [availableCameras, setAvailableCameras] = useState<{id: string, label: string}[]>([]);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const qrBoxId = "qr-scanner-container"; 

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("/data/players.json");
        setPlayers(response.data);
        console.log("Players loaded:", response.data);
      } catch (error) {
        console.error("Error loading players:", error);
        toast.error("Failed to load players data!");
      }
    };
    fetchPlayers();

    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    try {
      const cameras = await Html5Qrcode.getCameras();
      if (cameras.length === 0) {
        toast.error("No cameras found");
        return;
      }
      
      setAvailableCameras(cameras);
      setIsScanning(true);
      
      scannerRef.current = new Html5QrcodeScanner(
        qrBoxId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
          rememberLastUsedCamera: true,
          showTorchButtonIfSupported: true,
          showZoomSliderIfSupported: true
        },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          handleScanSuccess(decodedText);
        },
        (errorMessage) => {
          console.log(`QR Code scan error: ${errorMessage}`);
        }
      );
    } catch (error) {
      console.error("Error starting scanner:", error);
      toast.error("Failed to start scanner. Please check camera permissions.");
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(error => {
        console.error("Failed to clear scanner:", error);
      }); 
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleScanSuccess = (decodedText: string) => {
    if (decodedText !== scanResult) {
      setScanResult(decodedText);
      searchPlayer(decodedText);
    }
  };

  const switchCamera = async () => {
    if (!scannerRef.current || !isScanning || availableCameras.length < 2) return;
    
    try {
      const currentCameraIndex = availableCameras.findIndex(cam => cam.id === cameraId);
      const newCameraIndex = (currentCameraIndex + 1) % availableCameras.length;
      const newCameraId = availableCameras[newCameraIndex].id;
      
      stopScanner();
      setCameraId(newCameraId);
      await startScanner();
      
      toast.info(`Switched to ${availableCameras[newCameraIndex].label || 'camera'}`);
    } catch (error) {
      console.error("Error switching camera:", error);
      toast.error("Failed to switch camera");
    }
  };

  const searchPlayer = (scannedData: string) => {
    try {
      const parsedData = JSON.parse(scannedData);
      const { clubId, firstName } = parsedData;

      // Search for player where EITHER clubId OR firstName matches
      const player = players.find(
        (p) => p.clubId === clubId || p.firstName === firstName
      );

      if (player) {
        setFoundPlayer(player);
        toast.success(`Player found: ${player.firstName} (${player.clubId})`);
      } else {
        setFoundPlayer(null);
        toast.error("No matching player found.");
      }
    } catch (error) {
      console.error("Invalid QR Code format.", error);
      toast.error("Invalid QR Code format. Please scan a valid QR code.");
    }
  };


  const handleProceed = () => {
    if (foundPlayer) {
      toast.success(`Proceeding with ${foundPlayer.firstName}!`);
      // Add your proceed logic here
    } else {
      toast.warning("Please scan a valid player first.");
    }
  };

  return (
    <AuthLayout>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="m-6 bg-card dark:bg-cardDark p-6 rounded-md shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-textColor dark:text-textColorDark mb-6">
          <FaUserCheck className="inline-block mr-2" /> Scan QR Code
        </h2>

        <div id={qrBoxId} className="mb-4 w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden" />
        
        <div className="flex justify-center gap-4 mb-4">
          {!isScanning ? (
            <Button 
              text="Start Scanner" 
              onClick={startScanner}
              icon={<FaCamera className="mr-2" />}
            />
          ) : (
            <>
              {availableCameras.length > 1 && (
                <Button 
                  text="Switch Camera" 
                  onClick={switchCamera}
                  variant="secondary"
                  icon={<MdCameraswitch className="mr-2" />}
                />
              )}
              <Button 
                text="Stop Scanner" 
                onClick={stopScanner}
                variant="danger"
              />
            </>
          )}
        </div>

        {foundPlayer && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {/* ID Card Header */}
            <div className="bg-blue-600 dark:bg-blue-800 p-4 text-white">
              <h3 className="text-xl font-bold">{foundPlayer.club}</h3>
              <p className="text-sm">Official Player ID</p>
            </div>
            
            {/* ID Card Body */}
            <div className="p-4">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500">
                  <img 
                    src={foundPlayer.passportPhoto || "https://via.placeholder.com/100"} 
                    alt={`${foundPlayer.firstName} ${foundPlayer.familyName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold">
                    {foundPlayer.firstName} {foundPlayer.familyName}
                  </h4>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <IoMdPerson className="mr-1" />
                    <span>ID: {foundPlayer.id}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <FaTshirt className="mr-1" />
                    <span>{foundPlayer.role} - {foundPlayer.level}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <FaBirthdayCake className="mr-2 text-blue-500" />
                  <span>{foundPlayer.dateOfBirth} ({foundPlayer.gender})</span>
                </div>
                <div className="flex items-center">
                  <FaFlag className="mr-2 text-blue-500" />
                  <span>{foundPlayer.countryOfBirth} ({foundPlayer.mainNationality})</span>
                </div>
                <div className="flex items-center">
                  <MdSports className="mr-2 text-blue-500" />
                  <span>{foundPlayer.sport}</span>
                </div>
                <div className="flex items-center">
                  <FaPhone className="mr-2 text-blue-500" />
                  <span>{foundPlayer.contactNumber}</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="mr-2 text-blue-500" />
                  <span>{foundPlayer.contactEmail}</span>
                </div>
                <div className="flex items-center">
                  <FaHome className="mr-2 text-blue-500" />
                  <span>{foundPlayer.addressOne}, {foundPlayer.city}, {foundPlayer.country}</span>
                </div>
              </div>
            </div>
            
            {/* ID Card Footer */}
            <div className="bg-gray-100 dark:bg-gray-700 p-2 text-center text-xs">
              Status: <span className="font-bold text-green-600">{foundPlayer.status}</span>
            </div>
          </div>
        )}

        <div className="mt-6">
          <Button 
            text="Proceed" 
            onClick={handleProceed}
            disabled={!foundPlayer}
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default ScanQRCode;