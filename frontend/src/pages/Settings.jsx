// src/pages/Settings.jsx
import "../styles/Settings.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Settings = () => {
  return (
    <div className="settings-root">
      <div className="settings-overlay"></div>

      <div className="settings-content">
        <h1>
          App <span>Settings</span>
        </h1>
        <p className="settings-note">
          This is a demo settings page. You can see how it would look.
        </p>

        <form className="settings-form">
          {/* Username */}
          <div className="settings-input-wrapper">
            <FaUser className="settings-icon" />
            <input
              type="text"
              placeholder="Username"
              className="settings-input"
              disabled
              value="John Doe"
            />
          </div>

          {/* Email */}
          <div className="settings-input-wrapper">
            <FaEnvelope className="settings-icon" />
            <input
              type="email"
              placeholder="Email"
              className="settings-input"
              disabled
              value="john.doe@example.com"
            />
          </div>

          {/* Password */}
          <div className="settings-input-wrapper">
            <FaLock className="settings-icon" />
            <input
              type="password"
              placeholder="Password"
              className="settings-input"
              disabled
              value="••••••••"
            />
          </div>

          {/* Dark Mode Toggle */}
          <div className="settings-toggle">
            <input type="checkbox" checked disabled />
            <label>Enable Dark Mode (Demo)</label>
          </div>

          {/* Demo Save Button */}
          <button type="button" className="settings-btn" disabled>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;