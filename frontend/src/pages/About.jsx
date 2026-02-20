import React from "react";
import "../styles/about.css";

const About = () => {
  return (
    <div className="about-root">
      {/* Overlay */}
      <div className="about-overlay"></div>

      {/* Single glass bubble */}
      <div className="about-container">
        <h1>Disaster Management</h1>

        <section>
          <h2>About the Project</h2>
          <p>
            The <strong>Disaster Management</strong> platform is a web-based system
            designed to support communities before, during, and after natural and
            man-made disasters. It focuses on providing timely information,
            emergency assistance, and efficient relief coordination, especially
            in disaster-prone regions like Bangladesh.
          </p>
        </section>

        <section>
          <h2>Problem Statement</h2>
          <p>
            Disasters such as floods, cyclones, earthquakes, fires, and pandemics
            cause significant loss of life and property. During such events,
            affected people often struggle to access real-time information,
            emergency services, and organized relief support.
          </p>

          <h3>Who Is Affected?</h3>
          <ul>
            <li>General citizens in disaster-prone areas</li>
            <li>Disaster victims and volunteers</li>
            <li>Government and non-government organizations</li>
          </ul>

          <h3>Current Challenges</h3>
          <ul>
            <li>Lack of real-time information and coordination</li>
            <li>Delayed emergency response</li>
            <li>Poor communication between victims, volunteers, and authorities</li>
            <li>Manual and unorganized relief distribution systems</li>
          </ul>
        </section>

        <section>
          <h2>Proposed Solution</h2>
          <p>
            This project proposes a centralized Disaster Management Platform
            developed using the MERN Stack. The system brings together disaster
            reporting, emergency requests, and relief management into a single,
            user-friendly digital platform.
          </p>

          <h3>Core Idea</h3>
          <p>
            To provide a centralized digital solution for disaster reporting,
            emergency response coordination, and transparent relief management.
          </p>
        </section>

        <section>
          <h2>Target Users</h2>
          <ul>
            <li>Citizens</li>
            <li>Disaster victims</li>
            <li>Volunteers</li>
            <li>Government agencies</li>
            <li>NGOs and relief organizations</li>
          </ul>
        </section>

        <section>
          <h2>Key Features</h2>
          <ul>
            <li>User authentication and role-based access control</li>
            <li>Disaster reporting with location and details</li>
            <li>Emergency help requests for medical, food, or rescue assistance</li>
            <li>Relief and donation management system</li>
            <li>Search and filter disasters by location, type, or severity</li>
            <li>Admin dashboard for managing users and reports</li>
            <li>Real-time notifications and alerts</li>
            <li>Analytics and disaster impact reports</li>
          </ul>
        </section>

        <section>
          <h2>Values Provided</h2>
          <ul>
            <li>Faster emergency response</li>
            <li>Improved communication and coordination</li>
            <li>Transparent relief distribution</li>
            <li>Easy access to disaster-related information</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;