const VolunteerReport = require("../models/VolunteerReport");

// -------------------- CREATE REPORT --------------------
const createVolunteerReport = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, disasterArea, date, allocatedAmount, items } = req.body;

    // Sanitize items
    const sanitizedItems = Array.isArray(items)
      ? items.map((item) => ({
          reason: item.reason || "",
          amountSpent: Number(item.amountSpent || 0),
        }))
      : [];

    // Create new report
    const report = new VolunteerReport({
      name,
      disasterArea,
      date: date ? new Date(date) : new Date(),
      allocatedAmount: Number(allocatedAmount || 0),
      items: sanitizedItems,
      userId: req.user._id, // ✅ attach userId properly
    });

    await report.save();

    res.status(201).json({ message: "Volunteer report saved ✅", report });
  } catch (error) {
    console.error("CREATE VOLUNTEER REPORT ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -------------------- FETCH ALL REPORTS --------------------
const getAllVolunteerReports = async (req, res) => {
  try {
    const reports = await VolunteerReport.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ reports });
  } catch (error) {
    console.error("FETCH REPORTS ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -------------------- FETCH SINGLE REPORT --------------------
const getVolunteerReportById = async (req, res) => {
  try {
    const report = await VolunteerReport.findById(req.params.id).populate(
      "userId",
      "name email"
    );

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ report });
  } catch (error) {
    console.error("FETCH SINGLE REPORT ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -------------------- EXPORT CONTROLLERS --------------------
module.exports = {
  createVolunteerReport,
  getAllVolunteerReports,
  getVolunteerReportById,
};