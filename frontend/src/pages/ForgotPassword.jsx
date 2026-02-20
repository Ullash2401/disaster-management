import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import "../styles/forgot.css"; // new CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send reset email");

      setMessage("Password reset link sent! Check your email.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-root">
      {/* Overlay */}
      <div className="forgot-overlay"></div>

      {/* Glass card */}
      <form onSubmit={handleSubmit} className="forgot-card">
        <h2 className="forgot-title">Forgot Password</h2>

        {error && <p className="forgot-error">{error}</p>}
        {message && <p className="forgot-message">{message}</p>}

        {/* Email Input */}
        <div className="forgot-input-wrapper">
          <FaEnvelope className="forgot-icon" />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="forgot-input"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading} className="forgot-btn">
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {/* Footer */}
        <p className="forgot-footer">
          Remembered your password?{" "}
          <Link to="/login" className="forgot-link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;