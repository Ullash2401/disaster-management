const Report = require("../models/Report");
const sendEmail = require("../utils/sendEmail");

exports.addReport = async (req, res) => {
  try {

    if (!req.user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const {
      title,
      shortDescription,
      fullDescription,
      date,
      severity,
      affectedPeople,
      location
    } = req.body;

    const userId = req.user._id;

    let missingFields = [];

    if (!title) missingFields.push("title");
    if (!shortDescription) missingFields.push("shortDescription");
    if (!fullDescription) missingFields.push("fullDescription");
    if (!severity) missingFields.push("severity");

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        fields: missingFields
      });
    }

    const report = new Report({
      title,
      shortDescription,
      fullDescription,
      date,
      severity,
      affectedPeople,
      location,
      userId
    });

    await report.save();

    await sendEmail({
      to: "atikullash085@gmail.com",
      subject: "🚨 New Report Submitted",
      text: `A new report has been created.

      Title: ${title}
      Severity: ${severity}
      Location: ${location || "Not provided"}
      Date: ${date || new Date()}

      Please check the dashboard for details.`,
        html: `
          <h2>🚨 New Report Submitted</h2>
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Severity:</strong> ${severity}</p>
          <p><strong>Location:</strong> ${location || "Not provided"}</p>
          <p><strong>Date:</strong> ${date || new Date()}</p>
          <hr/>
          <p>Please check the admin dashboard for full details.</p>
        `
    });
    res.status(201).json({
      message: "Report created successfully",
      report
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};