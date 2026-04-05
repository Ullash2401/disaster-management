import { useState, useEffect } from "react";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch reports from backend
  const fetchReports = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token"); // JWT token
      const res = await fetch("http://localhost:5000/api/reports", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`, // include token if route protected
        },
      });

      if (!res.ok) {
        const text = await res.text(); // get raw text to debug
        throw new Error(`Failed to fetch reports: ${res.status} ${res.statusText}\n${text}`);
      }

      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch reports. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="dashboard-root" style={{ paddingBottom: "50px" }}>
      <div className="dashboard-overlay"></div>

      {loading && <p>Loading reports...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Reports Carousel */}
      <div className="spin-carousel">
        <div className="spin-track">
          {[...reports, ...reports].map((report, index) => (
            <div
              key={index}
              className="spin-card"
              onClick={() => setSelectedReport(report)}
            >
              <h3 className="spin-title">{report.title}</h3>
              <p className="spin-desc">{report.shortDescription}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="recent-reports">
        <h2 className="recent-title">Recent Reports</h2>
        <ul className="recent-list">
          {reports.map((report) => (
            <li
              key={report._id} // use _id from MongoDB
              className="recent-list-item"
              onClick={() => setSelectedReport(report)}
            >
              <h4>{report.title}</h4>
              <p>{report.shortDescription}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Full Report Modal */}
      {selectedReport && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="report-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedReport.title}</h2>

            <div className="report-meta">
              <span>📍 {selectedReport.location}</span>
              <span>📅 {selectedReport.date?.split("T")[0]}</span>
              <span className={`severity ${selectedReport.severity?.toLowerCase()}`}>
                {selectedReport.severity}
              </span>
            </div>

            <p className="report-full">{selectedReport.fullDescription}</p>
            <p className="report-affected">
              👥 Affected People: {selectedReport.affectedPeople || 0}
            </p>

            <button
              className="close-btn"
              onClick={() => setSelectedReport(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;