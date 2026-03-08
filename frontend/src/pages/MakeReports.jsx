import React, { useState } from "react";
import "../styles/MakeReport.css";

const MakeReport = () => {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    date: "",
    severity: "",
    affectedPeople: "",
    location: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem("userId") || undefined;

      const payload = {
        ...formData,
        affectedPeople: Number(formData.affectedPeople) || 0,
        userId
      };

      const res = await fetch("http://localhost:5000/api/reports/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage("Report saved successfully ✅");

        // Clear form
        setFormData({
          title: "",
          shortDescription: "",
          fullDescription: "",
          date: "",
          severity: "",
          affectedPeople: "",
          location: "",
        });
      } else if (data.fields) {
        // Show backend field-specific errors
        setSuccessMessage("Errors: " + data.fields.join(", "));
      } else {
        setSuccessMessage(data.message || "Failed to save report ❌");
      }

      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error("Server error:", err);
      setSuccessMessage("Server error. Please try again ❌");
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  return (
    <div className="report-root">
      <div className="overlay"></div>

      <div className="content">
        <h1>Create <span>Disaster Report</span></h1>
        <p>Fill in the details below to submit a new disaster report.</p>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <form className="report-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-input"
          />

          <input
            type="text"
            name="shortDescription"
            placeholder="Short Description"
            value={formData.shortDescription}
            onChange={handleChange}
            required
            className="form-input"
          />

          <textarea
            name="fullDescription"
            placeholder="Full Description"
            value={formData.fullDescription}
            onChange={handleChange}
            rows={4}
            required
            className="form-input"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-input"
          />

          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className={`form-input severity-${formData.severity.toLowerCase()}`}
            required
          >
            <option value="">Select Severity</option>
            <option value="Low">Low</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>

          <input
            type="number"
            name="affectedPeople"
            placeholder="Affected People"
            value={formData.affectedPeople}
            onChange={handleChange}
            className="form-input"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="form-input"
          />

          <button type="submit" className="btn-primary">Add Report</button>
        </form>
      </div>
    </div>
  );
};

export default MakeReport;