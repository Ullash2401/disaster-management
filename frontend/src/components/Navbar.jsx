import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleAuthChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("authChange"));
    setOpenMenu(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">DisasterSafe</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="signup-btn">
              Create Account
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>

            {/* Dropdown */}
            <div className="profile-dropdown">
              <button
                className="profile-btn"
                onClick={() => setOpenMenu(!openMenu)}
              >
                ☰
              </button>

              {openMenu && (
                <div className="dropdown-menu">
                  <Link to="/settings" onClick={() => setOpenMenu(false)}>
                    Settings
                  </Link>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
