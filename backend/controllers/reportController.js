const Report = require("../models/Report");

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