import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef();

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );
  const [openMenu, setOpenMenu] = useState(false);

  const currentPath = location.pathname;

  useEffect(() => {
    const updateAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    // initial auth check
    updateAuth();

    window.addEventListener("authChange", updateAuth);
    window.addEventListener("storage", updateAuth);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("authChange", updateAuth);
      window.removeEventListener("storage", updateAuth);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [location.pathname]);

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

      {/* DROPDOWN MENU */}
      <div className="profile-dropdown" ref={menuRef}>
        <button
          className="profile-btn"
          onClick={() => setOpenMenu(!openMenu)}
        >
          ☰
        </button>

        {openMenu && (
          <div className="dropdown-menu">
            {/* Home */}
            {currentPath !== "/" && <Link to="/">Home</Link>}

            {/* About (hidden on Home) */}
            {currentPath !== "/" && currentPath !== "/about" && (
              <Link to="/about">About</Link>
            )}

            {/* Placeholder pages */}
            <Link to="/donate-intro">Donate</Link>
            {currentPath !== "/contact" && (
              <Link to="/contact">Contact Info</Link>
            )}

            {/* Login / Signup */}
            {!isLoggedIn && (
              <>
                {/* Login only shows if NOT on /login, /signup, /choice */}
                {currentPath !== "/login" &&
                 currentPath !== "/signup" &&
                 currentPath !== "/choice" && <Link to="/login">Login</Link>}

                {/* Signup only shows if NOT on /signup or /login */}
                {currentPath !== "/signup" && currentPath !== "/login" && (
                  <Link to="/signup">Sign Up</Link>
                )}
              </>
            )}

            {/* Protected links */}
            {isLoggedIn && (
              <>
                {currentPath !== "/dashboard" && <Link to="/dashboard">Dashboard</Link>}
                {currentPath !== "/settings" && <Link to="/settings">Settings</Link>}
                {currentPath !== "/make-reports" && <Link to="/make-reports">Make Reports</Link>}
                {currentPath !== "/assign-authority" && <Link to="/assign-authority">Assign Authority</Link>}
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;