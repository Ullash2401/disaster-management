import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import "../styles/choice.css"

const Choice = () => {
  const navigate = useNavigate()
  const [infoOpen, setInfoOpen] = useState(false)

  const handleGuest = () => {
    sessionStorage.setItem("guest", "true")
    navigate("/dashboard")
  }

  return (
    <div className="choice-page">
      {/* Overlay */}
      <div className="choice-overlay"></div>

      {/* Glass chat bubble */}
      <div className="choice-card">
        <h1>Welcome</h1>
        <p>Choose how you want to continue</p>

        <div className="choice-options">
          <button onClick={handleGuest} className="choice-option">
            <div className="icon">👤</div>
            <h3>Guest Mode</h3>
            <span>Browse with limited access</span>
          </button>

          <Link to="/login" className="choice-option login relative">
            <div className="icon">🔐</div>
            <h3>Login</h3>
            <span className="flex items-center">
              Access features
              <button
                type="button"
                className="ml-1 text-blue-500 hover:text-blue-700"
                onClick={(e) => { e.preventDefault(); setInfoOpen(true); }}
              >
                ℹ️
              </button>
            </span>
          </Link>
        </div>
      </div>

      {/* Info modal overlay */}
      {infoOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setInfoOpen(false)}
        >
          <div
            className="bg-white bg-opacity-60 backdrop-blur-sm p-6 rounded-lg max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-2">What does "Access features" mean?</h2>
            <p className="text-gray-700 leading-relaxed">
              When you sign in, the system tailors the experience to your role.
              Here’s how permissions are structured:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li className="mb-1">
                <strong>General user</strong> – can access the dashboard, receive
                notifications and contact volunteers and emergency services.
              </li>
              <li className="mb-1">
                <strong>Volunteer</strong> – everything a user can do, plus the
                ability to create and update disaster reports on behalf of
                affected individuals.
              </li>
              <li className="mb-1">
                <strong>Script-writer</strong> – in addition to volunteer rights,
                can upload officially prepared reports that will appear on the
                public site.
              </li>
              <li className="mb-1">
                <strong>Administrator</strong> – has full control and can grant
                or revoke any of the above roles at any time.
              </li>
            </ul>
            <button
              onClick={() => setInfoOpen(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Choice