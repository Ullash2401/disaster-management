import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("authChange"));

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      {/* Overlay */}
      <div className="login-overlay"></div>

      {/* Glass card */}
      <form onSubmit={handleSubmit} className="login-card">
        <h2 className="login-title">Welcome Back</h2>

        {error && <p className="login-error">{error}</p>}

        {/* Email Input */}
        <div className="login-input-wrapper">
          <FaEnvelope className="login-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="login-input"
          />
        </div>

        {/* Password Input */}
        <div className="login-input-wrapper">
          <FaLock className="login-icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="login-input"
          />
        </div>

        <button type="submit" disabled={loading} className="login-btn">
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="login-or">
          <hr />
          <span>OR</span>
          <hr />
        </div>

        <Link to="/signup" className="signup-btn">
          Sign Up
        </Link>

        <p className="forgot-password">
          Forgot your password?{" "}
          <Link to="/forgot" className="forgot-link">
            Reset here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;