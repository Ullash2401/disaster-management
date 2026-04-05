import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Settings = () => {
  const currentUserId = "USER_ID_HERE"; // Replace with actual logged-in user ID

  // --- Account/Profile ---
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [accountData, setAccountData] = useState(null);

  // --- Notifications/Alerts ---
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [disasterTypes, setDisasterTypes] = useState({
    flood: true,
    earthquake: false,
    fire: false,
  });
  const [alertRegion, setAlertRegion] = useState("All Regions");

  // --- System/Advanced ---
  const [language, setLanguage] = useState("English");
  const [region, setRegion] = useState("Bangladesh");

  // --- Dark Mode placeholder ---
  const [darkMode, setDarkMode] = useState(false);

  // --- Fetch account details ---
  const fetchAccountData = async () => {
    try {
      const res = await fetch(`/api/account/${currentUserId}`);
      const data = await res.json();
      if (data.success) {
        setAccountData(data.user);
        setUsername(data.user.name || "");
        setEmail(data.user.email || "");
        setRegion(data.user.region || "Bangladesh");
        setLanguage(data.user.language || "English");
      } else {
        console.error("Failed to fetch account:", data.message);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchAccountData();
    })();
  }, []);

  // --- Handlers ---
  const handleDisasterToggle = (type) => {
    setDisasterTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSaveAccount = async () => {
    try {
      const res = await fetch("/api/account/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId, username, email, password, region, language }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Account updated successfully!");
        setPassword("");
        setIsEditModalOpen(false);
        fetchAccountData(); // refresh displayed info
      } else alert("Failed: " + data.message);
    } catch (err) {
      console.error(err);
      alert("Error updating account.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
    try {
      const res = await fetch("/api/account/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Account deleted.");
        setIsViewModalOpen(false);
        setIsEditModalOpen(false);
        window.location.href = "/";
      } else alert("Failed: " + data.message);
    } catch (err) {
      console.error(err);
      alert("Error deleting account.");
    }
  };

  const handleSaveSettings = () => {
    const settingsData = {
      darkMode,
      notifications: { emailAlerts, pushAlerts, disasterTypes, alertRegion },
      system: { language, region },
    };
    console.log("Saved settings:", settingsData);
    alert("Settings saved!");
  };

  return (
    <div
      className="relative min-h-screen px-8 py-12 bg-cover bg-center text-white"
      style={{ backgroundImage: "url('../assets/nature.jpg')" }}
    >
      <div className="absolute inset-0 bg-emerald-900/60"></div>

      <div className="relative z-10 max-w-5xl mx-auto p-10 rounded-3xl bg-white/10 backdrop-blur-xl shadow-2xl flex flex-col gap-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center">
          App <span className="text-emerald-300">Settings</span>
        </h1>

        {/* Account/Profile */}
        <h2 className="text-2xl font-semibold text-white/90">Account/Profile</h2>
        <div className="flex gap-4">
          <button onClick={() => setIsEditModalOpen(true)} className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 transition font-semibold shadow-lg">
            Edit Account
          </button>
          <button onClick={() => setIsViewModalOpen(true)} className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 transition font-semibold shadow-lg">
            View Account Details
          </button>
        </div>

        {/* Notifications & Alerts */}
        <h2 className="text-2xl font-semibold text-white/90 mt-6">Notifications & Alerts</h2>
        <div className="flex items-center gap-3">
          <input type="checkbox" checked={emailAlerts} onChange={() => setEmailAlerts(!emailAlerts)} className="accent-emerald-400 w-5 h-5" />
          <label>Email Alerts</label>
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" checked={pushAlerts} onChange={() => setPushAlerts(!pushAlerts)} className="accent-emerald-400 w-5 h-5" />
          <label>Push Notifications</label>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <label>Disaster Types:</label>
          {Object.keys(disasterTypes).map((type) => (
            <div key={type} className="flex items-center gap-3">
              <input type="checkbox" checked={disasterTypes[type]} onChange={() => handleDisasterToggle(type)} className="accent-emerald-400 w-5 h-5" />
              <label>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
            </div>
          ))}
        </div>
        <input type="text" placeholder="Alert Region" className="w-full py-3 px-4 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition mt-2" value={alertRegion} onChange={(e) => setAlertRegion(e.target.value)} />

        {/* System / Dark Mode */}
        <h2 className="text-2xl font-semibold text-white/90 mt-6">System / Advanced</h2>
        <div className="flex items-center gap-3 mb-2">
          <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} className="accent-emerald-400 w-5 h-5" />
          <label>Enable Dark Mode (Demo)</label>
        </div>
        <select className="w-full py-3 px-4 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition mt-2" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option>English</option>
          <option>Bengali</option>
          <option>Hindi</option>
        </select>
        <input type="text" placeholder="Region" className="w-full py-3 px-4 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition mt-2" value={region} onChange={(e) => setRegion(e.target.value)} />

        {/* Save/Delete Buttons */}
        <div className="flex gap-4 mt-4">
          <button onClick={handleSaveSettings} className="flex-1 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 transition font-semibold shadow-lg">Save Changes</button>
          <button onClick={handleDeleteAccount} className="flex-1 px-6 py-3 rounded-xl bg-red-500 hover:bg-red-400 transition font-semibold shadow-lg">Delete Account</button>
        </div>
      </div>

      {/* Edit Account Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
          <div className="bg-white/20 backdrop-blur-xl w-96 max-w-[90%] p-8 rounded-2xl shadow-2xl flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-white">Edit Account</h3>
            <div className="relative flex items-center gap-3">
              <FaUser className="absolute left-3 text-white/70" />
              <input type="text" placeholder="Username" className="w-full py-3 pl-10 pr-4 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="relative flex items-center gap-3">
              <FaEnvelope className="absolute left-3 text-white/70" />
              <input type="email" placeholder="Email" className="w-full py-3 pl-10 pr-4 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="relative flex items-center gap-3">
              <FaLock className="absolute left-3 text-white/70" />
              <input type="password" placeholder="New Password" className="w-full py-3 pl-10 pr-4 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex gap-4 mt-4">
              <button onClick={handleSaveAccount} className="flex-1 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 transition font-semibold text-white shadow-lg">Save</button>
              <button onClick={() => setIsEditModalOpen(false)} className="flex-1 px-6 py-3 rounded-xl bg-red-500 hover:bg-red-400 transition font-semibold text-white shadow-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* View Account Modal */}
      {isViewModalOpen && accountData && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
          <div className="bg-white/20 backdrop-blur-xl w-96 max-w-[90%] p-8 rounded-2xl shadow-2xl flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-white">Account Details</h3>
            <p><strong>Username:</strong> {accountData.name}</p>
            <p><strong>Email:</strong> {accountData.email}</p>
            <p><strong>Region:</strong> {accountData.region || "N/A"}</p>
            <p><strong>Language:</strong> {accountData.language || "N/A"}</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setIsViewModalOpen(false)} className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-400 transition font-semibold text-white shadow-lg">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;