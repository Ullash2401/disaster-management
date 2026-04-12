import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DonateIntro.css"; // reuse glass + overlay styles

const DonateIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="about-root">
      {/* Overlay */}
      <div className="about-overlay"></div>

      {/* Glass container */}
      <div className="about-container">
        <h1>Support Our Disaster Relief Efforts</h1>

        <section>
          <h2>Why Donate?</h2>
          <p>
            Your donation will directly support disaster-affected communities, 
            providing essential relief such as food, shelter, medical aid, and 
            rebuilding assistance. Every contribution helps save lives and 
            restore communities impacted by floods, cyclones, earthquakes, fires, 
            and other emergencies.
          </p>
        </section>

        <section>
          <h2>How Donations Are Used</h2>
          <ul>
            <li>Immediate relief for affected families (food, water, medicine)</li>
            <li>Temporary shelters and safety equipment</li>
            <li>Medical support and emergency services</li>
            <li>Rebuilding homes, schools, and infrastructure</li>
            <li>Support for local volunteers and NGOs coordinating relief</li>
          </ul>
        </section>

        <section>
          <h2>Transparency & Accountability</h2>
          <p>
            Our platform ensures transparent use of donations with real-time 
            tracking, reporting, and updates. You can see exactly how your 
            contributions make an impact.
          </p>
        </section>

        <section style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            onClick={() => navigate("/donate")}
            style={{
              padding: "14px 30px",
              borderRadius: "30px",
              border: "none",
              background: "#10b981",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#059669")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#10b981")}
          >
            Donate Now
          </button>
        </section>
      </div>
    </div>
  );
};

export default DonateIntro;