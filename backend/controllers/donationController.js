// controllers/donationController.js
const Donation = require("../models/Donation");
const User = require("../models/User"); // adjust path if needed
const DonationSummary = require("../models/DonationSummary");

// Predefined categories
const categories = [
  "Flood Relief",
  "Earthquake Relief",
  "Cyclone Relief",
  "Wildfire Relief",
  "General Disaster Fund"
];

// ------------------ Utility: Initialize categories on server start ------------------
const initCategories = async () => {
  try {
    for (let type of categories) {
      await DonationSummary.findOneAndUpdate(
        { disasterType: type },
        {
          $setOnInsert: {
            disasterType: type,
            totalAmount: 0,
            unassignedAmount: 0
          }
        },
        { upsert: true }
      );
    }
    console.log("Donation categories initialized");
  } catch (error) {
    console.error("Error initializing categories:", error);
  }
};

// ------------------ 1️⃣ Create donation + update summary ------------------
exports.createDonation = async (req, res) => {
  try {
    const { disasterType, amount } = req.body;

    // Validate input
    const numericAmount = Number(amount);
    if (!categories.includes(disasterType)) {
      return res.status(400).json({ success: false, message: "Invalid disaster category" });
    }
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid donation amount" });
    }

    // Save donation
    const donation = new Donation({ ...req.body, amount: numericAmount });
    await donation.save();

    // Update donation summary
    const summary = await DonationSummary.findOne({ disasterType });
    if (summary) {
      summary.totalAmount += numericAmount;
      summary.unassignedAmount += numericAmount;
      await summary.save();
    } else {
      // create new summary if somehow missing
      await DonationSummary.create({
        disasterType,
        totalAmount: numericAmount,
        unassignedAmount: numericAmount
      });
    }

    res.status(201).json({
      success: true,
      message: "Donation saved and summary updated",
      donation
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ------------------ 2️⃣ Get current totals per category ------------------
exports.getDonationSummary = async (req, res) => {
  try {
    const summary = await DonationSummary.find({});
    res.status(200).json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ------------------ 3️⃣ Assign part of a category to a user ------------------
exports.assignCategoryPartial = async (req, res) => {
  const { disasterType, assignee, amountToAssign } = req.body;

  try {
    // Validate category
    if (!categories.includes(disasterType)) {
      return res.status(400).json({ message: "Invalid disaster category" });
    }

    // Check if user exists
    const user = await User.findById(assignee);
    if (!user) return res.status(404).json({ message: "Assignee user not found" });

    // Fetch summary
    const summary = await DonationSummary.findOne({ disasterType });
    if (!summary) return res.status(404).json({ message: "Category not found" });

    if (amountToAssign > summary.unassignedAmount) {
      return res.status(400).json({ message: "Amount exceeds available unassigned donations" });
    }

    let remaining = amountToAssign;

    // Fetch unassigned donations for this category
    const donations = await Donation.find({ disasterType, assignedTo: { $exists: false } }).sort({ amount: 1 });

    for (let donation of donations) {
      if (remaining <= 0) break;

      if (donation.amount <= remaining) {
        donation.assignedTo = assignee;
        remaining -= donation.amount;
      } else {
        // Split donation for partial assignment
        const leftover = donation.amount - remaining;
        donation.amount = remaining;
        donation.assignedTo = assignee;
        await donation.save();

        const leftoverDonation = new Donation({
          ...donation.toObject(),
          _id: undefined,
          amount: leftover,
          assignedTo: undefined
        });
        await leftoverDonation.save();
        remaining = 0;
      }
      await donation.save();
    }

    // Update unassignedAmount in summary
    summary.unassignedAmount -= amountToAssign;
    await summary.save();

    res.status(200).json({ message: "Donation assigned successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ------------------ 4️⃣ Export initCategories for server startup ------------------
exports.initCategories = initCategories;