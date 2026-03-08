import { useState } from "react";
import "../styles/dashboard.css";
import reports from "../data/reports";

const Dashboard = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <div className="dashboard-root" style={{ paddingBottom: "50px" }}>
      <div className="dashboard-overlay"></div>

      {/* Spin Slideshow */}
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
              key={report.id}
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
        <div className="modal-backdrop" onClick={() => setSelectedReport(null)}>
          <div className="report-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedReport.title}</h2>

            <div className="report-meta">
              <span>📍 {selectedReport.location}</span>
              <span>📅 {selectedReport.date}</span>
              <span className={`severity ${selectedReport.severity?.toLowerCase()}`}>
                {selectedReport.severity}
              </span>
            </div>

            <p className="report-full">{selectedReport.fullDescription}</p>
            <p className="report-affected">
              👥 Affected People: {selectedReport.affectedPeople}
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