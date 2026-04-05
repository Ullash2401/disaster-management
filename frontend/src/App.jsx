import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import Choice from "./pages/Choice";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DonateIntro from "./pages/DonateIntro";
import Donate from "./pages/donate";
import Settings from "./pages/Settings";

// Protected Pages
import MakeReports from "./pages/MakeReports";
import AssignAuthority from "./pages/AssignAuthority";
import AssignDonation from "./pages/AssignDonation";
import VolunteerReport from "./pages/VolunteerReport"; // ✅ NEW IMPORT

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/choice" element={<Choice />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate-intro" element={<DonateIntro />} />
        <Route path="/donate" element={<Donate />} />

        {/* Optional: protect settings if needed */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* ===== PROTECTED ROUTES ===== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/make-reports"
          element={
            <ProtectedRoute>
              <MakeReports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assign-authority"
          element={
            <ProtectedRoute>
              <AssignAuthority />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assign-donation"
          element={
            <ProtectedRoute>
              <AssignDonation />
            </ProtectedRoute>
          }
        />

        {/* ✅ NEW: Volunteer Report Route */}
        <Route
          path="/volunteer-report"
          element={
            <ProtectedRoute>
              <VolunteerReport />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;