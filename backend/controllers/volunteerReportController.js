const VolunteerReport = require("../models/VolunteerReport");
const nodemailer = require("nodemailer");

// Create a volunteer report
exports.createVolunteerReport = async (req, res) => {
  try {
    const report = await VolunteerReport.create(req.body);

    const totalSpent = report.items.reduce((sum, item) => sum + item.amountSpent, 0);

    const itemsHtml = report.items
      .map((item, index) => `<li><b>${index + 1}.</b> ${item.reason}: ${item.amountSpent}</li>`)
      .join("");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Volunteer Report Submitted",
      html: `
        <h2>New Volunteer Report</h2>
        <p><b>Name:</b> ${report.name}</p>
        <p><b>Disaster Area:</b> ${report.disasterArea}</p>
        <p><b>Date:</b> ${report.date.toDateString()}</p>
        <p><b>Allocated Amount:</b> ${report.allocatedAmount}</p>
        <p><b>Total Spent:</b> ${totalSpent}</p>
        <p><b>Remaining Balance:</b> ${report.remainingBalance}</p>
        <p><b>Request More Funds:</b> ${report.requestMoreFunds}</p>
        <h3>Expenditure Items:</h3>
        <ul>${itemsHtml}</ul>
      `,
    });

    res.status(201).json({ message: "Volunteer report saved and email sent ✅", report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all volunteer reports
exports.getAllVolunteerReports = async (req, res) => {
  try {
    const reports = await VolunteerReport.find().populate("userId", "name email");
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};