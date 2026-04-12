import { useState } from "react";
import "../styles/VolunteerReport.css";

const VolunteerReport = () => {
  const [formData, setFormData] = useState({
    name: "",
    disasterArea: "",
    date: "",
    allocatedAmount: "",
    items: [{ reason: "", amountSpent: "" }],
    remainingBalance: 0,
    requestMoreFunds: false,
  });

  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // Update main form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedData = { ...formData, [name]: value };

    // Recalculate remaining balance if allocatedAmount changes
    if (name === "allocatedAmount") {
      const totalSpent = updatedData.items.reduce(
        (sum, item) => sum + (Number(item.amountSpent) || 0),
        0
      );
      updatedData.remainingBalance = Number(value || 0) - totalSpent;
      updatedData.requestMoreFunds = updatedData.remainingBalance < Number(value) * 0.1;
    }

    setFormData(updatedData);
  };

  // Update expenditure items and recalc balance
  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = field === "amountSpent" ? Number(value) : value;

    const totalSpent = newItems.reduce((sum, item) => sum + (Number(item.amountSpent) || 0), 0);
    const allocated = Number(formData.allocatedAmount) || 0;

    setFormData((prev) => ({
      ...prev,
      items: newItems,
      remainingBalance: allocated - totalSpent,
      requestMoreFunds: allocated - totalSpent < allocated * 0.1,
    }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { reason: "", amountSpent: "" }],
    }));
  };

  const removeItem = (index) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);

    const totalSpent = newItems.reduce((sum, item) => sum + (Number(item.amountSpent) || 0), 0);
    const allocated = Number(formData.allocatedAmount) || 0;

    setFormData((prev) => ({
      ...prev,
      items: newItems,
      remainingBalance: allocated - totalSpent,
      requestMoreFunds: allocated - totalSpent < allocated * 0.1,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("You must be logged in to submit a report");
      return;
    }

    try {
      console.log("🔑 Token:", token);
      console.log("📤 Submitting:", formData);

      const res = await fetch("http://localhost:5000/api/volunteer-reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        console.error("⚠️ Non-JSON response:", text);
        setMessage("Server error (invalid response)");
        return;
      }

      console.log("📥 Response:", data);

      if (!res.ok) {
        setMessage(data.message || "Failed to submit report");
        return;
      }

      setMessage("Report submitted successfully ✅");

      // Reset form
      setFormData({
        name: "",
        disasterArea: "",
        date: "",
        allocatedAmount: "",
        items: [{ reason: "", amountSpent: "" }],
        remainingBalance: 0,
        requestMoreFunds: false,
      });

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("❌ Error submitting report:", err);
      setMessage("Server error");
    }
  };

  return (
    <div className="report-root">
      <div className="overlay"></div>
      <div className="report-container">
        <h1>
          Volunteer <span>Report</span>
        </h1>

        {message && <div className="message">{message}</div>}

        <form onSubmit={handleSubmit} className="report-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="disasterArea"
            placeholder="Disaster Area"
            value={formData.disasterArea}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="allocatedAmount"
            placeholder="Allocated Amount"
            value={formData.allocatedAmount}
            onChange={handleChange}
            required
          />

          {formData.items.map((item, index) => (
            <div key={index} className="item-row">
              <input
                type="text"
                placeholder="Reason"
                value={item.reason}
                onChange={(e) => handleItemChange(index, "reason", e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Amount Spent"
                value={item.amountSpent}
                onChange={(e) => handleItemChange(index, "amountSpent", e.target.value)}
                required
              />
              {formData.items.length > 1 && (
                <button type="button" className="remove-item-btn" onClick={() => removeItem(index)}>
                  ❌
                </button>
              )}
            </div>
          ))}

          <button type="button" className="add-item-btn" onClick={addItem}>
            + Add Item
          </button>

          <input
            type="number"
            value={formData.remainingBalance}
            readOnly
            className={formData.remainingBalance < 0 ? "negative-balance" : "positive-balance"}
          />

          <label className="checkbox">
            <input type="checkbox" checked={formData.requestMoreFunds} readOnly />
            Request Additional Funds
          </label>

          <button type="submit">Submit Report</button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerReport;