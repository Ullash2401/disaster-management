import { Link, useNavigate } from "react-router-dom"
import "../styles/choice.css"

const Choice = () => {
  const navigate = useNavigate() // React Router hook for programmatic navigation

  const handleGuest = () => {
    // Optionally, you could set a guest flag in sessionStorage
    sessionStorage.setItem("guest", "true")
    navigate("/dashboard") // redirect guest to dashboard
  }

  return (
    <div className="choice-page">
      <div className="choice-card">
        <h1>Welcome</h1>
        <p>Choose how you want to continue</p>

        <div className="choice-options">
          {/* Guest Mode */}
          <button
            onClick={handleGuest}
            className="choice-option"
          >
            <div className="icon">👤</div>
            <h3>Guest Mode</h3>
            <span>Browse with limited access</span>
          </button>

          {/* Login Mode */}
          <Link to="/login" className="choice-option login">
            <div className="icon">🔐</div>
            <h3>Login</h3>
            <span>Access all features</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Choice
